fabric.Object.prototype.selectable = false;
const canvas = new fabric.Canvas('canvasId');
const modal = document.getElementById('modal');
modal.addEventListener('click', closeModal);
document.getElementById('newGame').addEventListener('click', initGame);
document.getElementById('no').addEventListener('click', closeModal);
document.getElementById('yes').addEventListener('click', () => {
  closeModal();
  initGame();
});

let ALL_SQUARES = [];
let FIRST_TIME = true;

initGame()

function registeClickEvent() {
  canvas.on('mouse:down', function (event) {
    const element = event.target;
    const coorX = element.left / UNIT;
    const coorY = element.top / UNIT;
    if (FIRST_TIME) {
      selectFieldAndMarkOthers(element, coorX, coorY);
      registerHover(coorX, coorY);
      FIRST_TIME = false;
      return;
    }

    if (ALL_SQUARES[coorX][coorY].marked) {
      removeMarks();
      selectFieldAndMarkOthers(element, coorX, coorY);
    }
  });

  canvas.renderAll();
}

function registerHover() {
  canvas.on('mouse:over', e => setColor(e, '#aaa')
  );
  canvas.on('mouse:out', e => setColor(e, 'pink'));
}

function setColor(e, color) {
  const el = e.target;
  if (el) {
    const x = el.left / UNIT;
    const y = el.top / UNIT;
    if (ALL_SQUARES[x][y].marked) {
      ALL_SQUARES[x][y].canvas.set('fill', color);
      canvas.renderAll();
    }
  }
}

const UNIT = 40;

function initGrid() {
  canvas.clear();

  for (let i = 1; i < 10; i++) {
    canvas.add(new fabric.Line([i * UNIT, 0, i * UNIT, 400], propsForLine()));
    canvas.add(new fabric.Line([0, i * UNIT, 400, i * UNIT], propsForLine()));
  }
}

function initGame() {
  FIRST_TIME = true;
  initGrid();
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

function removeMarks() {
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