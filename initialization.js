fabric.Object.prototype.selectable = false;
const canvas = new fabric.Canvas('canvasId');
const modal = document.getElementById('modal');
modal.addEventListener('click', closeModal);
document.getElementById('newGame').addEventListener('click', e => {
  e.stopPropagation();
  e.preventDefault()
  closeModal();
  modal.style.display = 'block';
});
document.getElementById('no').addEventListener('click', closeModal);
document.getElementById('yes').addEventListener('click', () => {
  closeModal();
  initGame();
});

let ALL_SQUARES = [];
let showGameOver = false;
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
