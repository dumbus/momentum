const audioPlayer = () => {
  const audio = document.querySelector('audio');
  const button = document.querySelector('.play');
  const playListContainer = document.querySelector('.play-list');
  const playPrev = document.querySelector('.play-prev');
  const playNext = document.querySelector('.play-next');
  let playListItems;

  const songName = document.querySelector('.player-name');
  const currentTiming = document.querySelector('.current-timing');
  const durationTiming = document.querySelector('.duration-timing');
  const volumeButton = document.querySelector('.muteButton');
  const volumeInput = document.querySelector('.volume-progress');
  const progressInput = document.querySelector('.player-progress');

  let isPlay = false;
  let isVolume = true;
  let volumeValue = 0.5;
  let playNum = 0;

  const playList = [
    {      
      title: 'Aqua Caelestis',
      src: './assets/sounds/Aqua Caelestis.mp3',
      duration: '00:15'
    },  
    {      
      title: 'River Flows In You',
      src: './assets/sounds/River Flows In You.mp3',
      duration: '00:15'
    },  
    {      
      title: 'Summer Wind',
      src: './assets/sounds/Summer Wind.mp3',
      duration: '00:15'
    },  
    {      
      title: 'Ennio Morricone',
      src: './assets/sounds/Ennio Morricone.mp3',
      duration: '00:15'
    }
  ];

  function playAudio() {
    if (!isPlay) {
      audio.src = playList[playNum].src;
      songName.textContent = playList[playNum].title;
      durationTiming.textContent = playList[playNum].duration;
      audio.play();
      isPlay = true;
    } else {
      audio.pause();
      isPlay = false;
    }
  }

  function toggleBtn() {
    playListItems = playListContainer.childNodes;
    playListItems[playNum].classList.add('item-active');
    button.classList.toggle('pause');
    playAudio(); 
  }

  function handleAudioProgress() {
    var percent = Math.floor((audio.currentTime / audio.duration) * 100) || 0;
    var percentWidth = ((audio.currentTime / audio.duration)) || 0;

    let currentSecond = Math.floor(percent / 6.66);
    if (currentSecond < 10) {
      currentSecond = '0' + currentSecond;
    }

    currentTiming.textContent = `00:${currentSecond}`;
    progressInput.value = percentWidth;

    if (percent === 100) {
      nextSong();
    }
  }

  audio.addEventListener('timeupdate', handleAudioProgress);

  function volumeOn() {
    audio.volume = volumeValue;
    volumeButton.style.opacity = 1;
  }

  function volumeOff() {
    audio.volume = 0;
    volumeButton.style.opacity = 0.2;
  }

  volumeButton.addEventListener('click', () => {
    if (!isVolume) {
      volumeOff();
      isVolume = true;
      volumeInput.value = 0;
    } else {
      volumeOn();
      isVolume = false;
      volumeInput.value = volumeValue;
    }
  });

  button.addEventListener('click', toggleBtn);

  playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.classList.add('playlist-item-container');
    li.textContent = el.title;
    playListContainer.append(li);
    const button = document.createElement('button');
    button.classList.add('play');
    button.classList.add('player-icon');
    button.classList.add('playlist-button');
    button.classList.add('playlist-button-secondary');
    li.prepend(button);
  });

  function nextSong() {
    button.classList.remove('pause');
    playListItems = playListContainer.childNodes;
    playListItems[playNum].classList.remove('item-active');
    playNum += 1;
    if (playNum == 4) {
      playNum = 0;
    }
    playListItems[playNum].classList.add('item-active');
    isPlay = false;
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    toggleBtn();
  }

  function prevSong() {
    button.classList.remove('pause');
    playListItems = playListContainer.childNodes;
    playListItems[playNum].classList.remove('item-active');
    playNum -= 1;
    if (playNum == -1) {
      playNum = 3;
    }
    playListItems[playNum].classList.add('item-active');
    isPlay = false;
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    toggleBtn();
  }

  playNext.addEventListener('click', nextSong);
  playPrev.addEventListener('click', prevSong);

  // Advanced features

  audio.src = playList[playNum].src;
  songName.textContent = playList[playNum].title;
  currentTiming.textContent = '00:00';
  durationTiming.textContent = playList[playNum].duration;

  volumeInput.addEventListener('input', function() {
    volumeValue = volumeInput.value;
    audio.volume = volumeValue;
    if (audio.volume == 0) {
      volumeOff();
    } else {
      volumeOn();
    }
  });

  progressInput.addEventListener('input', function() {
    audio.currentTime = Math.floor(progressInput.value * 100 / 6.66);
  });

  const playlistCollection = document.querySelectorAll('.playlist-button-secondary');

  function playSecondarySong(i) {
    playListItems = playListContainer.childNodes;
    playListItems.forEach(item => {
      item.classList.remove('item-active');
    });
    playListItems[i].classList.add('item-active');
  }

  for (let i = 0; i < playlistCollection.length; i++) {
    playlistCollection[i].addEventListener('click', () => {
      playNum = i;
      playlistCollection[playNum].classList.toggle('pause');
      playSecondarySong(i);
      toggleBtn();
    });

  }


};

export default audioPlayer;