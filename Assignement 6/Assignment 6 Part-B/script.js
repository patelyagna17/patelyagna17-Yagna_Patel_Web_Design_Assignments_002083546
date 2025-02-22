let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

// Function to format time in HH:MM:SS
function formatTime(milliseconds) {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Function to update the stopwatch display
function updateTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  document.getElementById("timeDisplay").value = formatTime(elapsedTime);
}

// Function to start the stopwatch using a Promise
function startStopwatch() {
  return new Promise((resolve) => {
    if (!isRunning) {
      isRunning = true;
      startTime = Date.now() - elapsedTime;
      timerInterval = setInterval(updateTime, 1000);
      resolve("Stopwatch started!");
    }
  });
}

// Function to stop the stopwatch using a Promise
function stopStopwatch() {
  return new Promise((resolve) => {
    if (isRunning) {
      isRunning = false;
      clearInterval(timerInterval);
      resolve("Stopwatch stopped!");
    }
  });
}

// Function to reset the stopwatch using a Promise
function resetStopwatch() {
  return new Promise((resolve) => {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    document.getElementById("timeDisplay").value = "00:00:00";
    document.getElementById("datePicker").value = ""; 
    resolve("Stopwatch reset!");
  });
}

// Event listener for the Start button
document.getElementById("startBtn").addEventListener("click", async () => {
  await startStopwatch();
  document.getElementById("startBtn").disabled = true;
  document.getElementById("stopBtn").disabled = false;
});

// Event listener for the Stop button
document.getElementById("stopBtn").addEventListener("click", async () => {
  await stopStopwatch();
  document.getElementById("startBtn").disabled = false;
  document.getElementById("stopBtn").disabled = true;
});

// Event listener for the Reset button
document.getElementById("resetBtn").addEventListener("click", async () => {
  await resetStopwatch();
  document.getElementById("startBtn").disabled = false;
  document.getElementById("stopBtn").disabled = true;
});

// Disable manual editing of the time display
document.getElementById("timeDisplay").addEventListener("keydown", (e) => {
  e.preventDefault();
});

// Disable manual editing of the date picker
document.getElementById("datePicker").addEventListener("keydown", (e) => {
  e.preventDefault();
});