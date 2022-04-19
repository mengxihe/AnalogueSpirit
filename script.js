

function buildGrid(x) {
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${x}, 1fr)`;

    for (let i = 0; i < x * x; i++) {
      let square = document.createElement('div');
      square.classList.add('square');
      square.addEventListener('mousedown', changeColor)
      square.addEventListener('mouseover', changeColor)
      grid.appendChild(square);
    }
  }

function changeColor(e) {
    // console.log(e)
    if (e.type === 'mouseover' && !mouseDown) return;
    this.classList.add('black');
}


function reload (){
    grid.innerHTML = ''
    buildGrid(slider.value);
}

const grid = document.querySelector('.container');

const square = document.querySelectorAll('.square');
const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', reload);
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

const slider = document.getElementById('slider');
const sliderValue = document.getElementById('sliderValue');
sliderValue.innerHTML = `${slider.value} x ${slider.value}`;
slider.oninput = function(){
    let inner = this.value;
    sliderValue.innerHTML = `${inner} x ${inner}`;
    reload();
}
buildGrid(slider.value);
const bw = document.querySelector('.bw');
const eraser = document.querySelector('.eraser');
