let minutes1 = []; // Minutes - tens place
let minutes2 = []; // Minutes - ones place
let seconds1 = []; // Seconds - tens place
let seconds2 = []; // Seconds - ones place

const NUMBER_SPACING = 325;

let timerStart = 600;
let counter = timerStart;
let sMoved = 0;

function splitTime(seconds) {
    let m1 = Math.floor(seconds / 600);
    let m2 = Math.floor(seconds / 60) % 10;
    let s1 = Math.floor(seconds / 10) % 6;
    let s2 = seconds % 10;
    return [m1, m2, s1, s2];
}

let initial = splitTime(counter);

function assignNumbers() {
    let columnNames = [
        '.timer-minutes-1',
        '.timer-minutes-2',
        '.timer-seconds-1',
        '.timer-seconds-2'
    ];

    let time = splitTime(counter);
    for (let i = 0; i < 4; i++) { // Iterate columns
        let j = 0;
        for (let el of document.querySelectorAll(columnNames[i])) {
            let val = time[i] - 3 + j;
            switch (i) {
                case 0: {
                    let newTime = counter + (-3 + j) * 600;
                    //console.log(j, newTime);
                    if (val < 1) val = '';
                    if (val > 9) val -= 10;
                    if (newTime > timerStart) val = '';
                    break;
                }
                case 1: {
                    if (val < 0) val += 10;
                    if (val > 9) val -= 10;
                    break;
                }
                case 2: {
                    if (val < 0) val += 6;
                    if (val > 5) val -= 6;
                    break;
                }
                case 3: {
                    if (val < 0) val += 10;
                    if (val > 9) val -= 10;
                    break;
                }
            }
            if (i === 0) console.log(j, val);
            el.firstElementChild.innerHTML = val;
            j++;
        }
    }

    sMoved++;
    counter--;
}

function init() {
    for (let i = 0; i < 7; i++) {
        let time = splitTime(counter);
        let m1 = document.createElement('div');
        let m1t = document.createElement('p');
        m1.classList.add('timer-container', 'timer-minutes-1', '_' + i);
        if (i === 2) m1.classList.add('brighten');
        if (i === 3) m1.classList.add('darken');
        let val;
        if (i < 4) {
            val = time[0] - 3 + i;
            let newTime = counter + (-3 + i) * 600;
            if (newTime >= 0) {
                if (val < 1) val = '';
                if (val > 9) val -= 10;
            } else {
                val = '';
            }
        } else {
            val = ''
        }
        m1t.innerHTML = val;
        m1.appendChild(m1t);
        minutes1.push(m1);
        let m2 = document.createElement('div');
        let m2t = document.createElement('p');
        m2.classList.add('timer-container', 'timer-minutes-2', '_' + i);
        if (i === 2) m2.classList.add('brighten');
        if (i === 3) m2.classList.add('darken');
        if (i < 4) {
            val = time[1] - 3 + i;
            let newTime = counter + (-3 + i) * 60;
            if (newTime >= 0) {
                if (val < 0) val += 10;
                if (val > 9) val -= 10;
            } else if (i === 3) {
                val = 0;
            } else {
                val = '';
            }
        } else {
            val = '';
        }
        m2t.innerHTML = val;
        m2.appendChild(m2t);
        minutes2.push(m2);
        let s1 = document.createElement('div');
        let s1t = document.createElement('p');
        s1.classList.add('timer-container', 'timer-seconds-1', '_' + i);
        if (i === 2) s1.classList.add('brighten');
        if (i === 3) s1.classList.add('darken');
        if (i < 4) {
            val = time[2] - 3 + i;
            let newTime = counter + (-3 + i) * 10;
            if (newTime >= 0) {
                if (val < 0) val += 6;
                if (val > 5) val -= 6;
            } else if (i === 3) {
                val = 0;
            } else {
                val = '';
            }
        } else {
            val = '';
        }
        s1t.innerHTML = val;
        s1.appendChild(s1t);
        seconds1.push(s1);
        let s2 = document.createElement('div');
        let s2t = document.createElement('p');
        s2.classList.add('timer-container', 'timer-seconds-2', '_' + i);
        if (i === 2) s2.classList.add('brighten');
        if (i === 3) s2.classList.add('darken');
        if (i < 4) {
            val = time[3] - 3 + i;
            let newTime = counter - 3 + i;
            if (newTime >= 0) {
                if (val < 0) val += 10;
                if (val > 9) val -= 10;
            } else {
                val = '';
            }
        } else {
            val = '';
        }
        s2t.innerHTML = val;
        s2.appendChild(s2t);
        seconds2.push(s2);
    }

    // Make number elements
    let timerContainer = document.getElementById('timer');
    for (let m1 of minutes1) {
        let index = parseInt(m1.classList.item(2).slice(-1));
        m1.style.top = 'calc(-40% + ' + NUMBER_SPACING * (index - 3) + 'px)';
        if (index === 3) m1.classList.add('main');
        timerContainer.appendChild(m1);
    }
    for (let m2 of minutes2) {
        let index = parseInt(m2.classList.item(2).slice(-1));
        m2.style.top = 'calc(-40% + ' + NUMBER_SPACING * (index - 3) + 'px)';
        if (index === 3) m2.classList.add('main');
        timerContainer.appendChild(m2);
    }
    for (let s1 of seconds1) {
        let index = parseInt(s1.classList.item(2).slice(-1));
        s1.style.top = 'calc(-40% + ' + NUMBER_SPACING * (index - 3) + 'px)';
        if (index === 3) s1.classList.add('main');
        timerContainer.appendChild(s1);
    }
    for (let s2 of seconds2) {
        let index = parseInt(s2.classList.item(2).slice(-1));
        s2.style.top = 'calc(-40% + ' + NUMBER_SPACING * (index - 3) + 'px)';
        if (index === 3) s2.classList.add('main');
        timerContainer.appendChild(s2);
    }

    let timer = setInterval(() => {
        assignNumbers();
        setTimeout(() => {
            for (let el of minutes1.concat(minutes2.concat(seconds1.concat(seconds2)))) {
                el.classList.remove('move');
            }
        }, 1000);
        //if (counter === 0) clearInterval(timer);
    }, 1000);
    setTimeout(() => {
        setInterval(() => {
            for (let el of seconds2) {
                el.classList.add('move');
            }
            if (counter % 10 === 9 && counter > 10) {
                for (let el of seconds1) {
                    el.classList.add('move');
                }
            }
            if (counter % 60 === 59 && counter > 60) {
                for (let el of minutes2) {
                    el.classList.add('move');
                }
            }
            if (counter % 600 === 599) {
                for (let el of minutes1) {
                    el.classList.add('move');
                }
            }
        }, 1000);
    }, 500);
}
