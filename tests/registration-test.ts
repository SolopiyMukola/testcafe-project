import {ClientFunction, Selector} from 'testcafe';
import * as faker  from "faker";

fixture `Getting Started`
    .page `http://ip-5236.sunline.net.ua:38015/create_account`;

test('My first registration test', async t => {
    const email = faker.internet.email();
    await t
        .typeText('input[name="firstname"]', 'First Name')
        .typeText('input[name="lastname"]', 'Last Name')
        .click('.form-control[name="country_code"]')
        .click(Selector('option').withAttribute('value', 'UA'))
        .typeText('[name="customer_form"] [name="email"]', email)
        .typeText('[name="customer_form"] [name="password"]', email)
        .typeText('[name="customer_form"] [name="confirmed_password"]', email)
        .click('[name="newsletter"]')
        .click('[name="create_account"]');
    const text = await Selector('.alert.alert-success').innerText;
    await t.expect(text.trim().replace(/(\r\n|\n|\r)/gm, '')).eql('Thank you, First Name Last Name!');
    const getPageUrl = ClientFunction(() => window.location.href);
    await t.expect(getPageUrl()).contains('');
});
