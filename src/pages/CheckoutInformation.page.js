/* eslint-disable no-restricted-syntax */
/* eslint-disable no-case-declarations */
import { BaseSwagLabPage } from './BaseSwagLab.page';

export class CheckoutInfoPage extends BaseSwagLabPage {
    url = '/checkout-step-one.html';

    continueButton = this.page.getByTestId('continue');

    firstNameInput = this.page.getByTestId('firstName');

    lastNameInput = this.page.getByTestId('lastName');

    zipCodeInput = this.page.getByTestId('postalCode');

    async fillCustomerInformation(customerData) {
        await this.firstNameInput.fill(customerData.firstName);
        await this.lastNameInput.fill(customerData.lastName);
        await this.zipCodeInput.fill(customerData.zipCode);
        await this.continueButton.click();
    }
}
