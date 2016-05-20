const pomodoroState = "pomodoro"
const breakState = "break"
const farLeft = document.getElementsByClassName('far-left')[0]
const left = document.getElementsByClassName('left')[0]
const center = document.getElementsByClassName('center')[0]
const right = document.getElementsByClassName('right')[0]
const farRight = document.getElementsByClassName('far-right')[0]
const pauseButton = document.getElementById('pause-button')
const tomatoImage = document.getElementsByClassName('tomato-image')[0]
const timerLabels = document.getElementsByClassName('time-label')

let pomodoroLength=25
let breakLength=5
let state=pomodoroState
let counter=pomodoroLength

let blink

try {
  var Blink1 = require('node-blink1')
  blink = new Blink1()
} catch(e) {
  console.warn('Blink is unavailable', e)
}


updatePomodoroLabels()
let interval = setInterval(() => {  counter--; updatePomodoroLabels() }, 1000)

function resetTimer() {
  counter=pomodoroLength
  state=pomodoroState
  updatePomodoroLabels()
}

function toggleTimer() {
  if (interval) {
    clearInterval(interval)
    interval = null
    pauseButton.textContent = 'RESUME'
  }
  else {
    interval = setInterval(updatePomodoroLabels, 1000)
    pauseButton.textContent = 'PAUSE'
  }
}

function updatePomodoroLabels() {
  farLeft.textContent = counter+2
  left.textContent = counter+1
  center.textContent = counter
  right.textContent = counter-1
  farRight.textContent = counter-2
  if (counter === 0) {
    if (state===pomodoroState) {
      state=breakState
      counter=breakLength
    } else {
      state=pomodoroState
      counter=pomodoroLength
    }
  }
  updateImage(state)
  updateFontColors(state)
  updateBlink(state, counter)
}

function updateImage(state) {
  if (state===pomodoroState)
    tomatoImage.src = './img/pomodoro-red.png'
  else
    tomatoImage.src = './img/pomodoro-green.png'
}

function updateFontColors(state) {
  let color = state===pomodoroState ? '#CDAFB0' : '#C9D2B8';
  for(let i = 0; i < timerLabels.length; i++) {
    timerLabels[i].style.color=color
  }
}

function updateBlink(state, timerCounter) {
  if (!blink) return

  if(timerCounter === breakLength || timerCounter === pomodoroLength) {
    if (state === pomodoroState) {
      updateBlinkForPomodoroState();
    } else {
      updateBlinkForBreakState();
    }
  }

  function updateBlinkForPomodoroState() {
    blink.writePatternLine(200, 255, 0, 0, 0);
    blink.writePatternLine(200, 0, 0, 0, 1);
    blink.playLoop(0, 1, 10, () => {
      blink.setRGB(0, 255, 0)
    });
  }

  function updateBlinkForBreakState() {
    blink.writePatternLine(200, 0, 255, 0, 0);
    blink.writePatternLine(200, 0, 0, 0, 1);
    blink.playLoop(0, 1, 10, () => {
      blink.setRGB(255, 0, 0)
      blink.fadeToRGB(pomodoroTime * 1000, 50, 255, 0)
    });
  }
}
