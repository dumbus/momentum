import '../css/style.css';
import '../css/owfont-regular.css';
import '../index.html';

import timeScript from './modules/timeScript';
import audioPlayer from './modules/audioPlayer';
import todo from './modules/todo';

window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  timeScript();
  audioPlayer();
  todo();

  console.log(`
  Score: 160/160
  [+] Часы и календарь 15/15
  [+] Приветствие 10/10
  [+] Смена фонового изображения 20/20
  [+] Виджет погоды 15/15
  [+] Виджет цитата дня 10/10
  [+] Аудиоплеер 15/15
  [+] Продвинутый аудиоплеер 20/20
  [+] Перевод приложения на два языка (en/ru) 15/15
  [+] Получение фонового изображения от API (Получение при помощи flickr работает довольно медленно, просьба подождать несколько секунд до переключения картинки) 10/10
  [+] Настройки приложения 20/20
  [+] Дополнительный функционал на выбор: To Do List с сохранением дел и их состояния при обновлении страницы 10/10
  `);

}) ;