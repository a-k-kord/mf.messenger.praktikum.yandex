import * as chai from 'chai';
import sinon from 'sinon';

import { Router } from '../index';
import { Login } from '../../../pages/Login';
import { Register } from '../../../pages/Register';
import { Chat } from '../../../pages/Chat';
import { Profile } from '../../../pages/Profile';
import { Error } from '../../../pages/Error';
import { mockUser, mockChats } from '../../../mockData/Chat';

const expect = chai.expect;

global.window.uuidv4 = require('uuid').v4;
global.window.Eta = require('eta');

describe('Router', function () {
    before(function () {
        this.server = sinon.createFakeServer();
        this.server.respondWith('POST', /.*\/auth\/signup/, function (xhr) {
            xhr.respond(200, {'Content-Type': 'application/json'}, '{"id": 0}');
        });
        this.server.respondWith('GET', /.*\/auth\/user/, function (xhr) {
            xhr.respond(200, {'Content-Type': 'application/json'}, JSON.stringify(mockUser));
        });
        this.server.respondWith('GET', /.*\/chats/, function (xhr) {
            xhr.respond(200, {'Content-Type': 'application/json'}, JSON.stringify(mockChats));
        });
        this.server.respondWith('GET', /.*\/chats\/new\/\d+/, function (xhr) {
            xhr.respond(200, {'Content-Type': 'application/json'}, '{"unread_count": 12}');
        });
        this.server.configure({respondImmediately: true});
    })

    after(function () {
        this.server.restore();
    })


    beforeEach(function () {
        this.router = new Router("#app");
        this.router
            .use("/", Login)
            .use("/login", Login)
            .use("/register", Register)
            .use("/chat", Chat)
            .use("/profile", Profile)
            .use("/error/404", Error)
            .use("/error/500", Error)
            .start();

        this.router.go('/register');
        this.router.go('/profile');
        this.router.go('/chat');
    })


    describe('Check creation', function () {
        it('Router created and has window.history object', function () {
            expect(this.router.history).to.be.equal(window.history);
        })
    });

    describe('Go to ', function () {

        it('go to page', function (done) {
            setTimeout(() => {
                expect(window.location.pathname).to.be.equal('/chat');
                done();
            }, 500);
        })

        it('refresh page', function (done) {
            this.router.go(window.location.pathname);
            setTimeout(() => {
                expect(window.location.pathname).to.be.equal('/chat');
                done();
            }, 500);
        })

        it('go back', function (done) {
            this.router.back();
            setTimeout(() => {
                expect(window.location.pathname).to.be.equal('/profile');
                done();
            }, 500);
        })

    });

    describe('Negative assertion', function () {

        it('go to unknown page', function (done) {
            this.router.go('unknown');
            setTimeout(() => {
                expect(window.location.pathname).to.be.equal('/unknown');
                done();
            }, 500);

        })

        it('go to empty url', function (done) {
            this.router.go('');
            setTimeout(() => {
                expect(window.location.pathname).to.be.equal('/chat');
                done();
            }, 500);

        })

        it('go to null url', function (done) {
            this.router.go(null);
            setTimeout(() => {
                expect(window.location.pathname).to.be.equal('/chat');
                done();
            }, 500);

        })
    });

})
