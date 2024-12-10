import { test } from '../fixtures/base';
import { usersCreds } from './utils';
const dataSortType = [
    {
        sortBy: 'Name (A to Z)',
    },
    {
        sortBy: 'Name (Z to A)',
    },
    {
        sortBy: 'Price (low to high)',
    },
    {
        sortBy: 'Price (high to low)',
    }];

dataSortType.forEach(({ sortBy }) => {
    test(`Sort products by ${sortBy}`, async (/** @type {{ app: import('../pages/Application').Application }} */ {
        app,
    }) => {
        await app.login.navigate();
        await app.login.performLogin(usersCreds.login, usersCreds.password);
        const productNames = await app.inventory.getProductsNames();
        const productPrices = await app.inventory.getProductPrices();
        await app.inventory.sortItemBy(sortBy);
        await app.inventory.expectSortedProducts(sortBy, productNames, productPrices);
    });
});
