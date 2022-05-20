import { fillTheFormAndSearchForCar } from '/cypress/integration/baseTests/fillTheFormAndSearchForCar.spec.js'
import { carTestData } from '/cypress/fixtures/testDataTC3CheckForm.json';


describe('Check if after search, application is showing correct data in the search form', () => {

    fillTheFormAndSearchForCar(carTestData);

    context('Check the search form', () => {

        it('Check the search form', () => {
            cy.checkSearchForm(carTestData);
        });

    });
});