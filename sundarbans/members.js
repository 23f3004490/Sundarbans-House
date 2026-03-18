// COUNTDOWN TIMER
const countdown = document.getElementById("countdown");
const eventDate = new Date();
eventDate.setHours(eventDate.getHours() + 5);

setInterval(() => {
  const now = new Date().getTime();
  const distance = eventDate - now;

  const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
  const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((distance % (1000*60)) / 1000);

  countdown.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
}, 1000);

