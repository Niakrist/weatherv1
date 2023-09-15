const apiKey = '6619f7845df54dd79a691331231509';
// https://www.weatherapi.com/docs/conditions.json

// Элементы на странице
const form = document.querySelector('.form');
const inputCity = document.querySelector('.js-input-city');
const header = document.querySelector('.header');

/* Слушаем отправку формы */
form.addEventListener('submit', async function (e) {
  e.preventDefault()

  const city = inputCity.value.trim();
  const data = await getWeather(city);

  /* IF */

  if (data.error) {
    removeCard('.card');
    showError(data.error);
  } else {
    removeCard('.card');
    showCard(data)
  }


  // fetch(url).then((response) => {
  //   return response.json();
  // }).then(data => {
  //   if (data.error) {
  //     removeCard('.card');
  //     showError(data.error);
  //   } else {
  //     removeCard('.card');
  //     showCard(data)
  //   }
  // })
})


// Функции
// 1. Удаление карточки .card
function removeCard(selector) {
  if (document.querySelector(selector)) {
    document.querySelector(selector).remove();
  };
}

// 2. Отобразить ошибку
function showError(error) {
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `Такого города не существует!<br>Код ошибки: ${error.code}<br>${error.message}`;
  header.insertAdjacentElement('afterend', div);
}

// 3. Получение данных по api и генерация карточки погоды
function showCard(data) {
  const html = `
    <div class="card">
      <h2 class="card__name-city">${data.location.name} <span>${data.location.country}</span></h2>
      <div class="card__weather">
        <div class="card__value">${data.current.temp_c}<sup>°c</sup></div>
        <img class="card__img" src="./img/cloudy.png" alt="">
      </div>
      <div class="card__desc">${data.current.condition.text}</div>
    </div>`;
  header.insertAdjacentHTML('afterend', html);
}

// 4. Асинхронная функция с запросом

async function getWeather(city) {

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  console.log('url', url)
  
  const response = await fetch(url);
  const data = await response.json();
  return data;
  
  // await fetch(url).then((response) => response.json()).then(data => {
  //   return data;
  // })

    // await fetch(url).then((response) => {
  //   return await response.json();
  // }).then((data) => {
  //   return data;
  // })
}

 // fetch(url).then((response) => {
  //   return response.json();
  // }).then(data => {