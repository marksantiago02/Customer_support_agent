const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

var corsOptions = {
  origin: [
    "https://localhost:3701",
    "https://customer-support-ai-agent-beta.vercel.app",
  ],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./src/route"));

const port = 9000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
