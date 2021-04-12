//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const lodash =  require('lodash');
const homeStartingContent = "Manali, amidst the hilly slopes, is a paradise for mountain lovers with spell-binding views, charming streams, the fairy-tale-like fog surrounding little hidden cottages, and a lingering scent of pines and freshness. Oh, and you can ride a yak or ride your bike up the famous Rohtang pass to Leh, the valley of the gods.Manali suits the needs of every kind of travel mindset. A family looking for some bonding time, a couple for some peace and quiet, solo travelers for some solitude or a group of friends seeking an adventure."

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


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
