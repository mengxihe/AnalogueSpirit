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
  
  let grid = document.querySelector('.container')

  
  buildGrid(25, 25, grid);
  