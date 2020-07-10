// stepped form
let url = window.location.href;
let form = document.getElementById('form');

if (url.includes('partner')) {
  form.className = 'hidden';
} else {
  let nextBtn = document.getElementById('step1button');
  let stepOne = document.getElementById('step1box');
  let stepTwo = document.getElementById('step2box');
  let dropMenu = document.getElementById('collections');
  let emptySlide = document.querySelector('.empty-slide');
  let backBtn = document.getElementById('back-btn');

  setListeners();

  function setListeners() {
    nextBtn.addEventListener('click', function() {
      stepTwo.className = 'hpy_grid in';
      stepOne.className = 'hpy_grid out';
    }, false);
    backBtn.addEventListener('click', function() {
      stepTwo.className = 'hpy_grid out';
      stepOne.className = 'hpy_grid in';
      dropMenu.selectedIndex = 0;
      slide(document.querySelector('.empty-slide'));
    }, false);
    dropMenu.addEventListener('change', function() {
      showCheckBoxes(dropMenu.selectedIndex);
    }, false);
  }

  function showCheckBoxes(value) {
    if (value == 0) {
      slide(document.querySelector('.empty-slide'));
    } else if (value == 1) {
      slide(document.querySelector('.retail-slide'));
    } else if (value == 2) {
      slide(document.querySelector('.restaurant-slide'));
    } else if (value == 3) {
      slide(document.querySelector('.home-services-slide'));
    } else if (value == 4) {
      slide(document.querySelector('.entertainment-slide'));
    } else if (value == 5) {
      slide(document.querySelector('.everything-else-slide'));
    }
  }

  function slide(slideIn) {
    let slideOut = document.querySelector('.slide-in');
    slideOut.classList.add('slide-out');
    slideOut.classList.remove('slide-in');
    slideIn.classList.remove('slide-out');
    slideIn.classList.add('slide-in');
  }

}