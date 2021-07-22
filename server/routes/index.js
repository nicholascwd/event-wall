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

const spacesEndpoint = new AWS.Endpoint(process.env.S3_ENDPOINT);
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
  res.sendStatus(200);
});

router.get("/allPosts", async function (req, res, next) {
  let allPosts = await Post.find({}).sort({
    creationDate: -1,
  });
  res.send(allPosts);
});

router.post("/newImagePost", async function (req, res, next) {
  console.log(req.body);
  const uuid = uuidv4();

  if (req.body.postType == "message") {
    let post = new Post({
      name: req.body.userName,
      message: req.body.message,
      postType: req.body.postType,
    });

    try {
      await post.save();
    } catch (e) {
      console.log(e);
    }
    res.sendStatus(200);
    return;
  }

  let fileFormat = path.extname(req.files.file.name);
  console.log(`imageWall/${uuid}${fileFormat}`);

  var params = {
    Bucket: process.env.S3_BUCKET,
    Key: `imageWall/${uuid}${fileFormat}`,
    Body: req.files.file.data,
    ACL: "public-read",
  };

  let s3upload = s3
    .putObject(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
      }
    })
    .promise();

  s3upload.then(async function () {
    let post = new Post({
      name: req.body.userName,
      message: req.body.message,
      assetURL: `https://${process.env.S3_BUCKET}.${process.env.S3_ENDPOINT}imageWall/${uuid}${fileFormat}`,
      cdnURL: `https://${process.env.CDN_ENDPOINT}/${uuid}${fileFormat}`,
      postType: req.body.postType,
    });

    try {
      await post.save();
    } catch (e) {
      console.log(e);
    }
    res.sendStatus(200);
  });
});

router.post("/newLike", async function (req, res, next) {
  console.log(req.body);
  let post = await Post.findOne({ _id: req.body._id });
  console.log(post);
  post.likes.push(req.body.user);

  await Post.updateOne(
    { _id: req.body._id },
    { $push: { likes: req.body.user } }
  );
  res.sendStatus(200);
});

module.exports = router;
