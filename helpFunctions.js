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