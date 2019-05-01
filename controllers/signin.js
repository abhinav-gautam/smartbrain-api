const handleSignin=(req,res,db,bcrypt)=>{
	const{password,email}=req.body
	if(!email || !password){
		return res.status(400).json('incorrect data')
	}
	db.select('email','hash')
	.from('login')
	.where('email',email)
	.then(data=>{
		if (!data[0]){
			return res.status(400).json('wrong credentials')
		}
		const isValid=bcrypt.compareSync(password, data[0].hash);
		if(isValid){
			return db.select('*')
			.from('users')
			.where('email',email)
			.then(user=>res.json(user[0]))
		}else{
			res.status(400).json('wrong credentials')
		}
	})
	.catch(err=>{
		console.log(err)
		res.status(400).json("Unable to register")})

}
module.exports={
	handleSignin
}