const COLOR = '#cc8291';
const SIZE = 16;

const grid = document.querySelector('.grid');

function createGrid (gridNumber) { 
  let gridArea = gridNumber * gridNumber;
  for (let i = 1; i <= gridArea; i++) {
      let gridItem = document.createElement('div');
      grid.style.gridTemplateColumns = `repeat(${gridNumber}, 1fr)`;
      grid.style.gridTemplateRows = `repeat(${gridNumber}, 1fr)`;
      grid.insertAdjacentElement('beforeend', gridItem);
  } 
}

createGrid(SIZE);