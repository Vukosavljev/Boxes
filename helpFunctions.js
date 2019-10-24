const UNIT = 40;

function initGrid() {
  canvas.clear();

  for (let i = 1; i < 10; i++) {
    canvas.add(new fabric.Line([i * UNIT, 0, i * UNIT, 400], propsForLine()));
    canvas.add(new fabric.Line([0, i * UNIT, 400, i * UNIT], propsForLine()));
  }
}

function initSquares() {
  ALL_SQUARES = [];

  for (let i = 0; i < 10; i++) {
    ALL_SQUARES.push([])
    for (let j = 0; j < 10; j++) {
      ALL_SQUARES[i].push(
        {
          selected: false,
          marked: false,
          canvas: makeField(i * 40, j * 40),
          coordinate: [i * UNIT, j * UNIT]
        }
      );
      canvas.add(ALL_SQUARES[i][j].canvas);
    }
  }
}

function initGame() {
  modal.style.display = 'none';
  FIRST_TIME = true;
  initGrid();
  initSquares();
  registeClickEvent();
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
  if (!ALL_SQUARES[x][y].selected) {
    ALL_SQUARES[x][y].canvas.set('fill', 'pink');
    ALL_SQUARES[x][y].marked = true;
  }
}

function removeMarks(x, y) {
  ALL_SQUARES.forEach(block => {
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
  ALL_SQUARES[x][y].selected = true;

  const surroundingFields = showFreeFields(x, y)
    .filter(([x, y]) => x > -1 && y > -1 && x < 10 && y < 10 && !ALL_SQUARES[x][y].selected);

  if (surroundingFields.length === 0) {
    modal.style.display = 'block';
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

function closeModal() {
  modal.style.display = 'none';
}
