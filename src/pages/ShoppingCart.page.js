import { BaseSwagLabPage } from './BaseSwagLab.page';

export class ShoppingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    cartItemTitle = this.page.locator('[data-test="inventory-item-name"]');

    cartItemDesc = this.page.locator('[data-test="inventory-item-desc"]');

    cartItemPrice = this.page.locator('[data-test="inventory-item-price"]');

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

    async getItemInfoById(i) {
        const itemTitle = await this.cartItemTitle.nth(i).textContent();
        const itemDesc = await this.cartItemDesc.nth(i).textContent();
        const itemPrice = await this.cartItemPrice.nth(i).textContent();
        return { itemTitle, itemDesc, itemPrice };
    }
}
