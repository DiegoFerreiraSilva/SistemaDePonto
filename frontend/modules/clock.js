// Código responsável pela atualização do relógio na rota /index/ponto
export default function updateClock(){
    let now = new Date();
    let clock = document.querySelector('.clock');
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    let timeString = `${hours}:${minutes}:${seconds}`;
    clock.value = timeString;
}