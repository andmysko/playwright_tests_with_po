/* eslint-disable playwright/valid-title */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { expect } from '@playwright/test';
import { test } from '../fixtures/base';

test.describe('Verify Checkout', () => {
    test('Verify The Total Price Of Item Is Displayed Correctly  ', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');
        const addedItems = await app.inventory.addRandomItemToTheCart();
        // navigate to cart
        await app.inventory.shoppingCart.click();
        const itemFromCart = await app.shoppingCart.getCartItemInfo();
        expect(addedItems).toEqual(itemFromCart);
        // make a checkout
        await app.shoppingCart.checkoutButton.click();
        // fill customer info
        await app.checkoutInfo.fillCustomerInformation();
        // compare without Tax
        const actualTotalValue = await app.checkoutOverView.getValueBeforeTax();
        const expectedTotal = await app.checkoutOverView.calculatedTotalPrice(itemFromCart);
        expect(expectedTotal).toEqual(actualTotalValue);
        // compare with tax
        const actualTotalWithTax = await app.checkoutOverView.getWithTax();
        const expectedTotalWithTax = await app.checkoutOverView.calculatedTotalWithTaxes(expectedTotal);
        expect(actualTotalWithTax).toEqual(expectedTotalWithTax);
    });
});
