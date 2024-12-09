/* eslint-disable no-restricted-syntax */
/* eslint-disable no-case-declarations */
import { expect } from '@playwright/test';
import { BaseSwagLabPage } from './BaseSwagLab.page';

export class CheckoutInfoPage extends BaseSwagLabPage {
    url = '/checkout-step-one.html';

    customerData = { firstName: 'Andrii', lastName: 'Mysko', zipCode: '76018' };

    continueButton = this.page.getByTestId('continue');

    firstNameInput = this.page.getByTestId('firstName');

    lastNameInput = this.page.getByTestId('lastName');

    zipCodeInput = this.page.getByTestId('postalCode');

    async fillCustomerInformation() {
        await this.firstNameInput.fill(this.customerData.firstName);
        await this.lastNameInput.fill(this.customerData.lastName);
        await this.zipCodeInput.fill(this.customerData.zipCode);
        await this.continueButton.click();
    }
}
