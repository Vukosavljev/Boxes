fabric.Object.prototype.selectable = false;
const canvas = new fabric.Canvas('canvasId');
const UNIT = 40;
// Init grid
for (let i = 0; i <= 400; i += UNIT) {
  canvas.add(new fabric.Line([i, 0, i, 400], propsForLine()));
}
canvas.add(new fabric.Line([399, 0, 399, 400], propsForLine()));

for (let i = 0; i <= 400; i += UNIT) {
  canvas.add(new fabric.Line([0, i, 400, i], propsForLine()));
}
canvas.add(new fabric.Line([0, 399, 400, 399], propsForLine()));

function propsForLine() {
  return {
    stroke: 'black',
    lockMovementX: true,
    lockMovementY: true,
    lockScalingX: true,
    lockScalingY: true,
    lockRotation: true,
  }
}

// init squares
const allSquares = [];
for (let i = 0; i < 10; i++) {
  allSquares.push([])
  for (let j = 0; j < 10; j++) {
    allSquares[i].push([i * UNIT, j * UNIT, { selected: false }]);
  }
}


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

function makeField(x, y, color = 'green') {
  const rect = new fabric.Rect({
    left: x,
    top: y,
    fill: color,
    width: UNIT,
    height: UNIT,
    selectable: false,
  })

  return rect
}