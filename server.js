const express = require('express')
const app = require('express')
const inquirer = require('inquirer')
const fs = require('fs')
const mysql = require('mysql')
const readline = require('readline')

inquirer
    .prompt({
        message: 'Please enter your MySQL username',
        name: 'username'
    },
    {
        message: 'Please enter your MySQL password',
        name: 'password'
    }
    )
    .then(answers => {
        
        const myCon = mysql.createConnection({
            host: 'localhost',
            port: 3000,
            database: 'reservationDB',
            user: answers.username,
            password: answers.password
        })

        var rl = readline.createInterface({
            input: fs.createReadStream('./app/data/reservations.sql'),
            terminal: false
           });

        rl.on('line', function(chunk){
            myCon.query(chunk.toString('ascii'), function(err, sets, fields){
            if(err) console.log(err);
            });
        });

        rl.on('close', function(){
        console.log("finished");
        myCon.end();
        });
    });