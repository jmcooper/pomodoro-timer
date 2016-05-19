var farLeft = document.getElementsByClassName('far-left')[0]
var left = document.getElementsByClassName('left')[0]
var center = document.getElementsByClassName('center')[0]
var right = document.getElementsByClassName('right')[0]
var farRight = document.getElementsByClassName('far-right')[0]
var pauseButton = document.getElementById('pause-button')
var pomodoroLength=25
var breakLength=5

var state="pomodoro"
var counter=pomodoroLength

updateCounters()
var interval = setInterval(updateCounters, 1000)

function resetTimer() {
  counter=pomodoroLength+1
  state="pomodoro"
  updateCounters()
}

function toggleTimer() {
  if (interval) {
    clearInterval(interval)
    interval = null
    pauseButton.textContent = 'RESUME'
  }
  else {
    interval = setInterval(updateCounters, 1000)
    pauseButton.textContent = 'PAUSE'
  }
}

function updateCounters() {
  counter--
  farLeft.textContent = counter+2
  left.textContent = counter+1
  center.textContent = counter
  right.textContent = counter-1
  farRight.textContent = counter-2
  if (counter === 0) {
    if (state==="pomodoro") {
      state="break"
      counter=breakLength+1
    } else {
      state="pomodoro"
      counter=pomodoroLength+1
    }

  }
}
