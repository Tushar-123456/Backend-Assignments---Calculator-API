const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here


function result( num1, num2, str){

    if(str === "add"){
        return num1 + num2;
    }

    if(str === "sub"){
        return num1 - num2;
    }

    if(str === "mul"){
        return num1 * num2;
    }

    if(str === "div"){
        return num1 / num2;
    }
}

function conditions(num1, num2, str){
    if(num1 < -1000000 || num2 < -1000000 || result(num1, num2, str)< -1000000 ){
        return "Underflow";
    }else if(num1 > 1000000 || num2 > 1000000 || result(num1, num2, str) > 1000000){
        return "Overflow";
    }else if(isNaN(num1) || isNaN(num2) ) {
        return "Invalid data types";

    }

}

app.get("/", (req, res) => {
    res.send("Hello world");
})

app.post("/add", (req, res) => {

    //const sum = req.body.num1 + req.body.num2;
    const num1 = req.body.num1;
    const num2 = req.body.num2;

    const fun = conditions(num1, num2, "add")

    if(fun === "Underflow" || fun=== "Overflow" || fun ==="Invalid data types"){
        res.send( {
            status: "error",
            message: fun,
            
            })
    }else {
        const output = num1 + num2;    
        res.send(    {status: "success",
        message: "the sum of given two numbers",
        sum: output})
        //res.send(output.toString());
    }
}) 


app.post("/sub", (req, res) => {

    //const sum = req.body.num1 + req.body.num2;
    const num1 = req.body.num1;
    const num2 = req.body.num2;

    const fun = conditions(num1, num2, "sub")

    if(fun === "Underflow" || fun=== "Overflow" || fun ==="Invalid data types"){
        res.send( {
            status: "error",
            message: fun,
            
            })
    }else {
            
        res.send(    {status: "success",
        message: "the difference of given two numbers",
        difference: num1 - num2})
        
    }
}) 



app.post("/mul", (req, res) => {

    //const sum = req.body.num1 + req.body.num2;
    const num1 = req.body.num1;
    const num2 = req.body.num2;

    const fun = conditions(num1, num2, "mul")

    if(fun === "Underflow" || fun=== "Overflow" || fun ==="Invalid data types"){
        res.send( {
            status: "error",
            message: fun,
            
            })
    }else {
            
        res.send(    {status: "success",
        message: "The product of given numbers",
        result: num1 * num2})
        
    }
}) 




app.post("/div", (req, res) => {

    //const sum = req.body.num1 + req.body.num2;
    const num1 = req.body.num1;
    const num2 = req.body.num2;

    const fun = conditions(num1, num2, "div")

    if(num2 == 0){
            res.send( {
                status: "error",
                message: " Cannot divide by zero",
                
                }
            )

        }else  if(fun === "Underflow" || fun=== "Overflow" || fun ==="Invalid data types" ){
            res.send( {
                status: "error",
                message: fun,
                
            })

        }else {
            
        res.send(    {status: "success",
        message: "The division of given numbers",
        result: num1 / num2})
        
    }
}) 


/*app.post("/div", (req, res) => {

    if(num2 === 0){
        res.send( {
            status: "error",
            message: " Cannot divide by zero",
            
            }
        )
    }else { res.send( {
            status: "success",
            message: " The division of given numbers",
            difference: req.body.num1 / req.body.num2
            }
        )
    }
}) */



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;