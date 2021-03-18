let router = require('express').Router()
let User = require('../Models/User')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')

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

router.post('/signup',(req,res)=>{
	let {fname,lname,pwd,email} = req.body
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(pwd, salt);

	let newUser = new User({
		fname,lname,pwd:hash,email
	})
	newUser.save()
	.then((user)=>{
		console.log(user)
		res.send({status:true,user})
	})
	.catch(err=>{
		res.send({status:false,msg:'The user was not created'})
	})
})

router.get('/dummy',(req,res)=>{
	User.find()
	.then(users=>{
		res.send(users)
	})
})

module.exports = router