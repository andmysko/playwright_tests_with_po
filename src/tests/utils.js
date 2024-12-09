async function calculatedTotalPrice(ItemsData) {
    let sumPrice = 0;
    for (const element of ItemsData) {
        sumPrice += parseFloat(element.itemPrice.replace('$', ''));
    }
    return sumPrice;
}

module.exports = { calculatedTotalPrice };
