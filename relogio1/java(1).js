document.getElementById('botaoIniciar').addEventListener('click', function() {
    this.style.display = 'none'; // Esconde o botão
    iniciarRelogio();
    beep(); // Toca o som ao iniciar o relógio
});

function iniciarRelogio() {
    const ponteiroHora = document.querySelector('.ponteiro-hora');
    const ponteiroMinuto = document.querySelector('.ponteiro-minuto');
    const ponteiroSegundo = document.querySelector('.ponteiro-segundo');
    const relogio = document.querySelector('.relogio');

    let horas = 12; // 12 horas
    let minutos = 0; // 0 minutos
    let segundos = 0; // 0 segundos

    atualizarPosicoes();

    function atualizarPosicoes() {
        const grausSegundo = (segundos / 60) * 360;
        const grausMinuto = (minutos / 60) * 360 + (segundos / 60) * 6;
        const grausHora = (horas / 12) * 360 + (minutos / 60) * 30;

        ponteiroSegundo.style.transform = `translateX(-50%) rotate(${grausSegundo}deg)`;
        ponteiroMinuto.style.transform = `translateX(-50%) rotate(${grausMinuto}deg)`;
        ponteiroHora.style.transform = `translateX(-50%) rotate(${grausHora}deg)`;
        
        atualizarCorRelogio(grausMinuto); // Atualiza a cor do relógio com base no ponteiro dos minutos
    }

    function atualizarRelogio() {
        segundos++;
        if (segundos === 60) {
            segundos = 0;
            minutos++;
            if (minutos === 60) {
                minutos = 0;
                horas++;
                if (horas === 13) {
                    horas = 1; // Converte para 1 após 12
                }
            }
        }

        atualizarPosicoes();
    }

    function atualizarCorRelogio(grausMinuto) {
        const minutosPassados = (grausMinuto / 360) * 60; // Converte graus em minutos

        if (minutosPassados < 15) {
            const redDegrees = (minutosPassados / 15) * 90;
            relogio.style.background = `conic-gradient(red 0deg, red ${redDegrees}deg, #fff ${redDegrees}deg, #fff 90deg)`;
        } else if (minutosPassados < 45) {
            const blueDegrees = ((minutosPassados - 15) / 30) * 90 + 90;
            relogio.style.background = `conic-gradient(red 0deg, red 90deg, blue 90deg, blue ${blueDegrees}deg, #fff ${blueDegrees}deg, #fff 180deg)`;
        } else {
            const greenDegrees = ((minutosPassados - 45) / 15) * 90 + 180;
            relogio.style.background = `conic-gradient(red 0deg, red 90deg, blue 90deg, blue 180deg, green 180deg, green ${greenDegrees}deg, #fff ${greenDegrees}deg, #fff 360deg)`;
        }
    }

    setInterval(atualizarRelogio, 1000);
}