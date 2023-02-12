let express = require("express");
let app = express();

require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/FrontEnd/index.html");
});

app.use(express.static(__dirname + "/FrontEnd"));
