const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'color';
const DEFAULT_COLOR = '#222222';

let size = DEFAULT_SIZE;
let mode =  DEFAULT_MODE;
let color = DEFAULT_COLOR;
let mouseDown = false;

const grid = document.querySelector('.grid');
const colorButton = document.getElementById('colorBtn');
const rainbowButton = document.getElementById('rainbowBtn');
const eraserButton = document.getElementById('eraserBtn');
const resetButton = document.getElementById('resetBtn');
const colorPicker = document.getElementById('colorPicker');

colorPicker.onchange = (e) => setColor(e.target.value);
colorButton.onclick = () => setMode('color');
rainbowButton.onclick = () => setMode('rainbow'); 
eraserButton.onclick = () => setMode('eraser');
resetButton.onclick = () => reloadGrid();
sizeSlider.onchange = (e) => changeSize(e.target.value);
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

window.onload = () => {
  createGrid(size);
  activateButton(mode);
}

function setSize(selectedSize) {
  size = selectedSize;
}

function setMode(selectedMode) {
  activateButton(selectedMode);
  mode = selectedMode;
}

function setColor(selectedColor ){
  color = selectedColor;
}

function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} x ${value}`
}

function changeSize(value) {
  setSize(value);
  updateSizeValue(value);
  reloadGrid();
}

function createGrid (gridNumber) { 
  grid.style.gridTemplateColumns = `repeat(${gridNumber}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${gridNumber}, 1fr)`;

  let gridArea = gridNumber * gridNumber;
  for (let i = 1; i <= gridArea; i++) {
      let gridItem = document.createElement('div');
      gridItem.addEventListener('mouseover', colorChanger);
      gridItem.addEventListener('mousedown', colorChanger);
      grid.insertAdjacentElement('beforeend', gridItem);
  }
}

function colorChanger(e) {
  if (e.type === 'mouseover' && !mouseDown) return;
  if (mode === 'color') {
    e.target.style.backgroundColor = color;
  } else if (mode === 'eraser') {
    e.target.style.backgroundColor = '#FFFFFF';
  } else if (mode === 'rainbow') {
    const R = Math.floor(Math.random() * 256);
    const G = Math.floor(Math.random() * 256);
    const B = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
  }
}

function activateButton(newMode) {
  if (mode === 'rainbow') {
    rainbowButton.classList.remove('active')
  } else if (mode === 'color') {
    colorButton.classList.remove('active')
  } else if (mode === 'eraser') {
    eraserButton.classList.remove('active')
  }

  if (newMode === 'rainbow') {
    rainbowButton.classList.add('active')
  } else if (newMode === 'color') {
    colorButton.classList.add('active')
  } else if (newMode === 'eraser') {
    eraserButton.classList.add('active')
  }
}

function clearGrid() {
  grid.innerHTML = '';
}

function reloadGrid() {
  clearGrid();
  createGrid(size);
}