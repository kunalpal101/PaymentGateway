const back_uri = window.location.href.replace(/\/$/, "");

var button = document.getElementById("checkoutButton");
button.addEventListener("click", function (event) {
  event.preventDefault();
  checkoutPay();
});

async function checkoutPay() {
  let input_fields = {
    name: document.getElementById("name-input-field").value,
    email: document.getElementById("email-input-field").value,
    amount: document.getElementById("amount-input-field").value,
  };

  if (!input_fields.name || !input_fields.email || !input_fields.amount) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "All fields are required",
      // footer: '<a href="">Why do I have this issue?</a>',
    });
  } else {
    console.log(
      "it's working" +
        input_fields.name +
        " " +
        input_fields.email +
        " " +
        input_fields.amount
    );

    await fetch(back_uri + "/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: input_fields.name,
        email: input_fields.email,
        amount: input_fields.amount,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        //if error, then send reject to catch
        return res.json().then((json) => Promise.reject(json));
      })
      //Stripe sends a url after connection
      .then(({ url }) => {
        window.location = url;
        //console.log(url);
      })
      .catch((e) => {
        console.log(e.error);
      });
  }
}
