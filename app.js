//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const mongoose = require("mongoose");

const _ = require("lodash");

mongoose.connect("mongodb+srv://admin-suraj:suraj1234@cluster0.ckltw.mongodb.net/blogDB", {useNewUrlParser: true});

const blogSchema = {
  title: String,
  content: String
}

const Blog = mongoose.model("Blog", blogSchema);


// let posts = [];

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {

  Blog.find({}, function(err, posts) {
    if (!err){
      console.log(posts);
      res.render("home", {"homeContent": homeStartingContent, "posts":posts});
    } else {
      console.log(err);
    }
  })

});

app.get("/about", (req, res) => {
  res.render("about", {"aboutContent": aboutContent});
});

app.get("/contact", (req, res) => {
  res.render("contact", {"contactContent": contactContent});
});

app.get("/compose", (req, res) => {
  res.render("compose");
})

app.post("/compose", (req, res) => {

  // const post = {
  //   title: req.body.postTitle,
  //   body : req.body.postBody,
  // }

  const post = new Blog({
    title: req.body.postTitle,
    content: req.body.postBody,
  })

  post.save(function(err) {
    if (!err){
      res.redirect("/")
    }
  })
  // posts.push(post);

  // res.redirect("/")

})

app.get("/posts/:postName", (req, res) => {
  // console.log(req.params.postName);
  // const requestedTitle = _.lowerCase(req.params.postName);
  const requestedTitle = req.params.postName;
  // console.log(requestedTitle);

  Blog.find({}, (err, foundBlogs) => {
    console.log(foundBlogs);
    res.render("post", {"postDetail": foundBlogs})
  })

  // for(let i = 0; i<posts.length; i++) {
  //   const storedTitle = _.lowerCase(posts[i].title);
  //
  //   if (storedTitle === requestedTitle) {
  //     // console.log("Match Found!");
  //     res.render("post", {"postDetail": posts[i]})
  //   } else{
  //     console.log("Not a Match !");
  //   }
  // };
  // posts.foEach(function(post) {
  //
  // });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
