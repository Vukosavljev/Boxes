// canvas.on('mouse:down', function (event) {
//   const { x, y } = event.pointer;
//   const coorX = getCoordinates(x);
//   const coorY = getCoordinates(y);
//   allSquares[coorX][coorY] = makeField(coorX * UNIT, coorY * UNIT, 'green');
//   allSquares[coorX][coorY].selected = true;

//   canvas.add(allSquares[coorX][coorY]);
//   canvas.off('mouse:down')


//   showFreeFields(coorX, coorY)
//     .filter(([x, y]) => x > -1 && y > -1 && x < 10 && y < 10)
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

//       canvas.add(allSquares[x][y]);
//     });
// });


canvas.on('mouse:down', function (event) {
  const element = event.target;
  const coorX = element.left / UNIT;
  const coorY = element.top / UNIT;
  if (FIRST_TIME) {
    selectFildAndMarkOthers(element, coorX, coorY);
    FIRST_TIME = false;
    return;
  }
  // console.log('event',event)

  if (allSquares[coorX][coorY].marked) {
    removeMarks(coorX, coorY);
    element.set('fill', '#ccc')
  }
});

function selectFildAndMarkOthers(el, x, y) {
  el.set('fill', '#ccc');
  allSquares[x][y].selected = true;

  // select surrounding fields
  showFreeFields(x, y)
    .filter(([x, y]) => x > -1 && y > -1 && x < 10 && y < 10)
    .forEach(([x, y]) => markFields(x, y))
}

function markFields(x, y) {
  allSquares[x][y].canvas.set('fill', 'pink');
  allSquares[x][y].marked = true;
  // allSquares[x][y].
}

function removeMarks(x, y) {
  allSquares.forEach(block => {
    block.forEach(square => {
      if (square.marked && !square.selected) {
        square.canvas.set('fill', 'white')
      }
    })
  })
}