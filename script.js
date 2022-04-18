

function buildGrid(x) {
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${x}, 1fr)`;

    for (let i = 0; i < x * x; i++) {
      let square = document.createElement('div');
      square.classList.add('square');
      grid.appendChild(square);
    }
  }


//   console.log(square);

function changeColor(e) {
    
    // console.log(e)
    if (e.type === 'mouseover' && !mouseDown) return
    this.classList.add('black');
  }



let grid = document.querySelector('.container')
buildGrid(16);

let square = document.querySelectorAll('.square');
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)
console.log(document.body.onmousedown);
square.forEach(square => square.addEventListener('mousedown', changeColor))
square.forEach(square => square.addEventListener('mouseover', changeColor))