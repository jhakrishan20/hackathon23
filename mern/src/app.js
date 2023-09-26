const express = require("express");
const path = require("path");             
const app = express();
const port = process.env.Port || 3000;
const connectdb = require("./db/conn");
// const hbs = require("hbs");
const Signup = require("./models/signup");
// const flash = require("express-flash");
const flash = require("connect-flash");
const session = require("express-session");
// const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");

const static_path = path.join(__dirname,"../public");
// const templates_path = path.join(__dirname,"../templates/views");
// const partials_path = path.join(__dirname,"../templates/partials");

connectdb();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended:true}));


    app.use(cookieParser("keyboard cat"));
    app.use(session({
        secret:"keyboard cat",
        cookies:{maxAge:60000},
        resave:true,
        saveUninitialized:true,
    }))
    app.use(flash());

app.use(express.static(static_path))      // for static html file in public directory
// app.set("view engine", "hbs");
// app.set("views", templates_path);
// hbs.registerPartials(partials_path);

app.get("/", (req,res) =>{
    const username = req.flash("user");
    res.redirect("/");
});
// app.get("/signup", (req,res) =>{
//     const username = req.flash("user");
//     res.redirect("/",{username});
// });

//signup : create a new user in our datatbase
app.post("/signup", async (req,res) =>{
    try {
        const newuser = new Signup({
            fullname:req.body.full_name,
            phone:req.body.phone,
            email:req.body.email,
            password:req.body.password,
            gender:req.body.gender,
        })
        const signedup = await newuser.save();
        res.redirect('/');
    } catch (error) {
        res.status(400).send(error);
    }
});

//login : match the credentials
app.post("/login", async(req,res) =>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Signup.findOne({email:email});

        if(useremail.password === password){
            res.redirect('/');
        }
        else{
            res.send(" !! INVALID DETAILS !! ");
        }
    } catch (error) {
        res.status(400).send(" !! INVALID DETAILS !! ");
    }
})

app.listen(port, () => {
    console.log(`server is running on port no. ${port}`);
})