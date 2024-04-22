let express = require('express');
let app = express();
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let dotenv = require('dotenv');
dotenv.config();
let mongoUrl = process.env.MongoUrl;
let bodyParser = require('body-parser');
let cors = require('cors');
let port = process.env.PORT || 1100;
let db;
//let authKey = process.env.authKey;

/*function auth(key ){
if(key === authKey){
    return true
}else{
    return false
}
}*/

//get heart beat
app.get('/',(req,res)=>{
    res.status(200).send('Health Ok')
})

// middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

//List of city
app.get('/location',(req,res)=>{
   /* let key = req.header('x-basic-token')
    if(auth(key)){*/
        db.collection('location').find().toArray((err,data)=>{
            res.status(200).send(data)
        })
    /*}else{
        res.status(403).send('Not Authenticated Call')
    }  */ 
})

// List of restaurants
app.get('/restaurants',(req,res)=>{
    let query = {};
    let stateId = Number(req.query.stateId);
    let mealId = Number(req.query.mealId);
    if( stateId && mealId){
        query = {state_id:stateId,'mealTypes.mealtype_id':mealId}
    }
    else if(stateId){
        query = {state_id: stateId}
    }else if(mealId){
        query={'mealTypes.mealtype_id':mealId}
    }
    db.collection('restaurants').find(query).toArray((err,data)=>{
        res.status(200).send(data)
    })
})

//filters
//Restaurants wrt to meal + cuisine

app.get('/filter/:mealId',(req,res)=>{
    let sort = {cost:1}
    let skip=0;
    let limit =100000;
    let query = {}
    let mealId = Number(req.params.mealId);
    let cuisineId = Number(req.query.cuisineId);
    let hcost = Number(req.query.hcost);
    let lcost = Number(req.query.lcost);

    if(req.query.skip && req.query.limit){
         skip = Number(req.query.skip);
         limit = Number(req.query.limit); 
    }

    if(req.query.sort){
        sort = {cost:req.query.sort}
    }
    if(cuisineId & hcost && lcost){
        query = {
            'mealTypes.mealtype_id': mealId,
            'cuisines.cuisine_id': cuisineId,
            $and: [{cost:{$gt:lcost,$lt:hcost}}]
        }
    }
     else if(cuisineId){
        query = {
            'mealTypes.mealtype_id': mealId,
            'cuisines.cuisine_id': cuisineId
        }
    }else if(hcost && lcost){
        query = {
            'mealTypes.mealtype_id':mealId,
            $and: [{cost:{$gt:lcost, $lt:hcost}}]
        }
    }
    db.collection('restaurants').find(query).sort(sort).skip(skip).limit(limit).toArray((err,data) =>{
        res.status(200).send(data)
    })
})

// List of MealTypes 
app.get('/mealTypes',(req,res)=>{
    db.collection('mealType').find().toArray((err,data)=>{
        res.status(200).send(data)
    })
})

//details of restaurants
app.get('/details/:id',(req,res) => {
    let restId = Number(req.params.id)
    db.collection('restaurants').find({restaurant_id:restId}).toArray((err,data)=>{
        if(err) throw err;
        res.status(200).send(data)
    })
})

// Menu of restaurants
app.get('/menu/:id',(req,res) => {
    let resId = Number(req.params.id);
    db.collection('menu').find({restaurant_id:resId}).toArray((err,data)=>{
        if (err) throw err;
        res.status(200).send(data)
    })
})

//place order
app.post('/placeOrder',(req, res) => {
let data = req.body;
db.collection('orders').insert(data,(err) => {
    if(err) throw err;
    res.send('Order Placed')
})
})

//get order
app.get('/orders',(req,res) => {
    let query =  {};
    let email = req.query.email;
    if(email){
        query = {email}
    }
db.collection('orders').find(query).toArray((err,data) => {
    if (err) throw err;
    res.send(data)
})
})

// Update Orders
app.put('/updateOrders',(req,res) => {
    db.collection('orders').updateOne(
        {_id: mongo.ObjectId(req.body._id)},
        {
           $set:{
            "status":req.body.status
           } 
        },(err, result) => {
            if (err) throw err;
            res.send('Order status updated')
        }
    )
})

// Menu wrt id {[4,8,6]}
app.post('/menuItem',(req, res) => {
    if(Array.isArray(req.body.id)){
        db.collection('menu').find({menu_id: {$in:req.body.id}}).toArray((err,data) => {
            if(err) throw err;
            res.json(data)
        })
    }
    
    else{
        res.json({"message":"please pass the array"})
    }
})

//delete order
app.delete('/removeOrder',(req,res) => {
    let id = mongo.ObjectId(req.body._id);
    db.collection('orders').find({_id:id}).toArray((err,result) => {
        if(result.length !==0){
            db.collection('orders').deleteOne({_id:id},(err,data) =>{
                if(err) throw err;
                res.send('Order Deleted')
            })
        }else{
            res.send('No Order Found')
        }
    })
})

MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log(`Error While Connecting to mongo`);
    db = client.db('sampledata')
    app.listen(port,() => {
        console.log(`Running on the port ${port}`)
    })
})