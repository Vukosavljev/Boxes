fabric.Object.prototype.selectable = false;
const canvas = new fabric.Canvas('canvasId');
const allSquares = [];
const UNIT = 40;
let FIRST_TIME = true;

// Init grid
for (let i = 0; i <= 400; i += UNIT) {
  canvas.add(new fabric.Line([i, 0, i, 400], propsForLine()));
}
// canvas.add(new fabric.Line([399, 0, 399, 400], propsForLine()));

for (let i = 0; i <= 400; i += UNIT) {
  canvas.add(new fabric.Line([0, i, 400, i], propsForLine()));
}
// canvas.add(new fabric.Line([0, 399, 400, 399], propsForLine()));

function propsForLine() {
  return {
    stroke: 'black',
    strokeWidth: 1,
    selectable: false,
  }
}

// init squares
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

canvas.renderAll();