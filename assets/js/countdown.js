function countdown() {
  // Set the date you're counting down to
  var countDownDate = new Date("May 4, 2024 10:00:00").getTime();

  // Update the countdown every second
  var x = setInterval(function () {

    // Get the current date and time
    var now = new Date().getTime();

    // Calculate the time remaining
    var distance = countDownDate - now;

    // Calculate days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the HTML elements with the countdown values
    document.getElementById("days").innerHTML = String(days).padStart(2, "0");
    document.getElementById("hours").innerHTML = String(hours).padStart(2, "0");
    document.getElementById("minutes").innerHTML = String(minutes).padStart(2, "0");
    document.getElementById("seconds").innerHTML = String(seconds).padStart(2, "0");

    // If the countdown is over, display a message
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("countdown").innerHTML = "Countdown is over!";
    }
  }, 1000);
}

// Call the countdown function
countdown();
