async function calculatedTotalPrice(ItemsData) {
    let sumPrice = 0;
    for (const element of ItemsData) {
        sumPrice += parseFloat(element.itemPrice.replace('$', ''));
    }
    return sumPrice;
}
const usersCreds = { login: 'standard_user', password: 'secret_sauce' };
module.exports = { calculatedTotalPrice, usersCreds };
