var button = document.getElementById("checkoutButton");
button.addEventListener("click", function (event) {
  event.preventDefault();
  checkoutPay();
});

function checkoutPay() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "All fields are required",
    // footer: '<a href="">Why do I have this issue?</a>',
  });
}
