fabric.Object.prototype.selectable = false;
const canvas = new fabric.Canvas('canvasId');
// Init grid
for (let i = 0; i <= 400; i += 40) {
  canvas.add(new fabric.Line([i, 0, i, 400], propsForLine()));
}
canvas.add(new fabric.Line([399, 0, 399, 400], propsForLine()));

for (let i = 0; i <= 400; i += 40) {
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