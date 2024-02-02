var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// we want see all post of perticular user
router.get('/alluserposts', async function(req, res, next) {
  let user = await userModel
  .findOne({_id:"65bcbe639f9ab153fc38cb80"})
  .populate('posts')

  res.send(user);
  
});


router.get('/createuser', async function(req, res, next) {
   let createdUser =  await userModel.create({
      username: "Onkar",
      password: "Onkar",
      posts: [ ],
      email: "onkar@gamil.com",
      fullName:"Onkar Vishranti Hol",
    });
    res.send(createdUser);
});

router.get('/createpost', async function(req, res, next) {
  let createdPostpost = await postModel.create({
      postText: "Ram Ram Bhai Sarayne...",
      user: "65bcbe639f9ab153fc38cb80"
    });
   let user = await userModel.findOne({_id: "65bcbe639f9ab153fc38cb80"});
   user.posts.push(createdPostpost._id);
   await user.save();
   res.send("Done");
});

module.exports = router;
