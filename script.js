function buildGrid(x, cellSize, gridElement) {
    gridElement.style.display = "grid";
    gridElement.style.gridTemplateColumns = `repeat(${x}, ${cellSize}px)`;
    gridElement.style.gridTemplateRows = `repeat(${x}, ${cellSize}px)`;
   
    let squares = new DocumentFragment();
  
    for (let i = 0; i < x * x; i++) {
      let square = document.createElement('div');
      square.className = 'square';
      squares.appendChild(square);
    }
  
    gridElement.appendChild(squares);
  }
  


  

//   console.log(square);

function changeColor(e) {
    
    // console.log(e)
    if (e.type === 'mouseover' && !mouseDown) return
    this.classList.add('black');
    
  }
let grid = document.querySelector('.container')
buildGrid(16, 25, grid);

let square = document.querySelectorAll('.square');
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)
console.log(document.body.onmousedown);
square.forEach(square => square.addEventListener('mousedown', changeColor))
square.forEach(square => square.addEventListener('mouseover', changeColor))