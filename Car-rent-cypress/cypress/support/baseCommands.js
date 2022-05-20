
Cypress.Commands.add("openMainSubpage", (baseUrl) => {
    cy.visit('');
    cy.url().should('equal', baseUrl);
});

Cypress.Commands.add("getById", (selector, ...args) => {
    return cy.get(`#${selector}`, ...args);
});

Cypress.Commands.add("clickOnButtonAndCheckRequest", (button, request, testdata) => {
    cy.intercept(request.method, request.url).as(request.alias);
    cy.clickOnButton(button, testdata);
    cy.waitForRequest(request);
});

Cypress.Commands.add("clickOnButton", (button, testDataElement) => {
    (button.inRow === true)?
        clickOnButtonInSpecificRow(button, testDataElement):
        clickOnButtonOutsideTable(button);
});

const clickOnButtonInSpecificRow = (button, testDataElement) => {
    cy.get('tbody')
        .find('tr')
        .contains(testDataElement.value)
        .parent('tr')
        .find(button.htmlType)
        .contains(button.name)
        .click();
};

const clickOnButtonOutsideTable = (button) => {
    cy.getById('content')
        .find(button.htmlType)
        .contains(button.name)
        .click();
};

Cypress.Commands.add("waitForRequest", (request) => {
    cy.wait(`@${request.alias}`)
        .its('response.statusCode')
        .should('eq', request.expectedStatusCode);
});
