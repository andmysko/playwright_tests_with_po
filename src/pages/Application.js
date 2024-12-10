import { LoginPage } from './Login.page';
import { InventoryPage } from './Inventory.page';
import { ShoppingCartPage } from './ShoppingCart.page';
import { BaseSwagLabPage } from './BaseSwagLab.page';
import { CheckoutInfoPage } from './CheckoutInformation.page';
import { CheckoutOverViewPage } from './CheckoutOverview.page copy';
/**
 * Represents a Playwright page.
 */
class Page {
    /**
     * Creates an instance of PlaywrightPage.
     * @param {import("playwright-core").Page} page - The Playwright page instance.
     */
    constructor(page) {
        this.page = page;
    }
}

/**
 * Represents the application under test.
 * @extends Page
 */
export class Application extends Page {
    /**
     * @type {LoginPage}
     */
    login = new LoginPage(this.page);

    /**
     * @type {InventoryPage}
     */
    inventory = new InventoryPage(this.page);

    /**
     * @type {ShoppingCartPage}
     */
    shoppingCart = new ShoppingCartPage(this.page);

    /**
     * @type {BaseSwagLabPage}
     */
    baseSwagLab = new BaseSwagLabPage(this.page);

    /**
     * @type {CheckoutInfoPage}
     */
    checkoutInfo = new CheckoutInfoPage(this.page);

    /**
     * @type {CheckoutOverViewPage}
     */
    checkoutOverView = new CheckoutOverViewPage(this.page);
}
