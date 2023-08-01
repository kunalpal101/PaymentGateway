let express = require("express");
let app = express();
app.use(express.static(__dirname + "/FrontEnd"));

require("dotenv").config();
var bodyParser = require("body-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// const storeItems = new Map();

app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    // Get the base URL without the path
    const baseURL = req.protocol + "://" + req.get("host") + req.baseUrl;

    //takes input for stripe and gives a session as ouput
    const session = await stripe.checkout.sessions.create({
      //payment_method_types: ["card", "google_pay", "upi", "paytm"],
      payment_method_types: ["card"],
      //payment mode for one time transaction, or other for subscription
      mode: "payment",
      //billing_address_collection: "required",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Name: ${req.body.name}`, // Replace with your product name
              description: `Email: ${req.body.email}`, // Replace with your product description
            },
            unit_amount: 100 * req.body.amount,
          },
          quantity: 1, // you may want to adjust the quantity as needed
        },
      ],
      success_url: `${baseURL}/success`, // Using the current web address dynamically
      cancel_url: `${baseURL}/cancel`, // Using the current web address dynamically
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Only app.use is required
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/FrontEnd/index.html");
// });

app.get("/success", function (req, res) {
  res.sendFile(__dirname + "/FrontEnd/success.html");
});

app.get("/cancel", function (req, res) {
  res.sendFile(__dirname + "/FrontEnd/failed.html");
});

//for card number, put "4242424242"
