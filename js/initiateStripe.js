// Create an instance of the Stripe object with your publishable API key
var stripe = Stripe(
  "pk_live_51MmfoxLHXKTpG87XLIQy7RTaBv4vyLnkcoRRYNsJ3HOeDT2d3llnfwe4Qva5KdocQf2qHE96jNLCDxoRej6MesTs00H2uRPhCa"
);
var checkoutButton = document.getElementById("checkout-button");

checkoutButton.addEventListener("click", function () {
  // Get the quantity value from the numberInput element
  const quantity = numberInput.value;
  // Create a new Checkout Session using the server-side endpoint you
  // created in step 3.
  fetch("/api/stripe", {
    method: "POST",
    body: JSON.stringify({ quantity: quantity }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (session) {
      return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(function (result) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, you should display the localized error message to your
      // customer using `error.message`.
      if (result.error) {
        alert(result.error.message);
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
});
