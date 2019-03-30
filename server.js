const express = require("express")
const app = express()
const PATH = require("path")
const PORT = 8000
const session = require('express-session')
app.use(session({secret:'codingdojorocks'}))
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.set("views",PATH.join(__dirname,"./clients/views"))
app.set("view engine", "ejs")

app.get("/", (req,res)=>{
	
	if(req.session.number){
	}
	else{
		req.session.number = Math.floor(Math.random() * 100) + 1 
	}
	
	
	context = {
		"number": req.session.number,
		"message": req.session.message,
		"replay": req.session.replay

	}
	res.render('index', context)
})
app.post("/process", (req,res)=>{
	req.session.guess = req.body.guess
	if (req.session.guess > req.session.number){
		req.session.message = "Guess too high"
	}
	if (req.session.guess < req.session.number){
		req.session.message = "Guess too low"
	}
	if (req.session.guess == req.session.number){
		req.session.message = "You guessed the number!"
		req.session.replay = 1
	}
	res.redirect("/")
})
app.get("/reset", (req,res)=>{
	req.session.destroy()
	res.redirect("/")
})


app.listen(PORT,()=>{
	console.log(`listening on port ${PORT})`)
})