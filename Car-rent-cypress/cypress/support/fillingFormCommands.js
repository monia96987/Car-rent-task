
Cypress.Commands.add("fillOutTheForm", (testDataObject) => {
    Object.values(testDataObject).map(testDataElement => {
        fillSingleElementInForm(testDataElement);
    });
});

const fillSingleElementInForm = (testDataElement) => {
    switch (testDataElement.htmlType) {
        case 'input':
        case 'calendar':
            typeValueInInputOrCalendar(testDataElement);
            break;
        case 'dropdown':
            selectValueFromDropdown(testDataElement);
            break;
    };
};

const typeValueInInputOrCalendar = (testDataElement) => {
    cy.getById(testDataElement.id)
        .type(testDataElement.value)
        .invoke('val')
        .then(value => {
            expect(value).to.equal(testDataElement.value);
        });
};

const selectValueFromDropdown = (testDataElement) => {
    cy.getById(testDataElement.id).select(testDataElement.value);
    cy.get(`#${testDataElement.id} option:selected`).should('have.text', testDataElement.value);
};

