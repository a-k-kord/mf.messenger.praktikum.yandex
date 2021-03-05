import { expect } from 'chai';
import { Button } from '../index';

global.window = window;
global.window.uuidv4 = require('../../../vendor/uuid_v4.min.js');
global.window.Eta = require('../../../vendor/eta.min.js');


describe('Block Button', function () {
    describe('Check creation', function () {
        it('Button created', function () {
                const root = window.document.querySelector('#app');
                const btnName = 'TestButton';
                const buttonBlock = new Button(root, {text: btnName});
                expect(buttonBlock.props.text).to.be.equal(btnName);
            }
        )

        it('Button rendered in Dom', function () {
                const root = window.document.querySelector('#app');
                const btnName = 'TestButton';
                const buttonBlock = new Button(root, {text: btnName});
                const buttonEl = window.document.querySelector('button');
                expect(buttonEl).to.be.an('HTMLButtonElement');
            }
        )
    });
})