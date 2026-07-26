const express = require("express");
const mongoose = require("mongoose");
const Url = require("./model/Url");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
function generateShortCode() {
    return Math.random().toString(36).substring(2, 8);
}
mongoose.connect("mongodb://localhost:27017/url-shortener")
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log(err);
});
  
app.get("/urls", async (req, res) => {
  try {
    const urls = await Url.find();

    res.json(urls);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch URLs",
    });
  }
});
app.get("/", async (req, res) => {

    await Url.create({
        shortCode: "google",
        originalUrl: "https://google.com"
    });

    res.send("Inserted Successfully");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
app.post("/shorten", async (req, res) => {

    const originalUrl = req.body.originalUrl;

    let shortCode;
    let existing;

    do {
        shortCode = generateShortCode();

        existing = await Url.findOne({
            shortCode
        });

    } while (existing);

    const url = await Url.create({
        shortCode,
        originalUrl
    });

    res.json({
        shortUrl: `http://localhost:3000/${url.shortCode}`
    });

});
app.get("/:shortCode", async (req, res) => {

    const shortCode = req.params.shortCode;

    const url = await Url.findOne({
        shortCode
    });

    if (!url) {
        return res.status(404).send("Short URL not found");
    }

    url.clicks++;

    await url.save();

    res.redirect(url.originalUrl);

});
app.delete("/urls/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await Url.findByIdAndDelete(id);

    res.json({
      message: "URL deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete URL",
    });
  }
});