import BlogUser from "../models/blogUser.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const salt = process.env.JWT_SECRET;

export const signup =  async(req, res)=> {


    const { username, password, confirmPassword, email } = req.body;
    try {
        const isExistingUser = await BlogUser.findOne({ email });
        // console.log('isExistingUser');
        if (isExistingUser) return res.status(400).json({ message: 'Already exists! Please enter your credentials' });
        if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });
        const hashedPassword = await bcrypt.hash( password, 12 );
        
        const newUser = await BlogUser.create({ password: hashedPassword, email, username });
        const token = Jwt.sign( { user: newUser, }, salt , { expiresIn: '1h'});
    
        res.status(200).send({ newUser, token });         
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}


export const login =  async (req,res)=> {
    const { email, password } = req.body;

    try {
        const isExistingUser = await BlogUser.findOne({ email });
        if (!isExistingUser) return res.status(400).json({ message: 'User does not exist! Please Sign up first' });
    
        const isValidPassword = await bcrypt.compareSync(password, isExistingUser.password);
        if (!isValidPassword) return res.status(400).json({message: 'Invalid password'});
    
        const token = Jwt.sign({ _id: isExistingUser._id, user: isExistingUser.username, email: isExistingUser.email }, salt, { expiresIn: '1h' } );

        res.status(200).cookie( 'token', token, { sameSite: 'none', secure: true }).json({
            id: isExistingUser._id,
            user: isExistingUser.username,
        });        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export const profile = (req, res) => {
    const { token } = req.cookies;
    Jwt.verify(token, process.env.JWT_SECRET, {}, (err, info)=> {
        if (err) return res.status(400).json({ message: 'Invalid token' });
        res.status(200).json(info);
    });
};

export const logout = (req, res) => {   
    res.status(200).cookie('token', '').json('ok');
}