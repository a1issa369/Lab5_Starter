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

  // Initialize with default values
  updateHorn();

  hornSelect.addEventListener('change', updateHorn);

  function updateHorn() {
    const value = hornSelect.value;
    hornImage.src = `assets/images/${value}.svg`;
    hornSound.src = `assets/audio/${value}.mp3`;
    
    // Preload the audio
    hornSound.load();
    console.log(`Loaded ${value} horn`);
  }

  volumeSlider.addEventListener('input', updateVolume);

  function updateVolume() {
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
  }

  playButton.addEventListener('click', () => {
    // Verify we have a valid sound source
    if (!hornSound.src || hornSound.src.endsWith('undefined')) {
      console.warn('No sound selected');
      return;
    }

    // Play the sound
    hornSound.play()
      .then(() => {
        console.log('Playing sound');
        if (hornSelect.value === 'party-horn') {
          jsConfetti.addConfetti();
        }
      })
      .catch(error => {
        console.error('Playback failed:', error);
        // Try loading again if playback fails
        hornSound.load().then(() => hornSound.play());
      });
  });
}