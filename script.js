// Get Some DOM Elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");

// Track attendance
let count = 0;
const maxCount = 60;

function updateAttendanceDisplay() {
  attendeeCount.textContent = count;
  const percentage = Math.round((count / maxCount) * 100) + "%";
  progressBar.style.width = percentage;
}

function showGreetingMessage(name, teamName) {
  const message = `Welcome, ${name}! from ${teamName}`;
  console.log(message);
  greeting.textContent = message;
  greeting.className = "success-message";
  greeting.style.display = "block";
}

function showDefaultGreetingMessage() {
  greeting.textContent = "Ready for check-in";
  greeting.className = "";
  greeting.style.display = "block";
}

function addNameToTeamList(name, team) {
  const teamList = document.getElementById(team + "List");
  const listItem = document.createElement("li");
  listItem.textContent = name;
  teamList.appendChild(listItem);
}

function formatName(name) {
  return name.trim().replace(/\s+/g, " ");
}

function normalizeName(name) {
  return formatName(name).toLowerCase();
}

function isDuplicateName(name) {
  const teamLists = ["waterList", "zeroList", "powerList"];
  const normalizedName = normalizeName(name);

  for (let i = 0; i < teamLists.length; i++) {
    const currentList = document.getElementById(teamLists[i]);
    const namesInList = currentList.querySelectorAll("li");

    for (let j = 0; j < namesInList.length; j++) {
      const existingName = normalizeName(namesInList[j].textContent);
      if (existingName === normalizedName) {
        return true;
      }
    }
  }

  return false;
}

updateAttendanceDisplay();
showDefaultGreetingMessage();

// Handle Submission Button
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = formatName(nameInput.value);
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, team, teamName);

  if (count >= maxCount) {
    greeting.textContent = `Check-in is full. Maximum of ${maxCount} attendees reached.`;
    greeting.className = "";
    greeting.style.display = "block";
    return;
  }

  if (isDuplicateName(name)) {
    greeting.textContent = `${name} is already checked in for this event.`;
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

  // Add attendee name to team list
  addNameToTeamList(name, team);

  // Show welcome message on the page
  showGreetingMessage(name, teamName);

  form.reset();
});
