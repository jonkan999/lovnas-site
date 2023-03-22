const numberInput = document.getElementById("numberInput");

numberInput.addEventListener("input", function (event) {
  if (Number(event.target.value) < 6) {
    event.target.setCustomValidity("Value must be at least 6");
  } else {
    event.target.setCustomValidity("");
  }
});
function incrementNumber() {
  const numberInput = document.getElementById("numberInput");
  numberInput.stepUp();
}

function decrementNumber() {
  const numberInput = document.getElementById("numberInput");
  numberInput.stepDown();
}
