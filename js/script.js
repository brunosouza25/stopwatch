let splits = [];
const divSplits = document.getElementById('splits');
const splitButton = document.getElementById('split')
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const clearButton = document.getElementById('clear');
const list = document.getElementById('list');

//Evento dos botões
startButton.addEventListener('click', function () {
    start();
});

stopButton.addEventListener('click', function () {
    stop();
});

splitButton.addEventListener('click', function () {
    split();
});

clearButton.addEventListener('click', function () {
    clear();
});

let timer, //Irá armazenar a função
    startTime, // Irá armazenar o primeiro horário
    stoppedTime, // Irá armazenar a hora em que foi pausado
    stoppedDuration = 0, // Irá armazenar quanto tempo ficou pausado
    elapsedTime, // Irá armazenar o tempo "atual" subtraindo currentTime, startTime e stoppedDuration para obter o tempo decorrido
    date;// Irá armazenar a string que será utilizada nas voltas do cronômetro

//Função responsável por iniciar o cronômetro
function start() {
    const clock = document.getElementById('clock');
    const result = document.getElementById('result');

    clock.setAttribute('style', 'color: #FF8C00;')

    splitButton.disabled = false;
    if (timer) {
        return;
    }
    if (stoppedTime !== undefined) {
        stoppedDuration += new Date() - stoppedTime;
    }

    if (startTime === undefined) {
        startTime = new Date();
    }

    timer = setInterval(function () {
        let currentTime = new Date();
        let timeElapse = new Date(currentTime - startTime - stoppedDuration);
        result.appendChild(clock);
        timeElapse.setHours(timeElapse.getHours() + 3)
        date = `${timeElapse.toLocaleTimeString()}:${zeroLeftMilliseconds(timeElapse)}`;
        writeInClock(date)
    }, 1);
}

//Função responsável por escrever no cronômetro
function writeInClock(data) {
    const text = document.createTextNode(`${data}`);
    clock.innerText = '';
    clock.appendChild(text);
}

//Função responsável por adicionar os zeros a esquerda nos milisegundos
function zeroLeftMilliseconds(data) {
    if (data.getMilliseconds() < 10) {
        return `00${data.getMilliseconds()}`;
    } else if (data.getMilliseconds() < 100) {
        return `0${data.getMilliseconds()}`;
    } else {
        return `${data.getMilliseconds()}`;
    }
}

//Função responsável por pausar o cronômetro
function stop() {
    clock.setAttribute('style', 'color: red;')
    stoppedTime = Date.now();
    clearInterval(timer);
    timer = undefined;
}

//Função responsável por realizar as voltas 
function split() {
    const li = document.createElement('li');

    splits.push(date);
    li.innerText = date;

    list.appendChild(li);
    divSplits.appendChild(list);
}

//Função responsável por limpar e zerar o cronômetro
function clear() {
    clearInterval(timer);
    splitButton.disabled = true;
    splits = [];
    writeInClock('00:00:00:000');
    clock.setAttribute('style', 'color: #FF8C00;');
    timer = undefined;
    stoppedDuration = 0;
    stoppedTime = undefined;
    startTime = undefined;
    divSplits.innerText = '';
    list.innerText = '';
}
