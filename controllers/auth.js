import User from '../models/user';


export const register = async (req, res) => {
    console.log(req.body)
    const {name, email, password} = req.body;

    if(!name) return res.status(400).send('Name is required');
    if(!email) return res.status(400).send('Email is required');
    if(!password|| password.length< 6) return res.status(400).send("Password is too short");
    
    let userExist = await User.findOne({email});
    if (userExist) return res.status(400).send('User already exists');
    const user = new User(req.body)
    try{
        await user.save()
        console.log('User saved', user)
        res.status(201).send(user)
        return res.json({ok: true})

    }catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }
}