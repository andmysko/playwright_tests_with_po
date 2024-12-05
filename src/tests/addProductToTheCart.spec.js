/* eslint-disable playwright/valid-title */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { expect } from '@playwright/test';
import { test } from '../fixtures/base';

test.describe('Verify Shopping Cart', () => {
    test('Verify The User Is Able To Add Several Items Into The Cart ', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');
        const addedItems = await app.inventory.addRandomItemToTheCart();
        // navigate to cart
        await app.inventory.shoppingCart.click();
        const itemFromCart = await app.shoppingCart.getCartItemInfo();
        expect(addedItems).toEqual(itemFromCart);
    });
});
