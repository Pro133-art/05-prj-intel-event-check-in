// Get references to the main elements we update in JavaScript
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");

// Keep track of attendance totals
let count = 0;
const maxCount = 60;

// Update the total attendee number and progress bar width
function updateAttendanceDisplay() {
  attendeeCount.textContent = count;
  // Convert current count to a percent string like "35%"
  const percentage = Math.round((count / maxCount) * 100) + "%";
  progressBar.style.width = percentage;
}

// Show a success message after a valid check-in
function showGreetingMessage(name, teamName) {
  // Use template literals to build a friendly message
  const message = `Welcome, ${name}! from ${teamName}`;
  console.log(message);
  greeting.textContent = message;
  greeting.className = "success-message";
  greeting.style.display = "block";
}

// Show the default message before any check-in happens
function showDefaultGreetingMessage() {
  greeting.textContent = "Ready for check-in";
  greeting.className = "";
  greeting.style.display = "block";
}

// Add the attendee name to the selected team's list on the page
function addNameToTeamList(name, team) {
  // Team values are water, zero, power, so this builds IDs like waterList
  const teamList = document.getElementById(team + "List");
  const listItem = document.createElement("li");
  listItem.textContent = name;
  teamList.appendChild(listItem);
}

// Clean up spacing in names (trim ends + collapse repeated spaces)
function formatName(name) {
  return name.trim().replace(/\s+/g, " ");
}

// Convert a formatted name to lowercase for fair duplicate checking
function normalizeName(name) {
  return formatName(name).toLowerCase();
}

// Check all team lists to prevent duplicate attendee names
function isDuplicateName(name) {
  // These are the three list IDs in the HTML
  const teamLists = ["waterList", "zeroList", "powerList"];
  const normalizedName = normalizeName(name);

  // Loop through every team list
  for (let i = 0; i < teamLists.length; i++) {
    const currentList = document.getElementById(teamLists[i]);
    const namesInList = currentList.querySelectorAll("li");

    // Compare each existing name with the new name
    for (let j = 0; j < namesInList.length; j++) {
      const existingName = normalizeName(namesInList[j].textContent);
      if (existingName === normalizedName) {
        // Found a match, so this is a duplicate
        return true;
      }
    }
  }

  // No matches found
  return false;
}

// Set initial UI state when page first loads
updateAttendanceDisplay();
showDefaultGreetingMessage();

// Run this code when the form is submitted
form.addEventListener("submit", function (event) {
  // Stop the page from reloading after submit
  event.preventDefault();

  // Read and prepare form values
  const name = formatName(nameInput.value);
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, team, teamName);

  // Rule 1: block check-ins when event reaches max capacity
  if (count >= maxCount) {
    greeting.textContent = `Check-in is full. Maximum of ${maxCount} attendees reached.`;
    greeting.className = "";
    greeting.style.display = "block";
    return;
  }

  // Rule 2: block names that are already checked in
  if (isDuplicateName(name)) {
    greeting.textContent = `${name} is already checked in for this event.`;
    greeting.className = "";
    greeting.style.display = "block";
    return;
  }

  // Increase the total count and refresh attendance UI
  count++;
  console.log("Total check-ins: ", count);
  updateAttendanceDisplay();
  console.log(`Progress: ${progressBar.style.width}`);

  // Increase selected team's counter number
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Add this attendee to the selected team list
  addNameToTeamList(name, team);

  // Show success message to confirm the check-in
  showGreetingMessage(name, teamName);

  // Clear form so next attendee can check in quickly
  form.reset();
});
