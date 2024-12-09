/* eslint-disable no-restricted-syntax */
import { BaseSwagLabPage } from './BaseSwagLab.page';

export class ShoppingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    cartItemTitle = this.page.getByTestId('inventory-item-name');

    cartItemDesc = this.page.getByTestId('inventory-item-desc');

    cartItemPrice = this.page.getByTestId('inventory-item-price');

    headerTitle = this.page.locator('.title');

    cartItems = this.page.locator(this.cartItemSelector);

    // async below added to show the function returns a promise
    async getCartItemByName(name) {
        return this.page.locator(this.cartItemSelector, { hasText: name });
    }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.locator(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems.nth(id).locator(this.removeItemSelector).click();
    }

    async getCartItemInfo() {
        const allProducts = await this.cartItems.all();
        const cartItems = [];
        for await (const element of allProducts) {
            const itemTitle = await element.getByTestId('inventory-item-name').innerText();
            const itemDesc = await element.getByTestId('inventory-item-desc').innerText();
            const itemPrice = await element.getByTestId('inventory-item-price').innerText();
            cartItems.push({ itemTitle, itemDesc, itemPrice });
        }
        return cartItems;
    }
}
