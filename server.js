#!/usr/bin/env node
/**
 * @File   : server.js
 * @Author :  (a-k-kord)
 * @Link   :
 * @Date   : 12/23/2020, 7:12:55 PM
 */

// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const app = express();

const PORT = 4000;

app.use(express.static(`${__dirname}/static`));

const handler = (req, res) => {
    res.sendFile(`${__dirname}/static/index.html`);
};

app.get('/*', handler);
   // .get('/login*', handler)
   // .get('/register*', handler)
   // .get('/chat*', handler)
   // .get('/error*', handler)
   // .get('/profile*', handler)
   //  .get('/*', handler);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening in port ${PORT}! ${__dirname}`);
});
