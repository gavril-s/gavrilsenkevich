hype_bar = document.querySelector('#hype-bar');
hype_bar_box = document.querySelector('#hype-bar-box');
hype_bar_container = document.querySelector('#hype-bar-container');
full_hype = document.querySelector('#full-hype');
hype_text = document.querySelector('#hype-text')

const max_clicks_arr = [10, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 10000];
let clicks_max = max_clicks_arr[0];
let clicks = 0;
const url = window.location.origin + '/info.json';
hype_bar_init();
hype_bar_init();

function hype_bar_init()
{
    fetch(url, {method: 'GET'})
      .then((response) => {
      return response.json();
    })
    .then((data) => {
      clicks = data.hype_bar_clicks;
      while (clicks >= clicks_max)
      {
        fool_user();
      }
      hype_text.innerHTML = `Если пользователи этого сайта наберут ${clicks_max} кликов, случится лютый хайп...`;
      const val = (clicks / clicks_max) * hype_bar_box.clientWidth;
      hype_bar.style.width = `${val}px`;
      hype_bar.innerHTML = clicks;
      
    });
}

function clicked()
{
    clicks++;
    const val = (clicks / clicks_max) * hype_bar_box.clientWidth;
    if (clicks <= clicks_max)
    {
        hype_bar.style.width = `${val}px`;
        hype_bar.innerHTML = clicks;
    }
    if (clicks >= clicks_max)
    {
        fool_user();
    }
    fetch(url, {method: 'PUT'});
}

function fool_user()
{
    const new_ind = max_clicks_arr.indexOf(clicks_max) + 1;
    if (new_ind >= max_clicks_arr.length)
        setTimeout(display_full_hype, 400);
    else
    {
        clicks_max = max_clicks_arr[new_ind];
        hype_bar_init();
        hype_bar_init();
    }
}

function display_full_hype()
{
    full_hype.innerHTML = `<h1>${clicks_max} кликов! Лютый хайп</h1>`;
    full_hype.style.display = 'block';
}