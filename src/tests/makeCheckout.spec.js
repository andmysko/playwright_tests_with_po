import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { calculatedTotalPrice, generateRandomNumber } from './utils';

test.describe('Verify Checkout', () => {
    test('Verify The Total Price Of Item Is Displayed Correctly  ', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');
        const numbersOfItems = await app.inventory.inventoryItems.count();
        const randomQuantity = generateRandomNumber(numbersOfItems);
        const addedItems = await app.inventory.addRandomItemToTheCart(randomQuantity);
        // navigate to cart
        await app.inventory.shoppingCart.click();
        const itemFromCart = await app.shoppingCart.getCartItemInfo();
        expect(addedItems).toEqual(itemFromCart);
        // make a checkout
        await app.shoppingCart.checkoutButton.click();
        // fill customer info
        const customerData = { firstName: 'Andrii', lastName: 'Mysko', zipCode: '76018' };
        await app.checkoutInfo.fillCustomerInformation(customerData);
        // compare without Tax
        const actualTotalValue = await app.checkoutOverView.getValueBeforeTax();
        const expectedTotal = await calculatedTotalPrice(itemFromCart);
        expect(expectedTotal).toEqual(actualTotalValue);
        // compare with tax
        const actualTotalWithTax = await app.checkoutOverView.getWithTax();
        const expectedTotalWithTax = await app.checkoutOverView.calculatedTotalWithTaxes(expectedTotal);
        expect(actualTotalWithTax).toEqual(expectedTotalWithTax);
    });
});
