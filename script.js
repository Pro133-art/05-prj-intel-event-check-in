// Get Some DOM Elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Track attendence
 let count = 0;
 const maxCount = 50;



// Handle Submission Button
form.addEventListener("submit", function(event) {
  event.preventDefault();

  // Get form values
  const name  = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;



  console.log(name, team, teamName);

  // Increment count 
  count++;
  console.log("Total check-ins: ", count);
});