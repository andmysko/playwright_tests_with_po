/* eslint-disable no-restricted-syntax */
/* eslint-disable no-case-declarations */
import _ from 'lodash';
import { expect } from '@playwright/test';
import { BaseSwagLabPage } from './BaseSwagLab.page';

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitle = this.page.locator('.title');

    inventoryItems = this.page.locator('.inventory_item');

    itemTitle = this.page.getByTestId('inventory-item-name');

    itemDesc = this.page.getByTestId('inventory-item-desc');

    itemPrice = this.page.getByTestId('inventory-item-price');

    parent = this.page.locator('.inventory_item');

    sortButton = this.page.getByTestId('product-sort-container');

    async addItemToCartById(id) {
        const addToCartButton = await this.parent;
        await addToCartButton.nth(id).locator('button').click();
    }

    async sortItemBy(type) {
        await this.sortButton.selectOption({ label: `${type}` });
    }

    async getProductsNames() {
        const productNames = await this.itemTitle.allTextContents();
        return productNames;
    }

    async getProductPrices() {
        const productPrices = await this.itemPrice.allTextContents();
        return productPrices.map((price) => parseFloat(price.replace('$', '').trim()));
    }

    async expectSortedProducts(sortBy, productNames, productPrices) {
        switch (sortBy) {
            case 'Name (A to Z)':
                const sortedNamesAZ = await this.getProductsNames();
                const expectedNamesAZ = productNames.sort();
                expect(sortedNamesAZ).toEqual(expectedNamesAZ);
                break;
            case 'Name (Z to A)':
                const sortedNamesZA = await this.getProductsNames();
                const expectedNamesZA = productNames.sort().reverse();
                expect(sortedNamesZA).toEqual(expectedNamesZA);
                break;
            case 'Price (low to high)':
                const sortedPricesLowHigh = await this.getProductPrices();
                const expectedPricesLowHigh = productPrices.sort((a, b) => a - b);
                expect(sortedPricesLowHigh).toEqual(expectedPricesLowHigh);
                break;
            case 'Price (high to low)':
                const sortedPricesHighLow = await this.getProductPrices();
                const expectedPricesHighLow = productPrices.sort((a, b) => b - a);
                expect(sortedPricesHighLow).toEqual(expectedPricesHighLow);
                break;
            default:
                throw new Error('Sort option is not correct');
        }
    }

    async addRandomItemToTheCart() {
        const allProducts = await this.inventoryItems.all();
        const randomProduct = _.sampleSize(allProducts, 2);
        const selectedItems = [];
        for await (const element of randomProduct) {
            const itemTitle = await element.getByTestId('inventory-item-name').innerText();
            const itemDesc = await element.getByTestId('inventory-item-desc').innerText();
            const itemPrice = await element.getByTestId('inventory-item-price').innerText();
            selectedItems.push({ itemTitle, itemDesc, itemPrice });
            await element.locator('[id^="add-to-cart"]').click();
        }
        return selectedItems;
    }
}
