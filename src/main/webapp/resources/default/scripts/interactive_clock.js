let userLocale = navigator.language || 'en-US';
let date_formatter = new Intl.DateTimeFormat(userLocale, { year: 'numeric', month: '2-digit', day: '2-digit' });
draw_time();
let clock_interval = setInterval(draw_time, 1000);

function draw_time(){
    let curr_date = new Date();
    let text_time = curr_date.toLocaleTimeString();
    let text_date = date_formatter.format(curr_date);
    let div_time = document.getElementById("time");
    let div_date = document.getElementById("date");
    div_time.innerText = text_time;
    div_date.innerText = text_date;
}

function stop_time(){
    clearInterval(clock_interval);
}