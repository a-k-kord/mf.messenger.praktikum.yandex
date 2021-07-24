import { Router } from '../../core/Router';
import * as chai from 'chai';
import { getUserApi, handleApiResponse, loginApi, registerApi } from '../api';
import sinon from 'sinon';
import { Login } from '../../pages/Login';
import { Profile } from '../../pages/Profile';
import { mockChats, mockUser } from '../../mockData/Chat';
import { Register } from '../../pages/Register';
import { Chat } from '../../pages/Chat';
import { Error } from '../../pages/Error';

const chaiAsPromised = require('chai-as-promised');

declare global {
    interface Window {
        Eta: { render: (string, object) => {} };
    }
}

const expect = chai.expect;
chai.use(chaiAsPromised);

global.window.uuidv4 = require('uuid').v4;
global.window.Eta = require('eta');

describe('Api calls', function () {

    before(function () {
        this.server = sinon.createFakeServer();
        this.server.respondWith(/.*\/auth\/.+/, function (xhr) {
            xhr.respond(200, {'Content-Type': 'application/json'}, '{"id": 0}');
        });
        // this.server.respondWith('GET', /.*\/auth\/user/, function (xhr) {
        //     xhr.respond(200, {'Content-Type': 'application/json'}, '{"id": 0}');
        // });
        this.server.respondWith('GET', /.*\/chats/, function (xhr) {
            xhr.respond(200, {'Content-Type': 'application/json'}, JSON.stringify(mockChats));
        });
        this.server.respondWith('GET', /.*\/chats\/new\/\d+/, function (xhr) {
            xhr.respond(200, {'Content-Type': 'application/json'}, '{"unread_count": 12}');
        });
        this.server.respondWith('GET', /.*\/fail\/to\/get/, [500, {}, 'error']);
        this.server.configure({respondImmediately: true});

        // this.router = new Router("#app");
        // this.router
        //     .use("/", Login)
        //     .use("/login", Login)
        //     .use("/profile", Profile)
        //     .start();
        // this.router.go('/profile');
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

    after(function () {
        this.server.restore();
    })


    describe('register user', function () {
        it('returns id', function (done) {
            expect(registerApi({})).to.eventually.deep.equals({id: 0}).notify(done);
        });
    });

    describe('login user', function () {
        it('returns id', function (done) {
            expect(loginApi({})).to.eventually.deep.equals({id: 0}).notify(done);
        });
    });

    describe('get auth user', function () {
        it('returns id', function (done) {
            expect(getUserApi()).to.eventually.deep.equals({id: 0}).notify(done);
        });
    });


    describe('handleApiResponse', function () {
        it('response 200: returns response data', function () {
            expect(handleApiResponse({
                status: 200,
                response: 'success'
            } as XMLHttpRequest)).to.be.deep.equal({data: 'success'});
        });

        it('response 500: returns errorMsg', function () {
            expect(handleApiResponse({
                status: 500,
                response: 'server error'
            } as XMLHttpRequest)).to.be.deep.equal({errorMsg: 'server error'});
        });

        it('response 404: returns errorMsg', function () {
            expect(handleApiResponse({
                status: 404,
                response: 'not found'
            } as XMLHttpRequest)).to.be.deep.equal({errorMsg: 'not found'});
        });

        it('response 401: returns errorMsg', function () {
            expect(handleApiResponse({
                status: 401,
                response: 'not authorized'
            } as XMLHttpRequest)).to.be.deep.equal({errorMsg: 'not authorized'});
        });

        it('response 401: redirects to /login', function (done) {
            expect(handleApiResponse({
                status: 401,
                response: 'not authorized'
            } as XMLHttpRequest)).to.be.deep.equal({errorMsg: 'not authorized'});

            setTimeout(() => {
                expect(window.location.pathname).to.be.equal('/login');
                done();
            }, 500);
        });

    });

});

