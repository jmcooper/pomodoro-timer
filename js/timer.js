let Rx = require('rx')
let pauser = new Rx.Subject()

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
const redTomatoImageUrl = './img/pomodoro-red.png'
const greenTomatoImageUrl = './img/pomodoro-green.png';

let pomodoroLength=25
let breakLength=5
let paused=false
let currentTimerPosition
let subscriber

let blink

try {
  var Blink1 = require('node-blink1')
  blink = new Blink1()
} catch(e) {
  console.warn('Blink is unavailable', e)
}

startPomodoro()

function startPomodoro(length=pomodoroLength) {
  tomatoImage.src = redTomatoImageUrl
  updateFontColors(pomodoroState)
  updateBlinkForPomodoroState()

  let pomodoroObservable = Rx.Observable.timer(0, 60000).take(length + 1)

  subscriber = pomodoroObservable.subscribe(
    i => {currentTimerPosition=i; updatePomodoroLabels(length - i)},
    function() {},
    startBreak
  )
}

function startBreak(length=breakLength) {
  tomatoImage.src = greenTomatoImageUrl
  updateFontColors(breakState)
  updateBlinkForBreakState()

  let breakObservable = Rx.Observable.timer(0, 60000).take(length + 1)
  subscriber = breakObservable.subscribe(
    i => {currentTimerPosition = i; updatePomodoroLabels(length - i)},
    function() {},
    startPomodoro
  )
  pauser.onNext(true)
}

function resetTimer() {
  subscriber.dispose()
  startPomodoro()
}

function toggleTimer() {
  paused = !paused
  if (paused)
    subscriber.dispose()
  else
    startPomodoro(pomodoroLength - currentTimerPosition)
  pauseButton.textContent = paused ? 'RESUME' : 'PAUSE'
}

function updateBlinkForBreakState() {
  if (!blink) return

  blink.writePatternLine(50, 0, 255, 0, 0)
  blink.writePatternLine(50, 0, 0, 0, 1)
  blink.writePatternLine(50, 0, 255, 0, 2)
  blink.playLoop(0, 2, 25)
}

function updateBlinkForPomodoroState() {
  if (!blink) return

  blink.setRGB(225, 0, 0)
  blink.writePatternLine(50, 255, 0, 0, 0)
  blink.writePatternLine(50, 0, 0, 0, 1)
  blink.writePatternLine(50, 255, 0, 0, 2)
  blink.playLoop(0, 2, 25)
  setTimeout(() => blink.fadeToRGB(pomodoroLength * 1000, 150, 150, 0), 150*25)
}

function updatePomodoroLabels(index) {
  farLeft.textContent = index+2
  left.textContent = index+1
  center.textContent = index
  right.textContent = index-1
  farRight.textContent = index-2
}

function updateFontColors(state) {
  let color = state===pomodoroState ? '#CDAFB0' : '#C9D2B8';
  for(let i = 0; i < timerLabels.length; i++) {
    timerLabels[i].style.color=color
  }
}
