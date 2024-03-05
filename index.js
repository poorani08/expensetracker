//console.log("hello")
/**
 * expense tracker
 * 
 * features
 * 
 * adding new expense/income://add expense->post
 * displaying existing expenses://get expense->get
 * editing existing entries://edit expense->post->patch/put
 * deleting expenses://delete expense->post->already has default in postman as delete
  
 * budget reporting
 * creating expenses
 * validating user
 * 
 * 
 * defining schema
 * categories,amount,date
 * 

 */
const mongoose = require("mongoose")
const express = require("express")
const cors=require("cors")
const bodyParser = require("body-parser")
const { Expense } = require("./schema.js")//importing the exported data


const app = express()
app.use(bodyParser.json())
app.use(cors())//middle class

//database connectivity
//mongoose is asynchronous
//returns ppromise
//when it ends
async function connectToDb() {
    try{

    await mongoose.connect('mongodb+srv://poorni:poorni@poorni.7ajincx.mongodb.net/expensetracker?retryWrites=true&w=majority&appName=poorni')
    console.log("db connection established")
    
    const port = process.env.PORT||8000
    app.listen(port, function () {
        console.log(`listening on port ${port}`)
    })
}
catch(e){
    console.log(e)
    console.log("could not establish connection")

}
}
connectToDb()

//schema definition

//endpoint
app.post('/add-expense',  async function (request, response) {
    //console.log(request.body)
    //asynchronous function (create) 
    try{

     await Expense.create({
        "amount":request.body.amount,
        "category":request.body.category,
        "date":request.body.date
    })
    response.status(201).json({
        "status":"created",
        "message":"new entry created"
    })
}catch(e){
    response.status(500).json({
        "status":"failure",
        "message":"new entry is not created"
    })
}
    // response.json({
    //     "status": "created"
    // })//sending request
    
})

app.get('/get-expenses', async function(request,response){
    try{
     const expensedata = await Expense.find()//asynchronous delay
     response.status(200).json(expensedata)
    }catch(error){
        response.status(500).json({
        "status":"Failure",
        "message":"could not fetch entries",
        "error":error
        })
    }
})

//using params
app.delete("/delete-expense/:id", async function(request,response){
    //console.log("req received")
    //console.log(request.params.id)
    try{
    const expensedata= await Expense.findById(request.params.id)
    if(expensedata){
        await Expense.findByIdAndDelete(request.params.id)
        response.status(200).json({
            "status":"success",
            "message":"deleted"
        })
    }
    else{
        response.status(404).json({
            "status":"failure",
            "message":"could not fetch entries"
        })
    }
}catch(error){
    response.status(500).json({
    "status":"Failure",
    "message":"could not fetch entries",
    "error":error

})
}
})
// put-changes entire Contentt patch->delete particular data
//both body and params are sent
app.patch("/edit-expense/:id", async function(request,response){
     
     try{
        const expenseentry= await Expense.findById(request.params.id)
        if(expenseentry){
             await expenseentry.updateOne({
                "amount":request.body.amount,
                "category":request.body.category,
                "date":request.body.date
            })
            response.status(200).json({
                "status":"success",
                "message":"updated"
            })
        }
        else{
            response.status(404).json({
                "status":"failure",
                "message":"could not fetch entries"
            })
        }
    }catch(error){
        response.status(500).json({
        "status":"Failure",
        "message":"could not fetch entries",
        "error":error
    
    })
    }
    })





