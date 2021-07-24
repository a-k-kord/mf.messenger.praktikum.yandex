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

const hostname = '0.0.0.0'; // сервер запустим на всех интерфейсах
const PORT = process.env.PORT || 5000;

app.use(express.static(`${__dirname}/dist`));

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening in port ${PORT}! (in folder ${__dirname})`);
});
