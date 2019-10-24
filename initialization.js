fabric.Object.prototype.selectable = false;
const canvas = new fabric.Canvas('canvasId');
let ALL_SQUARES = [];

let FIRST_TIME = true;
let GAME_OVER = false;

initGrid();
initSquares();
registeClickEvent();

document.getElementById('newGame').addEventListener('click', () => {
  FIRST_TIME = true;
  GAME_OVER = false;
  initGrid();
  initSquares();
  registeClickEvent();
})


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
      removeMarks(coorX, coorY);
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

//     .forEach(([x, y]) => {
//       allSquares[x][y] = makeField(x * UNIT, y * UNIT, 'pink');
//       allSquares[x][y].on('mouseover', e => {
//         e.target.set('fill', 'yellow');
//         canvas.add(allSquares[x][y]);
//         canvas.renderAll();
//       });

//       allSquares[x][y].on('mouseout', e => {
//         e.target.set('fill', 'pink')
//         canvas.renderAll();
//       });

//       allSquares[x][y].on('mousedown', e => {
//         allSquares[x][y].off('mouseout');
//         allSquares[x][y].off('mouseoover');
//         e.target.set('fill', 'blue');
//         allSquares[x][y].selected = true;
//         // reset fields
//         canvas.renderAll();
//       })