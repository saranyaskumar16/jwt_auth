const express=require ("express")
const app = express()
const dotenv=require("dotenv")
const cors=require("cors")
const bodyParser = require("body-parser")
const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const User=require("./models/userSchema")
const jwt=require("jsonwebtoken")

const PORT =process.env.PORT||3000

dotenv.config()
app.use(bodyParser.json());

app.listen(PORT,()=>{
    console.log("connected");
    
})

mongoose.connect(process.env.MONGO_URL)
.then((result) => {
    console.log('connected to Mongodb');
}).catch((err) => {
    console.error(err);
});

// User Registration Route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword }
    
    
    try {
        
        await User.insertOne(newUser)
        
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"validation failed"})
    }
});

// User Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username});
    console.log(user,"User");
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});