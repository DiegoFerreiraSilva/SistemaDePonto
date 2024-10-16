// Import do CSS, JS e dos tradutores
import "./assets/css/style.css";
import "core-js/stable";
import "regenerator-runtime/runtime";
import updateClock from './modules/clock'

// Inicialização do relógio
updateClock();
setInterval(updateClock, 1000);
