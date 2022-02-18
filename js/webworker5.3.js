self.addEventListener('message', function(e) {
    if (e.data === 'start') {
        doWork();
    }
    if (e.data === 'stop') {
        clearInterval(interval);
        postMessage(['stop']);
    }
});

let currentNumber, interval, time, numberPrimes;

/* https://stackoverflow.com/questions/40200089/number-prime-test-in-javascript */
function isPrime(num) {
    for (let i = 2n; i * i <= num; i++)
        if (num % i === 0n)
            return false;
    return num > 1;
}

function getNextPrime() {
    if (isPrime(currentNumber)) {
        const duration = new Date() - time;
        numberPrimes++;
        postMessage([currentNumber, duration]);
    }
    if (numberPrimes == 25) {
        clearInterval(interval);
        postMessage(['stop']);
    }
    currentNumber++;
}

function doWork() {
    currentNumber = 999999999999n;
    time = new Date();
    numberPrimes = 0;
    interval = setInterval(getNextPrime, 100);
}
