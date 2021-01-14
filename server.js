#!/usr/bin/env node
/**
 * @File   : server.js
 * @Author :  (a-k-kord)
 * @Link   : 
 * @Date   : 12/23/2020, 7:12:55 PM
 */

const express = require('express')

const app = express()

const PORT = 4000

const API_PREFIX = '/api/v1';

app.get('/', function(req, res) {
    res.redirect("login.html");
});

app.use(express.static(__dirname + '/static'))

app.listen(PORT, function() {
    console.log(`Example app listening in port ${PORT}! ${__dirname}`)
})