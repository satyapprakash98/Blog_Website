//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const lodash =  require('lodash');
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse.Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies.Adipiscing elit ut aliquam purus sit amet luctusvenenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sedrisus pretium quam vulputate dignissim suspendisse. Mauris ialiquam sem fringilla. Semper risus n hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagi ultrices eros n cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integeugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequatinterdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim nequetrices gravida dictum fusce ut placerat orci nulla. Mauris ialiquam semfringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let posts=[];
app.set('view engine', 'ejs');

app.get('/',function(req,res){
  res.render('home',{homeStartingContent:homeStartingContent,posts:posts});

});
app.get('/about',function(req,res){
  res.render('about',{aboutContent:aboutContent});
});

app.get('/contact',function(req,res){
  res.render('contact',{contactContent:contactContent});
});
app.get('/compose',function(req,res){
  res.render('compose');
});



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.post('/compose',function(req,res){
  const post= {
    title : req.body.postTitle,
    content :req.body.postBody
  };
  posts.push(post);
  res.redirect('/');
})

app.get('/:postTitle', function (req, res) {
  let requestedPost = req.params.postTitle;
  posts.forEach(function(post){
    if(lodash.lowerCase(post.title) ===lodash.lowerCase(requestedPost))
      res.render('newPost',{
        title:post.title,
        content : post.content
      });
  })
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
