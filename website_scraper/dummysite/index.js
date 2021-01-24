const express = require("express");
const scrape = require("website-scraper");
const PORT = process.env.PORT || 5000;
const website_url = process.env.WEBSITE_URL;

const options = {
  urls: [website_url],
  directory: "build",
};

if (website_url) {
  scrape(options).then((result) => {
    console.log("Scrape success!");
  });
}

const app = express();

app.use(express.static("build"));

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
