/* eslint-disable no-restricted-syntax */
/* eslint-disable no-case-declarations */
import { expect } from '@playwright/test';
import { BaseSwagLabPage } from './BaseSwagLab.page';
import { InventoryPage } from './Inventory.page';

export class CheckoutOverViewPage extends BaseSwagLabPage {
    url = '/checkout-step-two.html';

    finishButton = this.page.getByTestId('finish');

    totalLabel = this.page.getByTestId('total-label');

    taxLabel = this.page.getByTestId('tax-label');

    itemTotal = this.page.getByTestId('subtotal-label');

    taxValue = 0.08;

    // eslint-disable-next-line class-methods-use-this
    async calculatedTotalPrice(ItemsData) {
        const price1 = parseFloat(ItemsData[0].itemPrice.replace('$', ''));
        const price2 = parseFloat(ItemsData[1].itemPrice.replace('$', ''));
        const expectedTotal = price1 + price2;
        return expectedTotal;
    }

    async getValueBeforeTax() {
        const total = await this.itemTotal.innerText();
        const totalString = total.replace(/Item total:\s*\$\s*/, '').trim();
        const number = parseFloat(totalString);
        return number;
    }

    async getWithTax() {
        const total = await this.totalLabel.innerText();
        const totalString = total.replace(/Total:\s*\$\s*/, '').trim();
        const number = parseFloat(totalString);
        return number;
    }

    async calculatedTotalWithTaxes(price) {
        const tax = price * this.taxValue;
        const roundedTax = Number(tax.toFixed(2));
        const totalPriceWithTax = price + roundedTax;
        return totalPriceWithTax;
    }
}
