require("dotenv").config({ path: "./.env" });
const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const PORT = process.env.PORT;
let server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is running on ${PORT}`);
});
