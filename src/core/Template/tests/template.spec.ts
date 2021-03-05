import { expect } from 'chai';
import { compileTemplate } from '../index';
import { createBlockDocumentElement } from '../../../utils/dom';
import { Props } from '../../Block';

global.window = window;
global.window.uuidv4 = require('../../../vendor/uuid_v4.min.js');
global.window.Eta = require('../../../vendor/eta.min.js');


describe('Templator', function () {
    function createTemplate(props?: Record<string, string>, slots?: Record<string, HTMLElement>) {
        props = props === undefined ? { attrs: 'name=TestElement' } : props;
        slots = slots === undefined ? { childElement: createBlockDocumentElement('childElement') } : slots;

        return compileTemplate<Props>(
            `<div id="testId" <%-= it.props?.attrs ? it.props?.attrs : '' %> >
                        <% if(it.slots?.childElement) { %>
                            <%~ it.slots?.childElement.outerHTML %>
                        <% } %>
                      </div>`,
            { props, slots }
            );
    }

    describe('Check creation', function () {

        it('template created', function () {
                expect(createTemplate()).to.be.a('string');
            }
        );

        it('template rendered in DOM', function () {
                const root = window.document.querySelector('#app');
                root.innerHTML = createTemplate();
                const el = window.document.getElementById('testId');
                expect(el).to.be.an('HTMLDivElement');
            }
        );

        it('props as tag attributes rendered', function () {
                const root = window.document.querySelector('#app');
                root.innerHTML = createTemplate();
                const el = window.document.querySelector('[name="TestElement"]');
                expect(el).to.be.an('HTMLDivElement');
            }
        );

        it('slots as child elements rendered', function () {
                const root = window.document.querySelector('#app');
                root.innerHTML = createTemplate();
                const el = window.document.querySelector('[name="TestElement"] > [data-block-name="childElement"]');
                expect(el).to.be.an('HTMLDivElement');
            }
        );

        describe('Check creation with bad input', function () {
            it('props and slots are empty objects', function () {
                expect(createTemplate({}, {})).to.be.a('string');
            });

            it('props and slots are null', function () {
                createTemplate(null, null)
                expect(() => createTemplate(null, null)).to.not.throw(TypeError);
            });
        });
    });
})