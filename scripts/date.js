// constants
const year = document.querySelector("#year");

// use the date object
const today = new Date();
let last = new Date(document.lastModified);

lastModified.innerHTML = "Last Modified: " + last.toLocaleDateString() + " " + last.toLocaleTimeString('en-US', { hour12: false });
year.innerHTML = "© " + today.getFullYear();