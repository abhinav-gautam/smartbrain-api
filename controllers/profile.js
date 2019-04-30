handleProfile=(req,res,db)=>{
	const {id} = req.params;
	db('users')
	.where('id',id)
	.then(user=>{
		if(user.length){
			res.json(user[0])
		}else{
			res.status(400).json("inavlid user")
		}
	})
	.catch(err=>res.status(400).json("something wrong"))
}
module.exports={
	handleProfile
}