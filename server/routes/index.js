var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
var path = require("path");
require("dotenv").config();
router.use(cors());
const fileUpload = require("express-fileupload");
router.use(fileUpload());
const Post = require("../models/Post");

const AWS = require("aws-sdk");

const spacesEndpoint = new AWS.Endpoint("sgp1.digitaloceanspaces.com/");
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET,
});

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Connected"));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/allPosts", async function (req, res, next) {
  let allPosts = await Post.find({});
  res.send(allPosts);
});

router.post("/newImagePost", async function (req, res, next) {
  console.log(req.body);
  const uuid = uuidv4();
  let fileFormat = path.extname(req.files.file.name);
  console.log(`imageWall/${uuid}${fileFormat}`);
  var params = {
    Bucket: "lentors3",
    Key: `imageWall/${uuid}${fileFormat}`,
    Body: req.files.file.data,
    ACL: "public-read",
    // Metadata: {
    //             "x-amz-meta-my-key": "your-value"
    //           }
  };

  s3.putObject(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });

  let post = new Post({
    name: req.body.userName,
    message: req.body.message,
    assetURL: `https://lentors3.sgp1.digitaloceanspaces.com/imageWall/${uuid}${fileFormat}`,
    postType: req.body.postType,
  });

  try {
    await post.save();
  } catch (e) {
    console.log(e);
  }
  res.sendStatus(200);
});

module.exports = router;
