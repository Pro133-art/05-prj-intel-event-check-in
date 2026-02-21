// Get Some DOM Elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Handle Submission Button
form.addEventListener("submit", function(event) {
  event.preventDefault();
  // Get values from the form
  const name  = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;



  console.log(name, team, teamName);
});