const mongoose  = require('mongoose')


 const expensetrackerschema=new mongoose.Schema({
    amount:{
        type:Number
    },
    category:{
        type:String
    },
    date:{
        type:String
    }

 })
 //creating model model takes two paramter 1)collection name and schema name
 const Expense=mongoose.model("expensedetails",expensetrackerschema)

 //exporting
 module.exports={ Expense } 