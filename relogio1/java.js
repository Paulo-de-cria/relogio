let emExecucao = false;
let intervalo;

const ponteiroHora = document.querySelector('.ponteiro-hora');
const ponteiroMinuto = document.querySelector('.ponteiro-minuto');
const ponteiroSegundo = document.querySelector('.ponteiro-segundo');
const botaoIniciar = document.getElementById('botaoIniciar');
const somAlarme = document.getElementById('somAlarme');
const fundoRelogio = document.querySelector('.relogio-background');

botaoIniciar.addEventListener('click', iniciarRelogio);

function iniciarRelogio() {
    if (emExecucao) return;
    emExecucao = true;
    botaoIniciar.style.display = 'none';
    somAlarme.currentTime = 0;
    somAlarme.play();

    let segundos = 0;

    intervalo = setInterval(() => {
        segundos++;
        const horas = Math.floor(segundos / 3600);
        const minutos = Math.floor((segundos % 3600) / 60);
        const segundosNoMinuto = segundos % 60;

        ponteiroHora.style.transform = `translateX(-50%) rotate(${(horas * 30) + (minutos * 0.5)}deg)`;
        ponteiroMinuto.style.transform = `translateX(-50%) rotate(${minutos * 6}deg)`;
        ponteiroSegundo.style.transform = `translateX(-50%) rotate(${segundosNoMinuto * 6}deg)`;

        atualizarCorFundo(minutos);
        verificarAlarmes(segundos);
    }, 1000);
}

function atualizarCorFundo(minutos) {
    if (minutos < 15) {
        fundoRelogio.style.backgroundColor = 'rgb(255, 100, 100)';
    } else if (minutos < 45) {
        fundoRelogio.style.backgroundColor = 'rgb(100, 100, 255)';
    } else {
        fundoRelogio.style.backgroundColor = 'rgb(100, 255, 100)';
    }
}

function verificarAlarmes(segundos) {
    if (segundos % 2700 === 0 && segundos > 0) {
        somAlarme.currentTime = 0;
        somAlarme.play();
    }

    if (segundos >= 3600) {
        clearInterval(intervalo);
        emExecucao = false;
        setTimeout(() => {
            botaoIniciar.style.display = 'block';
            fundoRelogio.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        }, 1000);
    }
}
