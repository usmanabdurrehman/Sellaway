let router = require('express').Router()
let User = require('../Models/User')
let bcrypt = require('bcryptjs')

router.post('/signin',(req,res)=>{
	let {email,pwd} = req.body

	User.findOne({email}).lean()
	.then(user=>{
		if(bcrypt.compareSync(pwd, user.pwd)){
			res.send({auth:true,user})
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