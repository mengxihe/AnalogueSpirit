const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#333333'

let currentMode = DEFAULT_MODE;
let currentColor = DEFAULT_COLOR;

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
    if(currentMode === 'color'){
        e.target.style.backgroundColor = currentColor;
    }
    else if(currentMode === 'erase'){
        e.target.style.backgroundColor = '#fefefe';
    }
    else if(currentMode === 'rainbow'){
        // this.classList.remove('black');
        let randomR = Math.floor(Math.random()*256);
        let randomG = Math.floor(Math.random()*256);
        let randomB = Math.floor(Math.random()*256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;

    }
    // console.log(this.classList);
}


function reload (){
    grid.innerHTML = ''
    buildGrid(slider.value);
    setCurrentMode ('color');
}

function setCurrentMode (newMode) {
    currentMode = newMode;
}

function setCurrentColor(newColor) {
    currentColor = newColor;
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
const colorBtn = document.querySelector('.colorBtn');
const eraserBtn = document.querySelector('.eraser');

colorBtn.onclick = () => setCurrentMode('color');
eraserBtn.onclick = () => setCurrentMode('erase');

const rainbowBtn = document.querySelector('.rainbowBtn');
rainbowBtn.onclick = () => setCurrentMode('rainbow');

const colorPicker = document.getElementById ('colorPicker')
// const colorValue = colorPicker.value;
// console.log(colorValue);
colorPicker.oninput = function(){
    let colorValue = this.value;
    setCurrentColor(colorValue);
    // console.log(colorValue);
}
