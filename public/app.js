hype_bar = document.querySelector('#hype-bar');
hype_bar_box = document.querySelector('#hype-bar-box');
function add_percentage(prcnt)
{
    let val = ((prcnt / 100) * hype_bar_box.clientWidth) + hype_bar.clientWidth;
    let curr_prcnt = Math.round(val * 10 / hype_bar_box.clientWidth) * 10;
    if (curr_prcnt <= 100)
    {
        hype_bar.style.width = `${val}px`;
        hype_bar.innerHTML = `${curr_prcnt}%`;
    }
    if (curr_prcnt >= 100)
    {
        setTimeout(display_full_hype, 400);
    }
}

function display_full_hype()
{
    hype_bar_container = document.querySelector('#hype-bar-container');
    full_hype = document.querySelector('#full-hype');
    hype_bar_container.style.display = 'none';
    full_hype.style.display = 'block';
}