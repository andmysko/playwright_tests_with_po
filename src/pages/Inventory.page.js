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

    async AddRandomItemToTheCart(number, numbersOfItems) {
        const randomNumbers = [];
        const SelectedItems = [];
        for (let i = 0; i < number; i++) {
            let randomNumber;
            do {
                randomNumber = _.random(0, numbersOfItems - 1);
            } while (randomNumbers.includes(randomNumber));
            randomNumbers.push(randomNumber);
            // get is
            const itemTitle = await this.itemTitle.nth(randomNumber).textContent();
            const itemDesc = await this.itemDesc.nth(randomNumber).textContent();
            const itemPrice = await this.itemPrice.nth(randomNumber).textContent();
            await this.addItemToCartById(randomNumber);
            SelectedItems.push({ itemTitle, itemDesc, itemPrice });
        }
        return SelectedItems;
    }
}
