fabric.Object.prototype.selectable = false;
const canvas = new fabric.Canvas('canvasId');
const UNIT = 40;
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
const allSquares = [];
for (let i = 0; i < 10; i++) {
  allSquares.push([])
  for (let j = 0; j < 10; j++) {
    allSquares[i].push(
      {
        selected: false,
        canvas: makeField(i * 40, j * 40),
        coordinate: [i * UNIT, j * UNIT]
      }
    );
    canvas.add(allSquares[i][j].canvas);
  }
}
console.log(allSquares)


function getCoordinates(position) {
  return Math.floor(position / UNIT)
}

function showFreeFields(x, y) {
  const allFields = [
    [x, y - 3],
    [x + 2, y - 2],
    [x + 3, y],
    [x + 2, y + 2],
    [x, y + 3],
    [x - 2, y + 2],
    [x - 3, y],
    [x - 2, y - 2]
  ]
  return allFields
}

function makeField(x, y, color = 'white') {
  const rect = new fabric.Rect({
    left: x,
    top: y,
    fill: color,
    width: UNIT - 0.5,
    height: UNIT - 0.5,
    selectable: false,
  })

  rect.on('moudedown', () => {
    console.log(123)
    canvas.renderAll();
  })

  return rect
}

canvas.renderAll();
console.log(canvas)