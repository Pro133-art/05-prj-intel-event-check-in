// Get Some DOM Elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");

// Track attendence
let count = 0;
const maxCount = 50;

function updateAttendanceDisplay() {
  attendeeCount.textContent = count;
  const percentage = Math.round((count / maxCount) * 100) + "%";
  progressBar.style.width = percentage;
}

updateAttendanceDisplay();

// Handle Submission Button
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, team, teamName);

  if (count >= maxCount) {
    greeting.textContent = `Check-in is full. Maximum of ${maxCount} attendees reached.`;
    greeting.className = "";
    greeting.style.display = "block";
    return;
  }

  // Increment count
  count++;
  console.log("Total check-ins: ", count);
  updateAttendanceDisplay();
  console.log(`Progress: ${progressBar.style.width}`);

  // Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Show welcome message
  const message = `Welcome, ${name}! from ${teamName}`;
  console.log(message);
  greeting.textContent = message;
  greeting.className = "success-message";
  greeting.style.display = "block";

  form.reset();
});
