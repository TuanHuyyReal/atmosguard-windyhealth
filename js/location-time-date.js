// get elements
const dateTime = document.querySelector("span.date-time");
const locationElement = document.querySelector("span.location");

// function to update date and time
function updateDateTime() {
  const now = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDateTime = now.toLocaleString("en-US", options);
  dateTime.textContent = formattedDateTime;
}

// update date and time and location every second
updateDateTime();
setInterval(updateDateTime, 1000);
