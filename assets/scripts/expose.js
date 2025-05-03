// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const hornSelect = document.getElementById('horn-select');
  const hornImage = document.getElementById('horn-image');
  const hornSound = document.getElementById('horn-sound');
  const volumeSlider = document.getElementById('volume');
  const volumeImage = document.getElementById('volume-image');
  const playButton = document.getElementById('play-btn');

  const jsConfetti = new JSConfetti();

  hornSelect.addEventListener('change', () => {
    const selected = hornSelect.value;

    switch (selected) {
      case 'air-horn':
        hornImage.src = 'assets/images/air-horn.svg';
        hornSound.src = 'assets/audio/air-horn.mp3';
        break;
      case 'car-horn':
        hornImage.src = 'assets/images/car-horn.svg';
        hornSound.src = 'assets/audio/car-horn.mp3';
        break;
      case 'party-horn':
        hornImage.src = 'assets/images/party-horn.svg';
        hornSound.src = 'assets/audio/party-horn.mp3';
        break;
    }
  });

  volumeSlider.addEventListener('input', () => {
    const volume = Number(volumeSlider.value);
    hornSound.volume = volume / 100;

    if (volume === 0) {
      volumeImage.src = 'assets/icons/volume-level-0.svg';
    } else if (volume < 33) {
      volumeImage.src = 'assets/icons/volume-level-1.svg';
    } else if (volume < 67) {
      volumeImage.src = 'assets/icons/volume-level-2.svg';
    } else {
      volumeImage.src = 'assets/icons/volume-level-3.svg';
    }
  });

  playButton.addEventListener('click', () => {
    hornSound.play();
    if (hornSelect.value === 'party-horn') {
      jsConfetti.addConfetti();
    }
  });
}
