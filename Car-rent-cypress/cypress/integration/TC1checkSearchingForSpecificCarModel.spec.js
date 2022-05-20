import { fillTheFormAndSearchForCar } from '/cypress/integration/baseTests/fillTheFormAndSearchForCar.spec.js'
import { carTestData } from '/cypress/fixtures/testDataTC1ModelSearch.json';


describe('Check searching for specific model of a car ', () => {

    fillTheFormAndSearchForCar(carTestData);

    context('Check search results', () => {

        it('Check search results', () => {
            cy.checkSearchResult(carTestData.model);
        });

    });
});