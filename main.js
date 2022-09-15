const express = require("express");
const app = express();
const port = 3009;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}`));

const fs = require("fs");

const users = require("./users");

let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("student/add", function (req, res) {
  const data = req.body;
  users.push(data);
  console.log(data);
  res.send({ result: "success" });
  fs.writeFile("users.json", JSON.stringify(users), (err) => {
    if (err) throw err;
    console.log("done writting");
  });
});
app.get("student/getdetails", (req, res) => {
  res.header("Content-type", "application/json");
  res.sendFile(path.join(_dirname, "users.json"));
});
