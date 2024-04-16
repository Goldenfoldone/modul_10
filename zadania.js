function My(el) {
    el.classList.toggle("active")
}

function Man(el) {
  alert(`Ширина экрана равна ${window.innerWidth}, а его высота равна ${window.innerHeight}`)
}

const wsUri = "wss://echo-ws-service.herokuapp.com";
const btn_message = document.querySelector('.chat__btn');
const btn_geo = document.querySelector('.chat .geo');
const output = document.querySelector('.chat__window .chat__window_flex')

let websoket = new WebSocket(wsUri);;
let i = 0;

function creat_message(param) {  
  let pre = document.createElement("p");
  if (i == 0) {
    pre.setAttribute("class", "mess one");
    i = 1;
  } else {
    pre.setAttribute("class", "mess");
    i = 0;
  }
  pre.innerHTML = param
  output.appendChild(pre)  
}

btn_message.addEventListener("click", () => {
  let message = document.querySelector('.chat__input');
  creat_message(message.value);
  websoket.send(message.value);
  websoket.onmessage = function(e){
    creat_message(e.data)
  }
  message.value  = '';
});
const good_luck = (position) => {
  const width_p = position.coords.latitude
  const height_p = position.coords.longitude;
  let p_elem = document.createElement('a');
  p_elem.setAttribute('href', `https://www.openstreetmap.org/#map=3/${width_p}/${height_p}`);
  p_elem.innerHTML = 'Гео-позиция';
  if (i == 0) {
    p_elem.setAttribute("class", "mess one");
    i = 1;
  } else {
    p_elem.setAttribute("class", "mess");
    i = 0;
  }
  output.appendChild(p_elem)
}
const luck = () => {
  creat_message('Неудалось найти ваше местоположение');
}

btn_geo.addEventListener("click", () => {
  if (!navigator.geolocation){
    creat_message('Дайте разрешение на гео-локацию');
  } else {
    navigator.geolocation.getCurrentPosition(good_luck, luck)
  }
});