var settingsModal = document.getElementsByClassName('settings-modal')[0]
var pomodoroTime = document.getElementById('pomodoro-time')
var breakTime = document.getElementById('break-time')

function toggleSettings() {
  if (settingsModal.style.display == "block")
    settingsModal.style.display = "none"
  else
    settingsModal.style.display = "block"
}

function updateSettings() {
  pomodoroLength = parseInt(pomodoroTime.value)
  breakLength = parseInt(breakTime.value)
  settingsModal.style.display = "none"
  resetTimer()
}

function closeSettings() {
  settingsModal.style.display = "none"
}
