const express = require('express')
const connection = require('./connect')
const { ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')
const app = express()
const multer = require("multer")
app.use(express.json())
app.use(express.static('uploads'))

const bodyParser = require('body-parser');
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.listen(80, ()=> {
    connection(app).then(()=>{
        console.log("Start...");
    })
})


// SIGNUP
app.get('/signup', async (req, res)=> {
    const collection = await app.locals.db.collection('users')
    const data = await collection.find({}).toArray()
    res.status(200).json(data)
})


const storageTwo = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, "uploads/usersImages")
    },
    filename: function(req, file, cb){
        return cb(null, `${file.originalname}`)
    }
})
const uploadTwo = multer({storage:storageTwo})
app.post('/signup', uploadTwo.single('imageUrl'), async (req, res)=> {
    const user = req.body;
    const{ data } = user
    const parsedData = JSON.parse(data)
    parsedData.imageUrl = req.file.filename
    const result = JSON.stringify(parsedData)
    const itemChek = await checkEmail(parsedData.email);
    if(itemChek) {
        res.status(202).json("This Account Already Exists");
    } else {                
        const collection = await app.locals.db.collection('users');
        const fin = collection.insertOne(JSON.parse(result))
        res.status(200).json("Valid")
    }
})

const checkEmail = async (email) => {
    const collection = await app.locals.db.collection('users');
    const item = await collection.findOne({email});
    return item
}



// SIGNIN
app.get('/signin', async (req, res)=> {
    try {
        const token = req.headers.token;
        try {
            const verfiy = jwt.verify(token, "TOKEN_ADMIN");
            if(verfiy) {
                res.status(200).json(verfiy)
            }
        } catch (error) {
            res.status(500).json({err: "Token invalid !"})
        }
    } catch (error) {
        res.status(500).json({err: "server failed to load"}) 
    }    
})

app.post('/signin', async (req, res)=> {
    try {
        const user = req.body;
        const collection = await app.locals.db.collection('users');
        const data = await collection.findOne({email: user.email, password: user.password})

        if(data){
            const token = jwt.sign(data, "TOKEN_ADMIN", {
                expiresIn: "24h"
            })
            res.status(200).json({type: data.admin, token: token})
        } else {
            res.status(201).json({type: "null"})
        }

    } catch (error) {
        res.status(500).json({"mes": "server failed to load"})
    }
})


// ADMIN
app.get('/admin', async (req, res) => {
    const collection = await app.locals.db.collection('users');
    const data = await collection.find().toArray();
    res.status(200).json(data)
})
app.get('/adminProducts', async (req, res) => {
    const collection = await app.locals.db.collection('products');
    const data = await collection.find().toArray();
    res.status(200).json(data)
})

app.delete('/deleteUser/:_id', async(req, res)=> {
    const _id = new ObjectId(req.params._id);
    const collection = await app.locals.db.collection('users');
    const data = await collection.deleteOne({_id})
    res.status(200).json(data)
})

app.delete('/adimnDeleteProducts/:_id', async (req, res)=> {
    const _id = req.params._id;
    const collection = await app.locals.db.collection('products');
    const data = await collection.deleteMany({"codeUser": _id})
    res.status(200).json(data)
})



// USER

app.get('/userProduct/:_id', async (req, res)=> {
    const _id = req.params._id
    const collection = await app.locals.db.collection('products');
    const data = await collection.find({"codeUser": _id}).toArray();
    res.status(200).json(data)
})



const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, "uploads/images")
    },
    filename: function(req, file, cb){
        return cb(null, `${file.originalname}`)
    }
})
const upload = multer({storage:storage})
app.post('/userInsertProduct', upload.single('imageUrl'), async (req, res)=> {
    const user = req.body;
    const{ data } = user
    const parsedData = JSON.parse(data)
    parsedData.imageUrl = req.file.filename
    const result = JSON.stringify(parsedData)
    const collection = await app.locals.db.collection('products');
    const fin = collection.insertOne(JSON.parse(result))
    res.status(200).json(fin)
    
} )

app.delete('/deleteProduct/:_id', async (req,res)=> {
    const _id = new ObjectId(req.params._id);
    const collection = await app.locals.db.collection('products');
    const data = await collection.deleteOne({_id})
    res.status(200).json(data)
})


// PRODUCTS PAGE
app.get('/getType', async (req, res)=> {
    const collection = await app.locals.db.collection('products');
    const data = await collection.distinct('type')
    res.status(200).json(data)
})
app.get('/getByType/:type', async(req, res)=> {
    const type = req.params.type;
    const collection = await app.locals.db.collection('products');
    const data = await collection.aggregate([{"$match":{"type":type}}] ).toArray()
    res.status(200).json(data)
})


//Treding Products
app.post('/tredingProducts/:_id', async(req, res)=> {
    const _id = req.params._id;
    const collection = await app.locals.db.collection('tredingProducts');  
    const data = await collection.findOne({"codeProduct": _id})
    if(data){
        res.status(201).json({mes: "Already exists"})
    }else {
        await collection.insertOne({"codeProduct": _id})
        res.status(200).json({mes: "Success"})
    }
})

app.get('/tredingProducts/', async(req, res)=> {
    const collection = await app.locals.db.collection('tredingProducts');
    const data = await collection.find().toArray();
    res.status(200).json(data)
})
app.delete('/tredingProducts/:_id', async(req, res)=> {
    const _id = req.params._id;
    const collection = await app.locals.db.collection('tredingProducts');
    const data = await collection.deleteOne({"codeProduct":_id})
    res.status(200).json({mes: "Success"})
})


//Treding Users
app.post('/tredingUsers/:_id', async(req, res)=> {
    const _id = req.params._id;
    const collection = await app.locals.db.collection('tredingUsers');  
    const data = await collection.findOne({"codeUser": _id})
    if(data){
        res.status(201).json({mes: "Already exists"})
    }else {
        await collection.insertOne({"codeUser": _id})
        res.status(200).json({mes: "Success"})
    }
})

app.get('/tredingUsers/', async(req, res)=> {
    const collection = await app.locals.db.collection('tredingUsers');
    const data = await collection.find().toArray();
    res.status(200).json(data)
})

app.delete('/tredingUsers/:_id', async(req, res)=> {
    const _id = req.params._id;
    const collection = await app.locals.db.collection('tredingUsers');
    const data = await collection.deleteOne({"codeUser":_id})
    res.status(200).json({mes: "Success"})
})