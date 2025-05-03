// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // DOM Elements
  const hornSelect = document.getElementById('horn-select');
  const hornImage = document.getElementById('horn-image');
  const hornSound = document.getElementById('horn-sound');
  const volumeSlider = document.getElementById('volume');
  const volumeIcon = document.getElementById('volume-image');
  const playButton = document.getElementById('play-button');
  const jsConfetti = new JSConfetti();

  // Initialize default values
  updateHorn();
  updateVolume();

  // Event Listeners
  hornSelect.addEventListener('change', updateHorn);
  volumeSlider.addEventListener('input', updateVolume);
  playButton.addEventListener('click', playSound);

  function updateHorn() {
    const hornType = hornSelect.value;
    hornImage.src = `assets/images/${hornType}.svg`;
    hornImage.alt = `${hornType} image`;
    hornSound.src = `assets/audio/${hornType}.mp3`;
    
    // Force reload the audio element
    hornSound.load();
    console.log(`Horn updated to: ${hornType}`);
  }

  function updateVolume() {
    const volume = volumeSlider.value;
    const volumeLevel = getVolumeLevel(volume);
    
    // Update audio volume (0.0 to 1.0)
    hornSound.volume = volume / 100;
    
    // Update volume icon
    volumeIcon.src = `assets/icons/volume-level-${volumeLevel}.svg`;
    volumeIcon.alt = `Volume level ${volumeLevel}`;
    
    console.log(`Volume set to: ${volume} (level ${volumeLevel})`);
  }

  function getVolumeLevel(volume) {
    if (volume == 0) return 0;
    if (volume < 33) return 1;
    if (volume < 67) return 2;
    return 3;
  }

  function playSound() {
    // Verify audio source is set
    if (!hornSound.src || hornSound.src.includes('undefined')) {
      console.warn('No horn selected');
      return;
    }

    // Play sound with error handling
    hornSound.play()
      .then(() => {
        console.log('Playing sound:', hornSound.src);
        // Add confetti for party horn
        if (hornSelect.value === 'party-horn') {
          jsConfetti.addConfetti();
          console.log('Confetti activated!');
        }
      })
      .catch(error => {
        console.error('Playback failed:', error);
        // Attempt to reload and play again
        hornSound.load().then(() => hornSound.play());
      });
  }
}