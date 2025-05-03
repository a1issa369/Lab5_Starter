// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // DOM Elements
  const hornSelect = document.getElementById('horn-select');
  
  hornSelect.addEventListener('change', function() {
    const selectedValue = hornSelect.value;
    console.log("Horn selected:", selectedValue); 
  });
}
