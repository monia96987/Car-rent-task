import { htmlElements } from '/cypress/fixtures/baseTestData/testDataHtmlElements.json';

Cypress.Commands.add("checkSearchForm", (testDataObject) => {
    Object.values(testDataObject).map(testDataElement => {
        checkValueInHtmlElement(testDataElement);
        checkLabel(testDataElement);
    });
});

const checkValueInHtmlElement = (testDataElement) => {
    switch (testDataElement.htmlType) {
        case 'input':
        case 'calendar':
            checkValueInInputOrCalendar(testDataElement);
            break;
        case 'dropdown':
            checkValueInDropdown(testDataElement);
            break;
    };
};

const checkValueInInputOrCalendar = (testDataElement) => {
    cy.getById(testDataElement.id)
        .invoke('val')
        .then(value => {
            expect(value).to.equal(testDataElement.value);
        });
};

const checkValueInDropdown = (testDataElement) => {
    cy.get(`#${testDataElement.id} option:selected`).should('have.text', testDataElement.value);
};

const checkLabel = (testDataElement) => {
    cy.getById(testDataElement.id)
        .parents(htmlElements.labelParentInForm.class)
        .find('label')
        .should('have.text', testDataElement.label);
};

Cypress.Commands.add("checkSearchResult", (testDataElement) => {
    cy.getById(htmlElements.searchResults.id)
        .get('tbody')
        .find('tr')
        .each($el => {
            cy.get($el)
                .find('td')
                .eq(testDataElement.searchResultColumnEq)
                .should('contain.text', testDataElement.value);
        });
});

Cypress.Commands.add("checkIfInHeaderIsCorrectCar", (expectedModel) => {
    cy.get(htmlElements.detailsHeader.class)
        .invoke('text')
        .then((text) => {
            expect(text.trim()).to.equal(expectedModel.value);
        });
});
