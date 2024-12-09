async function calculatedTotalPrice(ItemsData) {
    let sumPrice = 0;
    for (const element of ItemsData) {
        sumPrice += parseFloat(element.itemPrice.replace('$', ''));
    }
    return sumPrice;
}
const randomNumbers = [];
function generateRandomNumber(maxNumber) {
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * maxNumber);
    } while (randomNumbers.includes(randomNumber));
    randomNumbers.push(randomNumber);
    return randomNumber;
}
module.exports = { calculatedTotalPrice, generateRandomNumber };
