import { htmlElements } from '/cypress/fixtures/baseTestData/testDataHtmlElements.json';
import { requests } from '/cypress/fixtures/baseTestData/testDataRequests.json';
import { baseUrl } from '/cypress.json';


export const fillTheFormAndSearchForCar = (carTestData) => {

    context('Fill the form and search for car', () => {

        it('Open the page', () => {
            cy.openMainSubpage(baseUrl);
        });

        it('Fill the form', () => {
            cy.fillOutTheForm(carTestData);
        });

        it('Click on search button', () => {
            cy.clickOnButtonAndCheckRequest(htmlElements.searchButtonInMainPage, requests.searchForCarRequest);
        });

    });

}