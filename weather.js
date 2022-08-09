import express from "express";
const app = express();
import ejs from "ejs";
import https from "https";
import fetch from "node-fetch";
let myCity = "New York";
let key = "3d9f5cd5e056a49dcf2ef0948ba1f659";

function k2c(k) {
  return Number(k - 273.15).toFixed(2);
}

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("weather.ejs");
});

app.get("/:city", (req, res) => {
  let { city } = req.params;
  console.log(city);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

  //node-fetch method
  fetch(url)
    .then((d) => d.json())
    .then((data) => {
      console.log(data);
      let { temp } = data.main;
      let newTemp = k2c(temp);
      res.render("weather.ejs", { data, newTemp });
    });

  //http method
  //   https
  //     .get(url, (response) => {
  //       console.log("StatusCode", response.statusCode);
  //       console.log("headers", response.headers);
  //       response.on("data", (d) => {
  //         let data = JSON.parse(d);
  //         console.log(data);
  //         let { temp } = data.main;
  //         let newTemp = k2c(temp);
  //         res.render("weather.ejs", { data, newTemp });
  //       });
  //     })
  //     .on("error", (e) => {
  //       console.log(e);
  //     });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
