const UNIT = 40;

function initGrid() {
  canvas.clear();

  for (let i = 1; i < 10; i++) {
    canvas.add(new fabric.Line([i * UNIT, 0, i * UNIT, 400], propsForLine()));
    canvas.add(new fabric.Line([0, i * UNIT, 400, i * UNIT], propsForLine()));
  }
}

function initSquares() {
  allSquares = [];

  for (let i = 0; i < 10; i++) {
    allSquares.push([])
    for (let j = 0; j < 10; j++) {
      allSquares[i].push(
        {
          selected: false,
          marked: false,
          canvas: makeField(i * 40, j * 40),
          coordinate: [i * UNIT, j * UNIT]
        }
      );
      canvas.add(allSquares[i][j].canvas);
    }
  }
}

const makeField = (x, y, color = 'white') => {
  return new fabric.Rect({
    left: x,
    top: y,
    fill: color,
    width: UNIT,
    height: UNIT,
    selectable: false,
  })
}

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

  const surroundingFields = showFreeFields(x, y)
    .filter(([x, y]) => x > -1 && y > -1 && x < 10 && y < 10 && !allSquares[x][y].selected);

  if (surroundingFields.length === 0) {
    GAME_OVER = true;
    return;
  }

  surroundingFields.forEach(([x, y]) => markFields(x, y));
}

function propsForLine() {
  return {
    stroke: 'black',
    strokeWidth: 1,
    selectable: false,
  }
}