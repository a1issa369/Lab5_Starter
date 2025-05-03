// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const hornSelect = document.getElementById('horn-select');
  const hornImage = document.querySelector('#expose img');
  const hornSound = document.querySelector('audio');
  const volumeSlider = document.getElementById('volume');
  const volumeImage = document.querySelector('#volume-controls img');
  const playButton = document.querySelector('button');
  const jsConfetti = new JSConfetti();

  hornSelect.addEventListener('change', () => {
    const value = hornSelect.value;
    hornImage.src = `assets/images/${value}.svg`;
    hornSound.src = `assets/audio/${value}.mp3`;

    console.log("Selected horn:", value);
    console.log("Audio src set to:", hornSound.src);
  });

  volumeSlider.addEventListener('input', () => {
    const volume = volumeSlider.value;
    hornSound.volume = volume / 100;

    if (volume == 0) {
      volumeImage.src = 'assets/icons/volume-level-0.svg';
    } else if (volume < 33) {
      volumeImage.src = 'assets/icons/volume-level-1.svg';
    } else if (volume < 67) {
      volumeImage.src = 'assets/icons/volume-level-2.svg';
    } else {
      volumeImage.src = 'assets/icons/volume-level-3.svg';
    }

    console.log("Volume set to:", volume);
    console.log("Audio volume:", hornSound.volume);
  });

  playButton.addEventListener('click', () => {
    if (hornSound.src && hornSound.src !== '') {
      hornSound.play();
      console.log("Playing sound:", hornSound.src);

      if (hornSelect.value === 'party-horn') {
        jsConfetti.addConfetti();
      }
    } else {
      console.log("No horn selected.");
    }
  });
}
