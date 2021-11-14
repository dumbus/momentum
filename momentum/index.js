(()=>{"use strict";const e=()=>{null==localStorage.getItem("language")&&localStorage.setItem("language","en"),null==localStorage.getItem("imgSource")&&localStorage.setItem("imgSource","github"),null==localStorage.getItem("time")&&localStorage.setItem("time",!0),null==localStorage.getItem("date")&&localStorage.setItem("date",!0),null==localStorage.getItem("greeting")&&localStorage.setItem("greeting",!0),null==localStorage.getItem("quote")&&localStorage.setItem("quote",!0),null==localStorage.getItem("weather")&&localStorage.setItem("weather",!0),null==localStorage.getItem("player")&&localStorage.setItem("player",!0),null==localStorage.getItem("city")&&localStorage.setItem("city","Minsk");let e={language:localStorage.getItem("language"),imgSource:localStorage.getItem("imgSource"),time:localStorage.getItem("time"),date:localStorage.getItem("date"),greeting:localStorage.getItem("greeting"),quote:localStorage.getItem("quote"),weather:localStorage.getItem("weather"),player:localStorage.getItem("player")};const t=document.querySelector(".weather-icon"),n=document.querySelector(".temperature"),o=document.querySelector(".weather-description"),c=document.querySelector(".wind"),a=document.querySelector(".humidity"),r=document.querySelector(".city"),i=document.querySelector(".weather-error"),l=document.querySelector(".quote"),u=document.querySelector(".author"),s=document.querySelector(".change-quote");function d(e=0,t=19){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}async function m(l,u=e.language){try{const e=`https://api.openweathermap.org/data/2.5/weather?q=${l}&lang=${u}&appid=4210f79be2d65c6e8c2376a9120f9018&units=metric`,r=await fetch(e),s=await r.json();t.className="weather-icon owf",t.classList.add(`owf-${s.weather[0].id}`),n.textContent=`${Math.floor(s.main.temp)}°C`,o.textContent=s.weather[0].description,"en"==u?(c.textContent=`Wind speed: ${Math.ceil(s.wind.speed)} m/s`,a.textContent=`Humidity: ${s.main.humidity}% `):"ru"==u&&(c.textContent=`Скорость ветра: ${Math.ceil(s.wind.speed)} м/с`,a.textContent=`Влажность: ${s.main.humidity}% `),i.textContent=""}catch(e){""===l?"en"==u?(r.setAttribute("placeholder","[Enter sity]"),i.textContent="Error! Nothing to geocode for ' '!"):"ru"==u&&(r.setAttribute("placeholder","[Введите город]"),i.textContent="Ошибка! Ничего не найдено как ' '!"):i.textContent="en"==u?`Error! city not found for ${l}!`:`Ошибка! Не найден город ${l}!`,n.textContent="",o.textContent="",c.textContent="",a.textContent=""}}null==localStorage.getItem("city")&&localStorage.setItem("city",r.value),r.value=localStorage.getItem("city"),r.addEventListener("change",(()=>{localStorage.setItem("city",r.value),m(r.value)})),m(r.value);let g=d();async function p(t=e.language){const n=await fetch("./assets/data.json"),o=await n.json();"en"==t?(l.textContent=o[g].enQuote,u.textContent=o[g].enAuthor):"ru"==t&&(l.textContent=o[g].ruQuote,u.textContent=o[g].ruAuthor)}p(),s.addEventListener("click",(()=>{g=d(),p()}));const h=document.querySelector("time"),S=document.querySelector("date"),v=document.querySelector(".greeting"),y=document.querySelector(".name"),f=document.querySelector("body");let L=function(e=20){return Math.floor(Math.random()*e)+1}();const k=document.querySelector(".slide-next"),q=document.querySelector(".slide-prev");function C(t=e.language){const n=(new Date).toLocaleTimeString();h.textContent=n,function(t=e.language){const n=new Date,o={weekday:"long",month:"long",day:"numeric",timeZone:"UTC"};let c;"en"==t?c=n.toLocaleDateString("en-EN",o):"ru"==t&&(c=n.toLocaleDateString("ru-RU",o));S.textContent=c}(t),function(t=e.language){let n=I();"en"==t?v.textContent=`Good ${x[n]}`:"ru"==t&&(v.textContent=E[n])}(t),setTimeout(C,1e3)}const x={morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},E={morning:"Доброе утро",afternoon:"Добрый день",evening:"Добрый вечер",night:"Доброй ночи"};function I(){const e=(new Date).getHours();return e>=6&&e<12?"morning":e>=12&&e<18?"afternoon":e>=18&&e<24?"evening":e>=0&&e<6?"night":void 0}function w(){let e=I(),t=L;t<10&&(t="0"+L);const n=new Image;n.src=`https://raw.githubusercontent.com/dumbus/stage1-tasks/assets/images/${e}/${t}.jpg`,n.onload=()=>{f.style.backgroundImage=`url("${n.src}")`}}function b(){L+=1,21==L&&(L=1),w()}function $(){L-=1,0==L&&(L=20),w()}window.addEventListener("beforeunload",(function(){localStorage.setItem("name",y.value)})),window.addEventListener("load",(function(){localStorage.getItem("name")&&(y.value=localStorage.getItem("name"))})),w(),C();let M,T,j=I();async function A(){try{const t=`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=ef16d9b8603933f2c3c1c961b2f5f0ea&tags=${j}&extras=url_l&format=json&nojsoncallback=1`,n=await fetch(t),o=await n.json();let c=(e=20,Math.floor(Math.random()*e));return M=o.photos.photo[c].url_l,await M}catch(e){console.log(e)}var e}async function D(){M=await A();const e=new Image;e.src=M,e.onload=()=>{f.style.backgroundImage=`url("${e.src}")`}}async function N(){T=await async function(){try{const e=`https://api.unsplash.com/photos/random?orientation=landscape&query=${j}&client_id=bHZ60GY9R1AgaR3EYhPVdg2eIGU5CoCNuCYUy1c1bqQ`,t=await fetch(e),n=await t.json();return T=n.urls.regular,await T}catch(e){console.log("unsplash Error")}}();const e=new Image;e.src=T,e.onload=()=>{f.style.backgroundImage=`url("${e.src}")`}}const R=document.querySelector(".settings-button"),Y=document.querySelector(".settings-button-text"),G=document.querySelector(".settings-popup"),O=document.querySelector(".close");R.addEventListener("click",(()=>{G.classList.contains("opened-popup")?(G.classList.remove("fadeIn"),G.classList.add("fadeOut"),G.classList.remove("opened-popup"),G.addEventListener("animationend",(()=>{G.classList.add("closed-popup"),G.classList.remove("opened-popup")}))):(G.classList.remove("closed-popup"),G.classList.remove("fadeOut"),G.classList.add("fadeIn"),G.addEventListener("animationend",(()=>{G.classList.remove("closed-popup"),G.classList.add("opened-popup")})))})),O.addEventListener("click",(()=>{G.classList.remove("fadeIn"),G.classList.add("fadeOut"),G.classList.remove("opened-popup"),G.addEventListener("animationend",(()=>{G.classList.add("closed-popup"),G.classList.remove("opened-popup")}))}));const Q="Settings",U="Tag for images",W="Time",_="Date",H="Greeting",F="Quote",Z="Weather",B="Audio player",P="Настройки",V="Тэг для изображений",z="Время",J="Дата",K="Приветствие",X="Цитата",ee="Погода",te="Аудиоплеер",ne=document.querySelector(".popup-header"),oe=document.querySelector(".settings-tag"),ce=document.querySelector(".setting-hide-time"),ae=document.querySelector(".setting-hide-date"),re=document.querySelector(".setting-hide-greeting"),ie=document.querySelector(".setting-hide-quote"),le=document.querySelector(".setting-hide-weather"),ue=document.querySelector(".setting-hide-player");function se(t=e.language){"en"==t?(Y.textContent=Q,ne.textContent=Q,oe.textContent=U,ce.textContent=W,ae.textContent=_,re.textContent=H,ie.textContent=F,le.textContent=Z,ue.textContent=B):"ru"==t&&(Y.textContent=P,ne.textContent=P,oe.textContent=V,ce.textContent=z,ae.textContent=J,re.textContent=K,ie.textContent=X,le.textContent=ee,ue.textContent=te)}se();const de=document.querySelector(".language-input-eng"),me=document.querySelector(".language-input-ru");function ge(){de.checked&&(localStorage.setItem("language","en"),e.language="en"),me.checked&&(localStorage.setItem("language","ru"),e.language="ru")}"en"==e.language?(de.checked=!0,me.checked=!1):"ru"==e.language&&(me.checked=!0,de.checked=!1),de.addEventListener("input",(()=>{ge(),C(),m(r.value),se(),p()})),me.addEventListener("input",(()=>{ge(),C(),m(r.value),se(),p()}));const pe=document.querySelector(".background-input-gt"),he=document.querySelector(".background-input-un"),Se=document.querySelector(".background-input-fl"),ve=document.querySelector(".settings-tag-container");function ye(){pe.checked&&(localStorage.setItem("imgSource","github"),e.imgSource="github",ve.classList.add("hidden")),he.checked&&(localStorage.setItem("imgSource","unsplash"),e.imgSource="unsplash",ve.classList.remove("hidden")),Se.checked&&(localStorage.setItem("imgSource","flickr"),e.imgSource="flickr",ve.classList.remove("hidden"))}function fe(){"github"==e.imgSource&&(k.addEventListener("click",b),q.addEventListener("click",$),k.removeEventListener("click",D),q.removeEventListener("click",D),k.removeEventListener("click",N),q.removeEventListener("click",N)),"flickr"==e.imgSource&&(k.addEventListener("click",D),q.addEventListener("click",D),k.removeEventListener("click",b),q.removeEventListener("click",$),k.removeEventListener("click",N),q.removeEventListener("click",N)),"unsplash"==e.imgSource&&(k.addEventListener("click",N),q.addEventListener("click",N),k.removeEventListener("click",b),q.removeEventListener("click",$),k.removeEventListener("click",D),q.removeEventListener("click",D))}"github"==e.imgSource?(pe.checked=!0,he.checked=!1,Se.checked=!1):"unsplash"==e.imgSource?(pe.checked=!1,he.checked=!0,Se.checked=!1):"flickr"==e.imgSource&&(pe.checked=!1,he.checked=!1,Se.checked=!0),ye(),fe(),pe.addEventListener("input",(()=>{ye(),fe()})),he.addEventListener("input",(()=>{ye(),fe()})),Se.addEventListener("input",(()=>{ye(),fe()}))},t=()=>{const e=document.querySelector("audio"),t=document.querySelector(".play"),n=document.querySelector(".play-list"),o=document.querySelector(".play-prev"),c=document.querySelector(".play-next");let a;const r=document.querySelector(".player-name"),i=document.querySelector(".current-timing"),l=document.querySelector(".duration-timing"),u=document.querySelector(".muteButton"),s=document.querySelector(".volume-progress"),d=document.querySelector(".player-progress");let m=!1,g=!0,p=.5,h=0;const S=[{title:"Aqua Caelestis",src:"./assets/sounds/Aqua Caelestis.mp3",duration:"00:15"},{title:"River Flows In You",src:"./assets/sounds/River Flows In You.mp3",duration:"00:15"},{title:"Summer Wind",src:"./assets/sounds/Summer Wind.mp3",duration:"00:15"},{title:"Ennio Morricone",src:"./assets/sounds/Ennio Morricone.mp3",duration:"00:15"}];function v(){a=n.childNodes,a[h].classList.add("item-active"),t.classList.toggle("pause"),m?(e.pause(),m=!1):(r.textContent=S[h].title,l.textContent=S[h].duration,e.play(),m=!0)}function y(){e.volume=p,u.style.opacity=1}function f(){e.volume=0,u.style.opacity=.2}function L(){t.classList.remove("pause"),a=n.childNodes,a[h].classList.remove("item-active"),h+=1,4==h&&(h=0),a[h].classList.add("item-active"),m=!1,e.src=S[h].src,e.currentTime=0,v()}e.addEventListener("timeupdate",(function(){var t=Math.floor(e.currentTime/e.duration*100)||0,n=e.currentTime/e.duration||0;let o=Math.floor(t/6.66);o<10&&(o="0"+o),i.textContent=`00:${o}`,d.value=n,100===t&&L()})),u.addEventListener("click",(()=>{g?(y(),g=!1,s.value=p):(f(),g=!0,s.value=0)})),t.addEventListener("click",v),S.forEach((e=>{const t=document.createElement("li");t.classList.add("play-item"),t.textContent=e.title,n.append(t)})),c.addEventListener("click",L),o.addEventListener("click",(function(){t.classList.remove("pause"),a=n.childNodes,a[h].classList.remove("item-active"),h-=1,-1==h&&(h=3),a[h].classList.add("item-active"),m=!1,e.src=S[h].src,e.currentTime=0,v()})),e.src=S[h].src,r.textContent=S[h].title,i.textContent="00:00",l.textContent=S[h].duration,s.addEventListener("input",(function(){p=s.value,e.volume=p,0==e.volume?f():y()})),d.addEventListener("input",(function(){e.currentTime=Math.floor(100*d.value/6.66)}))};window.addEventListener("DOMContentLoaded",(()=>{e(),t()}))})();