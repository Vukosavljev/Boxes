const makeField = (x, y, color = 'white') => (
  new fabric.Rect({
    left: x,
    top: y,
    fill: color,
    width: UNIT - 0.5,
    height: UNIT - 0.5,
    selectable: false,
  })
)

const showFreeFields = (x, y) => (
  [
    [x, y - 3],
    [x + 2, y - 2],
    [x + 3, y],
    [x + 2, y + 2],
    [x, y + 3],
    [x - 2, y + 2],
    [x - 3, y],
    [x - 2, y - 2]
  ]
)

function markFields(x, y) {
  if (!allSquares[x][y].selected) {
    allSquares[x][y].canvas.set('fill', 'pink');
    allSquares[x][y].marked = true;
  }
}

function removeMarks(x, y) {
  allSquares.forEach(block => {
    block.forEach(square => {
      if (square.marked && !square.selected) {
        square.canvas.set('fill', 'white');
        square.marked = false;
      }
    })
  })
}

function selectFieldAndMarkOthers(el, x, y) {
  el.set('fill', '#ccc');
  allSquares[x][y].selected = true;

  // select surrounding fields
  const filteredFields = showFreeFields(x, y)
    .filter(([x, y]) => x > -1 && y > -1 && x < 10 && y < 10 && !allSquares[x][y].selected)
  console.log(filteredFields.length)
  if (filteredFields.length === 0) {
    console.log('GAME OVER');
    return;
  }

  filteredFields.forEach(([x, y]) => markFields(x, y))
}