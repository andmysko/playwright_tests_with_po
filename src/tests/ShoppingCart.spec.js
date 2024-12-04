/* eslint-disable playwright/valid-title */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { expect } from '@playwright/test';
import _ from 'lodash';
import { test } from '../fixtures/base';

test.describe('Verify Shopping Cart', () => {
    test('Test 2   Add Random Products', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');
        // get numbers of items
        const numbersOfItems = await app.inventory.inventoryItems.count();
        // generate how many items to be add to the card
        const quantityItemsToAdd = _.random(0, numbersOfItems - 1);
        // add item to card and get their info
        const addedItems = await app.inventory.AddRandomItemToTheCart(quantityItemsToAdd, numbersOfItems);
        // navigate to cart
        await app.inventory.shoppingCart.click();
        // get item details in the cart
        const cartItems = [];
        for (let i = 0; i < addedItems.length; i++) {
            const cartItem = await app.shoppingCart.getItemInfoById(i);
            cartItems.push(cartItem);
        }
        expect(addedItems).toEqual(cartItems);
    });
});
