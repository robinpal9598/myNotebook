const express = require('express');
var cors = require('cors')
require("./db/Config")
const { body, validationResult } = require('express-validator');
const app = express();
app.use(express.json());
const User = require('./db/User');
const Notes = require('./db/Notes');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const fetchUser = require('./middleware/fetchUser');
const JWT = "THISISTHESECRETPASSWORD";

app.use(cors());
//***************************************************************************************************************************************************************************************


app.get('/', (req, resp) => {
  resp.send("hello");
})
//Register a new user POST request ..........................................................................................................................................................
app.post('/register', [
  body('email', "Enter a valid email").isEmail(),
  body('name', "Enter a valid name").isLength({ min: 2 }),
  body('password', "Enter a valid password").isLength({ min: 5 })
], async (req, resp) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

      return resp.status(400).json({ errors: errors.array() });

    }
    // check whether the user with this email already exist
    let users = await User.findOne({ email: req.body.email });
    console.log(users)
    if (users) {
      return resp.status(400).json({ errors: "Sorry user with this email already exist" });
    }
    const salt = await bcrypt.genSalt(12);
    let pass = await bcrypt.hash(req.body.password, salt)
    let answer = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: pass
    })
    const data = {
      answer: {
        id: answer.id
      }
    }
    var token = jwt.sign(data, JWT);
    // console.log(token); 
    resp.json({ token });

  } catch (error) {
    console.log(error);
    resp.status(400).send("error found")

  }

})
//Authenticate a user / LOGIN//  GET method.......................................................................................................................................
app.post('/login', [
  body('email', "Enter a valid email").isEmail(),
  body('password', "Please enter a password").exists(),
], async (req, resp) => {
  let success=false;
  try {
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
      return resp.status(404).json({ errors: "Enter the correct credentials" });
    }
    let resultCompare = await bcrypt.compare(req.body.password, user.password);
    if (!resultCompare) {
      success=false;
      return resp.status(404).json({ errors: " correct password please" });

    }
    const data = {
      user: {
        id: user.id
      }
    }
    var token = jwt.sign(data, JWT);
    success=true;
    resp.json({success, token });
  }
  catch (error) {
    success=false
    resp.send({success, "error": error });
  }
})
//Get the details of the user using the auth token// POST method..........................................................................................................................................
app.post('/getuser', fetchUser, async (req, resp) => {

  const userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  resp.send(user);


})

//Get all the notes using :GET method...........................................................................................................................................
app.get('/fetchallnotes',fetchUser,async(req,res)=>{
  const notes=await Notes.find({user:req.user.id})
  res.json(notes);
})
//Get the specific note from the database :GET Method................................................................................................................................
app.get('/fetchNote/:id',fetchUser,async(req,resp)=>{
  const notes=await Notes.findById(req.params.id);
  resp.json(notes);
})
//Add notes using :POST request ....................................................................................................................................................................
app.post('/addNotes',fetchUser,[
  body('title', "Enter a valid title").isLength({ min: 3 }),
  body('description', "Enter a valid description").isLength({ min: 5 }),
  body('tag', "Enter a valid tag").isLength({ min: 3 })
],async(req,resp)=>{
 
  const {title,description,tag}=req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    return resp.status(400).json({ errors: errors.array() });

  }
  const note=await new Notes({
    title,description,tag,user:req.user.id
  })
  const savedNote=await note.save();
  
  resp.json(savedNote);

})
//API to update the notes :PUT request........................................................................................................................................................................
app.put('/updateNote/:id',fetchUser,async(req,resp)=>{
  const{title,description,tag}=req.body;
  const newNote={};
  if(title){newNote.title=title};
  if(description){newNote.description=description};
  if(tag){newNote.tag=tag};
  //Find the note to be updated and update it
  let note=await Notes.findById(req.params.id);
  if(!note){return resp.status(404).send("nothing found")}
  if(note.user.toString()!=req.user.id)
  {
      return resp.status(401).send("not allowed");
  }
  note =await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
  resp.json({note})

})

//API to delete the note :DELETE request........................................................................................................................................................................
app.delete('/delete/:id',fetchUser,async(req,resp)=>{
  
  //Find the note to be deleted and delete it
  let note=await Notes.findById(req.params.id);
  if(!note){return resp.status(404).send("nothing found")}
  if(note.user.toString()!=req.user.id)
  {
      return resp.status(401).send("not allowed");
  }
  note =await Notes.findByIdAndDelete(req.params.id)
  resp.json({success:"note with this id has been deleted"});

})
app.listen(4000);