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
        square.addEventListener('mousedown', changeColor);
        square.addEventListener('mouseover', changeColor);
        square.addEventListener('touchstart', changeColor);
        square.addEventListener('touchmove', changeColor);
        square.addEventListener('touchend', changeColor);
        square.style = 'background-color: rgba(255, 255, 255, 1)';
        grid.appendChild(square);
        square.dataset.darken = 0;
        
        // let click = 0;
    }
}

function changeColor(e) {
    // console.log(e.target.style.backgroundColor);
    
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
    else if(currentMode === 'shade'){
        let oldColor = e.target.style.backgroundColor;
        // console.log(oldColor);
        let rgbaString = (oldColor.charAt(3) == 'a') ? oldColor.slice(5, -1) : oldColor.slice(4, -1);
        let rgbaArray = rgbaString.split(',');
        let red = rgbaArray[0];
        let green = rgbaArray[1];
        let blue = rgbaArray[2];
        let alpha = rgbaArray[3] ? rgbaArray[3] : 1;
        let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
        // console.log(alpha)
        // console.log(currentOpacity)
        
        let currentDarkeningStep = e.target.dataset.darken;
        
        if (currentDarkeningStep === 9) {
            this.style.backgroundColor = 'rgba(0,0,0,1)';
        }
        let newRed = getNewColorValue(red, currentDarkeningStep, false);
        let newGreen = getNewColorValue(green, currentDarkeningStep, false);
        let newBlue = getNewColorValue(blue, currentDarkeningStep, false);
        let newAlpha = getNewColorValue(currentOpacity, currentDarkeningStep, true);
        currentDarkeningStep ++
        e.target.dataset.darken = currentDarkeningStep;
        
        this.style.backgroundColor = `rgba(${newRed}, ${newGreen}, ${newBlue}, ${newAlpha})`;
        
        } 
    }
    // console.log(this.classList);


function getNewColorValue(currentColorValue, step, alpha) {
    let increment;
    let newValue;
    if(!alpha) {
        increment = currentColorValue / (10 - step);
        newValue = currentColorValue - increment;
    }else {
        increment = (1 - currentColorValue) / (10 - step);
        newValue = +currentColorValue + increment; 
    }
    return (newValue);
    }

function reload (){
    grid.innerHTML = ''
    buildGrid(slider.value);
    setCurrentMode ('color');
}

function setCurrentMode (newMode) {
    activateButton(newMode);
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

let click = 0;


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


const colorPicker = document.getElementById ('colorPicker');
colorPicker.oninput = function(){
    let colorValue = this.value;
    setCurrentColor(colorValue);
}

const shaderBtn = document.querySelector('.shader');
shaderBtn.onclick = () => setCurrentMode('shade');

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active');
    } else if (currentMode === 'color') {
        colorBtn.classList.remove('active');
    } else if (currentMode === 'erase') {
        eraserBtn.classList.remove('active');
    } else if (currentMode === 'shade') {
        shaderBtn.classList.remove('active');
    }

    if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active');
    } else if (newMode === 'color') {
        colorBtn.classList.add('active');
    } else if (newMode === 'erase') {
        eraserBtn.classList.add('active');
    } else if (newMode === 'shade') {
        shaderBtn.classList.add('active');
    }
}

window.onload = () => {
    activateButton(DEFAULT_MODE);
}
