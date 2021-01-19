const express = require('espress');
const app = express()

var fs = require('fs');
const { User, Image } = require("./db/models");

//Set up mongoose connection
require("./db/mongoose");

async function createUser() { 
    const user = new User({
        username: 'user3',
        email: 'user3@abc.com',
        password: 'whddjsshdhsd',
        userlevel: 10,
    })
/// saving the user into the database
    const result = await user.save();
    console.log(result);
}
// createUser();

async function getUsers() {
    const users = await User
    .find({username:'user3', userlevel:10});
    console.log(users)
}
// getUsers()

async function getImagesByCategory() {
    const imagesByCategory = await Image
    .find({categoryName:'Colors'});
    console.log(imagesByCategory)
}
// getImagesByCategory()

//// To update a document changing userlevel to 4
async function updateUser(id){
    const user = await User.findById(id);
    if(!user) return console.log('user does not exist');

    user.username= 'user3';
    const result = await user.save();
    console.log(result);
}
// updateUser('60020568999aa323fcf1c275')

/// Remove a document

async function removeUser(id){
    const user = await User.findByIdAndRemove(id);
    console.log(user);
}
// removeUser('600105e8d92e34612c5d0371')
