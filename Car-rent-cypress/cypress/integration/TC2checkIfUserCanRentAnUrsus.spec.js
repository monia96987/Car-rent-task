import { carTestData, userTestData } from '/cypress/fixtures/testDataTC2UrsusRent.json';
import { htmlElements } from '/cypress/fixtures/baseTestData/testDataHtmlElements.json';
import { requests } from '/cypress/fixtures/baseTestData/testDataRequests.json';
import { baseUrl } from '/cypress.json';

//disclaimer: this test is looking diffrent than the other two and don't uses reusable tests for creating search form data,
//because of problems with cross-origin: that was the only solution working for me that I found, maybe it will be fix by 
//experimental cy.origin() in the future but for now it has some issues

describe('Check if user can rent an Ursus tractor', () => {

    context('Check if user can rent an Ursus tractor', () => {

        it('Try to rent an Ursur tractor', () => {
            cy.openMainSubpage(baseUrl);
            cy.fillOutTheForm(carTestData);
            cy.clickOnButtonAndCheckRequest(htmlElements.searchButtonInMainPage, requests.searchForCarRequest);
            cy.clickOnButtonAndCheckRequest(htmlElements.rentButtonInRow, requests.rentDetailsRequest, carTestData.model);
            cy.checkIfInHeaderIsCorrectCar(carTestData.model);
            cy.clickOnButtonAndCheckRequest(htmlElements.rentButtonInDetails, requests.rentGETRequest);
            cy.fillOutTheForm(userTestData);
            cy.clickOnButtonAndCheckRequest(htmlElements.finalRentButton, requests.rentPOSTRequest);
        });

    });
});