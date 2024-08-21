const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{
    res.send(JSON.stringify(friends, null , 4))
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email",(req,res)=>{
    const email = req.params.email;
    res.send(friends[email])

});


// POST request: Add a new friend
router.post("/",(req,res)=>{
    // check if email is provided in the request body
    const {email, firstName,lastName, DOB} = req.body;
    if(email){
        //Create or update friend's details based on provided email
        friends[email] = {
            firstName,
            lastName,
            DOB
        }

    }
    // Send response indicating user addition
    res.send(`The user ${firstName} has been added!`)
});


// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
    //Extract email parameter from request URL
    const email = req.params.email;
    //Retrieve friend object associated with email
    let friend = friends[email];
    //Update friend
    if(friend){
        const {firstName,lastName, DOB} = req.body;
        if(firstName){
            friend.firstName = firstName
        }
        if(lastName){
            friend.lastName = lastName
        }
        if(DOB){
            friend.DOB = DOB
        }
        friends[email] = friend;
        res.send(`Friend with the email ${email} updated`)
    }
    else{
        res.send("Unable to find friend!")
    }
});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
    //Extract email parameter from request URL
    const email = req.params.email;
    //Delete friend
    if(email){
        delete friends[email];
    }
    res.send(`Friend with the email ${email} deleted.`)
});

module.exports=router;
