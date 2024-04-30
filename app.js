const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/index");
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.get("/", (req, res) => {
  res.json({
    message: "API ready!",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
