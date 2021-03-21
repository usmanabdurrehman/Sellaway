let router = require('express').Router()
let User = require('../Models/User')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
let multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/profileImages')
  },
  filename: function (req, file, cb) {
  	let [filename,ext] = file.originalname.split('.')
  	console.log(file)
  	console.log(req.body)
  	req.filename = `${req.body.email}.${ext}`
    cb(null, req.filename)
  }
})
 
var upload = multer({ storage: storage })

router.post('/signin',(req,res)=>{
	let {email,pwd} = req.body

	User.findOne({email}).lean()
	.then(user=>{
		if(bcrypt.compareSync(pwd, user.pwd)){
			jwt.sign(user,'secret',(err,token)=>{
				res.send({auth:true,user,token})
			})
		}
		else{
			res.send({auth:false})
		}
	})
})

router.post('/signup',upload.any(),(req,res)=>{
	let {fname,lname,pwd,email} = req.body
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(pwd, salt);

	console.log(req.filename)

	let newUser = new User({
		fname,lname,pwd:hash,email,profileImg:req.filename
	})

	console.log(newUser)

	newUser.save()
	.then((user)=>{
		res.send({status:true,user})
	})
	.catch(err=>{
		res.send({status:false,msg:'The user was not created'})
	})
})

module.exports = router