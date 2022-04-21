const timeSctipt = () => {

  if (localStorage.getItem('language') == null) {
    localStorage.setItem('language', 'en');
  }

  if (localStorage.getItem('imgSource') == null) {
    localStorage.setItem('imgSource', 'github');
  }

  if (localStorage.getItem('time') == null) {
    localStorage.setItem('time', true);
  }

  if (localStorage.getItem('date') == null) {
    localStorage.setItem('date', true);
  }

  if (localStorage.getItem('greeting') == null) {
    localStorage.setItem('greeting', true);
  }

  if (localStorage.getItem('quote') == null) {
    localStorage.setItem('quote', true);
  }

  if (localStorage.getItem('weather') == null) {
    localStorage.setItem('weather', true);
  }

  if (localStorage.getItem('player') == null) {
    localStorage.setItem('player', true);
  }

  if (localStorage.getItem('todo') == null) {
    localStorage.setItem('todo', true);
  }

  if ((localStorage.getItem('city') == null) && (localStorage.getItem('language') == 'en')) {
    localStorage.setItem('city', 'Minsk');
  }

  if ((localStorage.getItem('city') == null) && (localStorage.getItem('language') == 'en')) {
    localStorage.setItem('city', 'Минск');
  }

  let settings = {
    'language': localStorage.getItem('language'),
    'imgSource': localStorage.getItem('imgSource'),
    'time': localStorage.getItem('time'),
    'date': localStorage.getItem('date'),
    'greeting': localStorage.getItem('greeting'),
    'quote': localStorage.getItem('quote'),
    'weather': localStorage.getItem('weather'),
    'player': localStorage.getItem('player'),
    'todo': localStorage.getItem('todo'),
    'enError': 'Sorry, something went wrong...',
    'ruError': 'Извините, что-то пошло не так...',
    'enPlaceholder': '[Enter your name]',
    'ruPlaceholder': '[Введите имя]'
  };

  // widgets

  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherDescription = document.querySelector('.weather-description');
  const wind = document.querySelector('.wind');
  const humidity = document.querySelector('.humidity');

  const cityInput = document.querySelector('.city');
  const weatherError = document.querySelector('.weather-error');

  const quoteBlock = document.querySelector('.quote');
  const authorBlock = document.querySelector('.author');
  const changeQuote = document.querySelector('.change-quote');

  // Random Number

  function getRandomIntInclusive(min = 0, max = 19) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  // Weather

  if ((localStorage.getItem('city') == null) && (localStorage.getItem('language') == 'en')) {
    localStorage.setItem('city', 'Minsk');
  }

  if ((localStorage.getItem('city') == null) && (localStorage.getItem('language') == 'en')) {
    localStorage.setItem('city', 'Минск');
  }

  cityInput.value = localStorage.getItem('city');

  cityInput.addEventListener('change', () => {
    localStorage.setItem('city', cityInput.value);
    getWeather(cityInput.value);
  });

  async function getWeather(city, lang = settings.language) {  
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=4210f79be2d65c6e8c2376a9120f9018&units=metric`;
      const res = await fetch(url);
      const data = await res.json(); 
      
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.floor(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      
      if (lang == 'en') {
        wind.textContent = `Wind speed: ${Math.ceil(data.wind.speed)} m/s`;
        humidity.textContent = `Humidity: ${data.main.humidity}% `;
      } else if (lang == 'ru') {
        wind.textContent = `Скорость ветра: ${Math.ceil(data.wind.speed)} м/с`;
        humidity.textContent = `Влажность: ${data.main.humidity}% `;
      }

      weatherError.textContent = '';
    } catch (err) {
      if (city === '') {
        if (lang == 'en') {
          cityInput.setAttribute('placeholder', '[Enter sity]');
          weatherError.textContent = `Error! Nothing to geocode for ' '!`;
        } else if (lang == 'ru') {
          cityInput.setAttribute('placeholder', '[Введите город]');
          weatherError.textContent = `Ошибка! Ничего не найдено как ' '!`;
        }
      } else {
        if (lang == 'en') {
          weatherError.textContent = `Error! city not found for ${city}!`;
        } else {
          weatherError.textContent = `Ошибка! Не найден город ${city}!`;
        }
        
      }
      temperature.textContent = '';
      weatherDescription.textContent = '';
      wind.textContent = '';
      humidity.textContent = '';
    }
  }

  getWeather(cityInput.value);

  // Quotes

  let randomNum = getRandomIntInclusive();

  async function getQuotes(lang = settings.language) {  
    const quotes = './assets/data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 

    if (lang == 'en') {
      quoteBlock.textContent = data[randomNum].enQuote;
      authorBlock.textContent = data[randomNum].enAuthor;
    } else if (lang == 'ru') {
      quoteBlock.textContent = data[randomNum].ruQuote;
      authorBlock.textContent = data[randomNum].ruAuthor;
    }
  }
  getQuotes();

  changeQuote.addEventListener('click', () => {
    randomNum = getRandomIntInclusive();
    getQuotes();
  });

  // TimeScript

  const timeBlock = document.querySelector('time');
  const dateBlock = document.querySelector('date');

  const greetingSpan = document.querySelector('.greeting');
  const nameInput = document.querySelector('.name');

  const body = document.querySelector('body');
  let randomNumTime = getRandomNumber();

  const slideNext = document.querySelector('.slide-next');
  const slidePrev = document.querySelector('.slide-prev');

  // Time

  function showTime(lang = settings.language) {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();

    timeBlock.textContent = currentTime;
    
    showDate(lang);
    generateGreeting(lang);
    setTimeout(showTime, 1000);
  }

  // Date

  function showDate(lang = settings.language) {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'};
    let currentDate;
    if (lang == 'en') {
      currentDate = date.toLocaleDateString('en-EN', options);
    } else if (lang == 'ru') {
      currentDate = date.toLocaleDateString('ru-RU', options);
    }

    dateBlock.textContent = currentDate;
  }

  // Greeting

  const greetingEng = {
    'morning': 'morning',
    'afternoon': 'afternoon',
    'evening': 'evening',
    'night': 'night'
  };

  const greetingRu = {
    'morning': 'Доброе утро',
    'afternoon': 'Добрый день',
    'evening': 'Добрый вечер',
    'night': 'Доброй ночи'
  };

  function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();

    if ((hours >= 6) && (hours < 12)) {
      return 'morning';
    } else if ((hours >= 12) && (hours < 18)) {
      return 'afternoon';
    } else if ((hours >= 18) && (hours < 24)) {
      return 'evening';
    } else if ((hours >= 0) && (hours < 6)) {
      return 'night';
    }
  }

  function generateGreeting(lang = settings.language) {
    let partOfDay = getTimeOfDay();

    const nameInput = document.querySelector('.name');

    if (lang == 'en') {
      greetingSpan.textContent = `Good ${greetingEng[partOfDay]}`;
      nameInput.setAttribute('placeholder', settings.enPlaceholder);
    } else if (lang == 'ru') {
      greetingSpan.textContent = greetingRu[partOfDay];
      nameInput.setAttribute('placeholder', settings.ruPlaceholder);
    }
  }

  function getRandomNumber(max = 20) {
    return Math.floor(Math.random() * max) + 1;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // Setting BG

  function setBg() {
    let timeOfDay = getTimeOfDay();
    let bgNum = randomNumTime;

    if (bgNum < 10) {
      bgNum = '0' + randomNumTime;
    }

    const img = new Image();
    img.src = `https://raw.githubusercontent.com/dumbus/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {      
      body.style.backgroundImage = `url("${img.src}")`;
    }; 
  }

  function getSlideNext() {
    randomNumTime += 1;
    if (randomNumTime == 21) {
      randomNumTime = 1;
    }
    setBg();
  }

  function getSlidePrev() {
    randomNumTime -= 1;
    if (randomNumTime == 0) {
      randomNumTime = 20;
    }
    setBg();
  }

  // LocalStorage

  function setLocalStorage() {
    localStorage.setItem('name', nameInput.value);
  }

  function getLocalStorage() {
    if(localStorage.getItem('name')) {
      nameInput.value = localStorage.getItem('name');
    }
  }
  
  window.addEventListener('beforeunload', setLocalStorage);
  window.addEventListener('load', getLocalStorage);

  setBg();
  showTime();

  // bg via API 
  const settingsTagsInput = document.querySelector('.settings-background-tags');

  let tag = getTimeOfDay();

  if (localStorage.getItem('tag') == null) {
    localStorage.setItem('tag', tag);
  }

  settings.tag = localStorage.getItem('tag');

  settingsTagsInput.value = settings.tag;

  settingsTagsInput.addEventListener('input', () => {
    tag = settingsTagsInput.value;
    localStorage.setItem('tag', tag);
  });

  // if settings = flickr

  let linkFlickr;

  async function getLinkToImageFlickr(lang = settings.language) {
    try {
      tag = localStorage.getItem('tag');
      const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=ef16d9b8603933f2c3c1c961b2f5f0ea&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
      const res = await fetch(url);
      const data = await res.json(); 

      let randomInt = getRandomInt(20);
      linkFlickr = data.photos.photo[randomInt].url_l;

      return await linkFlickr;
      
    } catch (err) {
      console.log(err);
      if (lang == 'en') {
        alert(settings.enError);
      } else if (lang == 'ru') {
        alert(settings.ruError);
      }
    }
  }

  async function setFlickrBg() {
    linkFlickr = await getLinkToImageFlickr();
    
    const img = new Image();
    img.src = linkFlickr;
    img.onload = () => {      
      body.style.backgroundImage = `url("${img.src}")`;
    }; 
  }

  // UNSPLASH
  let linkUnsplash;

  async function getLinkToImageUnsplash(lang = settings.language) {
    try {
      tag = localStorage.getItem('tag');
      const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=bHZ60GY9R1AgaR3EYhPVdg2eIGU5CoCNuCYUy1c1bqQ`;
      const res = await fetch(url);
      const data = await res.json(); 
      linkUnsplash = data.urls.regular;

      return await linkUnsplash;

    } catch (err) {
      if (lang == 'en') {
        alert(settings.enError);
      } else if (lang == 'ru') {
        alert(settings.ruError);
      }
    }
  }

  async function setUnsplashBg() {
    linkUnsplash = await getLinkToImageUnsplash();
    
    const img = new Image();
    img.src = linkUnsplash;
    img.onload = () => {      
      body.style.backgroundImage = `url("${img.src}")`;
    }; 
  }

  // Settings

  const settingsBtn = document.querySelector('.settings-button');
  const settingsBtnText = document.querySelector('.settings-button-text');
  const settingsPopup = document.querySelector('.settings-popup');
  const settingsClose = document.querySelector('.close');


  settingsBtn.addEventListener('click', () => {
    if (!settingsPopup.classList.contains('opened-popup')) {
      settingsPopup.classList.remove('closed-popup');
      settingsPopup.classList.remove('fadeOut');
      settingsPopup.classList.add('fadeIn');
      
      settingsPopup.addEventListener('animationend', () => {
        settingsPopup.classList.remove('closed-popup');
        settingsPopup.classList.add('opened-popup');
      });
    } else {
      settingsPopup.classList.remove('fadeIn');
      settingsPopup.classList.add('fadeOut');
      settingsPopup.classList.remove('opened-popup');

      settingsPopup.addEventListener('animationend', () => {
        settingsPopup.classList.add('closed-popup');
        settingsPopup.classList.remove('opened-popup');
      });
    }
  });

  settingsClose.addEventListener('click', () => {
    settingsPopup.classList.remove('fadeIn');
    settingsPopup.classList.add('fadeOut');
    settingsPopup.classList.remove('opened-popup');

    settingsPopup.addEventListener('animationend', () => {
      settingsPopup.classList.add('closed-popup');
      settingsPopup.classList.remove('opened-popup');
    });
  });

   //Settings language

   const settingsEng = {
    'settings': 'Settings',
    'tag': 'Tag for images',
    'tagPlaceholder': '',
    'time': 'Time',
    'date': 'Date',
    'greeting': 'Greeting',
    'quote': 'Quote',
    'weather': 'Weather',
    'player': 'Audio player'
  };

  const settingsRu = {
    'settings': 'Настройки',
    'tag': 'Тэг для изображений',
    'tagPlaceholder': '',
    'time': 'Время',
    'date': 'Дата',
    'greeting': 'Приветствие',
    'quote': 'Цитата',
    'weather': 'Погода',
    'player': 'Аудиоплеер'
  };

  const settingsHeader = document.querySelector('.popup-header');
  const settingsTag = document.querySelector('.settings-tag');
  const settingsTime = document.querySelector('.setting-hide-time');
  const settingsDate = document.querySelector('.setting-hide-date');
  const settingsGreeting = document.querySelector('.setting-hide-greeting');
  const settingsQuote = document.querySelector('.setting-hide-quote');
  const settingsWeather = document.querySelector('.setting-hide-weather');
  const settingsPlayer = document.querySelector('.setting-hide-player');

  function generateSettings(lang = settings.language) {
    if (lang == 'en') {
      settingsBtnText.textContent = settingsEng.settings;
      settingsHeader.textContent = settingsEng.settings;
      settingsTag.textContent = settingsEng.tag;
      settingsTime.textContent = settingsEng.time;
      settingsDate.textContent = settingsEng.date;
      settingsGreeting.textContent = settingsEng.greeting;
      settingsQuote.textContent = settingsEng.quote;
      settingsWeather.textContent = settingsEng.weather;
      settingsPlayer.textContent = settingsEng.player;
    } else if (lang == 'ru') {
      settingsBtnText.textContent = settingsRu.settings;
      settingsHeader.textContent = settingsRu.settings;
      settingsTag.textContent = settingsRu.tag;
      settingsTime.textContent = settingsRu.time;
      settingsDate.textContent = settingsRu.date;
      settingsGreeting.textContent = settingsRu.greeting;
      settingsQuote.textContent = settingsRu.quote;
      settingsWeather.textContent = settingsRu.weather;
      settingsPlayer.textContent = settingsRu.player;
    }
  }

  generateSettings();

  // Settings language functional

  const langEng = document.querySelector('.language-input-eng');
  const langRu = document.querySelector('.language-input-ru');

  if (settings.language == 'en') {
    langEng.checked = true;
    langRu.checked = false;
  } else if (settings.language == 'ru') {
    langRu.checked = true;
    langEng.checked = false;
  }

  function checkLanguage() {
    if (langEng.checked) {
      localStorage.setItem('language', 'en');
      settings.language = 'en';
    }
    if (langRu.checked) {
      localStorage.setItem('language', 'ru');
      settings.language = 'ru';
    }
  }

  langEng.addEventListener('input', () => {
    checkLanguage();
    showTime();
    localStorage.setItem('city', 'Minsk');
    cityInput.value = 'Minsk';
    getWeather(cityInput.value);
    generateSettings();
    getQuotes();
  });
  langRu.addEventListener('input', () => {
    checkLanguage();
    showTime();
    localStorage.setItem('city', 'Минск');
    cityInput.value = 'Минск';
    getWeather(cityInput.value);
    generateSettings();
    getQuotes();
  });

  // Settings images functional

  const githubInput = document.querySelector('.background-input-gt');
  const unsplashInput = document.querySelector('.background-input-un');
  const flickrInput = document.querySelector('.background-input-fl');
  const tagInputContainer = document.querySelector('.settings-tag-container');

  if (settings.imgSource == 'github') {
    githubInput.checked = true;
    unsplashInput.checked = false;
    flickrInput.checked = false;
  } else if (settings.imgSource == 'unsplash') {
    githubInput.checked = false;
    unsplashInput.checked = true;
    flickrInput.checked = false;
  } else if (settings.imgSource == 'flickr') {
    githubInput.checked = false;
    unsplashInput.checked = false;
    flickrInput.checked = true;
  }

  function checkImgSource() {
    if (githubInput.checked) {
      localStorage.setItem('imgSource', 'github');
      settings.imgSource = 'github';
      tagInputContainer.classList.add('hidden');
    }
    if (unsplashInput.checked) {
      localStorage.setItem('imgSource', 'unsplash');
      settings.imgSource = 'unsplash';
      tagInputContainer.classList.remove('hidden');
    }
    if (flickrInput.checked) {
      localStorage.setItem('imgSource', 'flickr');
      settings.imgSource = 'flickr';
      tagInputContainer.classList.remove('hidden');
    }
  }

  checkImgSource();

  function setImageSource() {
    if (settings.imgSource == 'github') {
      slideNext.addEventListener('click', getSlideNext);
      slidePrev.addEventListener('click', getSlidePrev);
      slideNext.removeEventListener('click', setFlickrBg);
      slidePrev.removeEventListener('click', setFlickrBg);
      slideNext.removeEventListener('click', setUnsplashBg);
      slidePrev.removeEventListener('click', setUnsplashBg);
    }
    if (settings.imgSource == 'flickr') {
      slideNext.addEventListener('click', setFlickrBg);
      slidePrev.addEventListener('click', setFlickrBg);
      slideNext.removeEventListener('click', getSlideNext);
      slidePrev.removeEventListener('click', getSlidePrev);
      slideNext.removeEventListener('click', setUnsplashBg);
      slidePrev.removeEventListener('click', setUnsplashBg);
    }
    if (settings.imgSource == 'unsplash') {
      slideNext.addEventListener('click', setUnsplashBg);
      slidePrev.addEventListener('click', setUnsplashBg);
      slideNext.removeEventListener('click', getSlideNext);
      slidePrev.removeEventListener('click', getSlidePrev);
      slideNext.removeEventListener('click', setFlickrBg);
      slidePrev.removeEventListener('click', setFlickrBg);
    }
  }

  setImageSource();

  githubInput.addEventListener('input', () => {
    checkImgSource();
    setImageSource();
  });
  unsplashInput.addEventListener('input', () => {
    checkImgSource();
    setImageSource();
    setUnsplashBg();
  });
  flickrInput.addEventListener('input', () => {
    checkImgSource();
    setImageSource();
    setFlickrBg();
  });

  // Settings hiding functional

  const timeHide = document.querySelector('.hide-time');
  const dateHide = document.querySelector('.hide-date');
  const greetingHide = document.querySelector('.hide-greeting');
  const quoteHide = document.querySelector('.hide-quote');
  const weatherHide = document.querySelector('.hide-weather');
  const playerHide = document.querySelector('.hide-player');
  const todoHide = document.querySelector('.hide-todo');

  const timeHideBlock = document.querySelector('.time');
  const dateHideBlock = document.querySelector('.date');
  const greetingHideBlock = document.querySelector('.greeting-container');
  const quoteHideBlock = document.querySelector('.quote-block');
  const weatherHideBlock = document.querySelector('.weather');
  const playerHideBlock = document.querySelector('.player');
  const todoHideBlock = document.querySelector('.todo-button');


  if (localStorage.getItem('time') == 'true') {
    timeHide.checked = true;
  } else {
    timeHide.checked = false;
    timeHideBlock.classList.add('closed-items');
  }
  if (localStorage.getItem('date') == 'true') {
    dateHide.checked = true;
  } else {
    dateHide.checked = false;
    dateHideBlock.classList.add('closed-items');
  }
  if (localStorage.getItem('greeting') == 'true') {
    greetingHide.checked = true;
  } else {
    greetingHide.checked = false;
    greetingHideBlock.classList.add('closed-items');
  }
  if (localStorage.getItem('quote') == 'true') {
    quoteHide.checked = true;
  } else {
    quoteHide.checked = false;
    quoteHideBlock.classList.add('closed-items');
  }
  if (localStorage.getItem('weather') == 'true') {
    weatherHide.checked = true;
  } else {
    weatherHide.checked = false;
    weatherHideBlock.classList.add('closed-items');
  }
  if (localStorage.getItem('player') == 'true') {
    playerHide.checked = true;
  } else {
    playerHide.checked = false;
    playerHideBlock.classList.add('closed-items');
  }
  if (localStorage.getItem('todo') == 'true') {
    todoHide.checked = true;
  } else {
    todoHide.checked = false;
    todoHideBlock.classList.add('closed-items');
  }

  function checkHiddenBlocks() {
    if (timeHide.checked == true) {
      localStorage.setItem('time', 'true');
      settings.time = 'true';
    } else {
      localStorage.setItem('time', 'false');
      settings.time = 'false';
    }
    if (dateHide.checked == true) {
      localStorage.setItem('date', 'true');
      settings.date = 'true';
    } else {
      localStorage.setItem('date', 'false');
      settings.date = 'false';
    }
    if (greetingHide.checked == true) {
      localStorage.setItem('greeting', 'true');
      settings.greeting = 'true';
    } else {
      localStorage.setItem('greeting', 'false');
      settings.greeting = 'false';
    }
    if (quoteHide.checked == true) {
      localStorage.setItem('quote', 'true');
      settings.quote = 'true';
    } else {
      localStorage.setItem('quote', 'false');
      settings.quote = 'false';
    }
    if (weatherHide.checked == true) {
      localStorage.setItem('weather', 'true');
      settings.weather = 'true';
    } else {
      localStorage.setItem('weather', 'false');
      settings.weather = 'false';
    }
    if (playerHide.checked == true) {
      localStorage.setItem('player', 'true');
      settings.player = 'true';
    } else {
      localStorage.setItem('player', 'false');
      settings.player = 'false';
    }
    if (todoHide.checked == true) {
      localStorage.setItem('todo', 'true');
      settings.todo = 'true';
    } else {
      localStorage.setItem('todo', 'false');
      settings.todo = 'false';
    }
  }

  timeHide.addEventListener('input', () => {
    checkHiddenBlocks();
    if (settings.time == 'false') {
      timeHideBlock.classList.remove('fadeInItems');
      timeHideBlock.classList.add('fadeOutItems');
      timeHideBlock.classList.remove('opened-items');

      timeHideBlock.addEventListener('animationend', () => {
        timeHideBlock.classList.add('closed-items');
        timeHideBlock.classList.remove('opened-items');
      });
    } else {
      timeHideBlock.classList.remove('fadeOutItems');
      timeHideBlock.classList.add('fadeInItems');
      timeHideBlock.classList.remove('closed-items');

      timeHideBlock.addEventListener('animationend', () => {
        timeHideBlock.classList.add('opened-items');
        timeHideBlock.classList.remove('closed-items');
      });
    }
  });

  dateHide.addEventListener('input', () => {
    checkHiddenBlocks();
    if (settings.date == 'false') {
      dateHideBlock.classList.remove('fadeInItems');
      dateHideBlock.classList.add('fadeOutItems');
      dateHideBlock.classList.remove('opened-items');

      dateHideBlock.addEventListener('animationend', () => {
        dateHideBlock.classList.add('closed-items');
        dateHideBlock.classList.remove('opened-items');
      });
    } else {
      dateHideBlock.classList.remove('fadeOutItems');
      dateHideBlock.classList.add('fadeInItems');
      dateHideBlock.classList.remove('closed-items');

      dateHideBlock.addEventListener('animationend', () => {
        dateHideBlock.classList.add('opened-items');
        dateHideBlock.classList.remove('closed-items');
      });
    }
  });

  greetingHide.addEventListener('input', () => {
    checkHiddenBlocks();
    if (settings.greeting == 'false') {
      greetingHideBlock.classList.remove('fadeInItems');
      greetingHideBlock.classList.add('fadeOutItems');
      greetingHideBlock.classList.remove('opened-items');

      greetingHideBlock.addEventListener('animationend', () => {
        greetingHideBlock.classList.add('closed-items');
        greetingHideBlock.classList.remove('opened-items');
      });
    } else {
      greetingHideBlock.classList.remove('fadeOutItems');
      greetingHideBlock.classList.add('fadeInItems');
      greetingHideBlock.classList.remove('closed-items');

      greetingHideBlock.addEventListener('animationend', () => {
        greetingHideBlock.classList.add('opened-items');
        greetingHideBlock.classList.remove('closed-items');
      });
    }
  });

  quoteHide.addEventListener('input', () => {
    checkHiddenBlocks();
    if (settings.quote == 'false') {
      quoteHideBlock.classList.remove('fadeInItems');
      quoteHideBlock.classList.add('fadeOutItems');
      quoteHideBlock.classList.remove('opened-items');

      quoteHideBlock.addEventListener('animationend', () => {
        quoteHideBlock.classList.add('closed-items');
        quoteHideBlock.classList.remove('opened-items');
      });
    } else {
      quoteHideBlock.classList.remove('fadeOutItems');
      quoteHideBlock.classList.add('fadeInItems');
      quoteHideBlock.classList.remove('closed-items');

      quoteHideBlock.addEventListener('animationend', () => {
        quoteHideBlock.classList.add('opened-items');
        quoteHideBlock.classList.remove('closed-items');
      });
    }
  });

  weatherHide.addEventListener('input', () => {
    checkHiddenBlocks();
    if (settings.weather == 'false') {
      weatherHideBlock.classList.remove('fadeInItems');
      weatherHideBlock.classList.add('fadeOutItems');
      weatherHideBlock.classList.remove('opened-items');

      weatherHideBlock.addEventListener('animationend', () => {
        weatherHideBlock.classList.add('closed-items');
        weatherHideBlock.classList.remove('opened-items');
      });
    } else {
      weatherHideBlock.classList.remove('fadeOutItems');
      weatherHideBlock.classList.add('fadeInItems');
      weatherHideBlock.classList.remove('closed-items');

      weatherHideBlock.addEventListener('animationend', () => {
        weatherHideBlock.classList.add('opened-items');
        weatherHideBlock.classList.remove('closed-items');
      });
    }
  });

  playerHide.addEventListener('input', () => {
    checkHiddenBlocks();
    if (settings.player == 'false') {
      playerHideBlock.classList.remove('fadeInItems');
      playerHideBlock.classList.add('fadeOutItems');
      playerHideBlock.classList.remove('opened-items');

      playerHideBlock.addEventListener('animationend', () => {
        playerHideBlock.classList.add('closed-items');
        playerHideBlock.classList.remove('opened-items');
      });
    } else {
      playerHideBlock.classList.remove('fadeOutItems');
      playerHideBlock.classList.add('fadeInItems');
      playerHideBlock.classList.remove('closed-items');

      playerHideBlock.addEventListener('animationend', () => {
        playerHideBlock.classList.add('opened-items');
        playerHideBlock.classList.remove('closed-items');
      });
    }
  });

  todoHide.addEventListener('input', () => {
    checkHiddenBlocks();
    if (settings.todo == 'false') {
      todoHideBlock.classList.remove('fadeInItems');
      todoHideBlock.classList.add('fadeOutItems');
      todoHideBlock.classList.remove('opened-items');

      todoHideBlock.addEventListener('animationend', () => {
        todoHideBlock.classList.add('closed-items');
        todoHideBlock.classList.remove('opened-items');
      });
    } else {
      todoHideBlock.classList.remove('fadeOutItems');
      todoHideBlock.classList.add('fadeInItems');
      todoHideBlock.classList.remove('closed-items');

      todoHideBlock.addEventListener('animationend', () => {
        todoHideBlock.classList.add('opened-items');
        todoHideBlock.classList.remove('closed-items');
      });
    }
  });

  

};

export default timeSctipt;