"use strict";
var BakeryItemType;
(function (BakeryItemType) {
    BakeryItemType[BakeryItemType["Cake"] = 0] = "Cake";
    BakeryItemType[BakeryItemType["Bread"] = 1] = "Bread";
    BakeryItemType[BakeryItemType["Other"] = 2] = "Other";
})(BakeryItemType || (BakeryItemType = {}));
var donut = {
    name: 'Donut',
    description: 'This donut has really vibrant pink frosting on it which makes it taste better!',
    numberInStock: 10,
    type: BakeryItemType.Cake,
    price: 10
};
var myPaymentMethod = {
    id: 'my-default-payment-method',
    currency: 'gbp',
    availableBalance: 50,
    expiryDate: new Date(),
    type: 'credit',
    cardValid: true
};
var myBackupPaymentMethod = {
    id: 'my-backup-payment-method',
    currency: 'usd',
    availableBalance: 2000
};
var customer = {
    id: 'my-first-customer',
    primaryPaymentMethod: myPaymentMethod,
    backupPaymentMethod: myBackupPaymentMethod,
    itemsInBasket: [donut]
};
// Making a Payment
var makePayment = function (PaymentMethod, amount) {
    if (PaymentMethod.availableBalance < amount)
        throw new Error('Payment method des not have sufficient funds.');
    PaymentMethod.availableBalance -= amount;
    console.log('Payment was taken successfully!');
};
// Buying a Bakery Item
var payForItemsInBasket = function (customer) {
    customer.itemsInBasket.forEach(function (BakeryItem) {
        try {
            makePayment(customer.primaryPaymentMethod, BakeryItem.price);
            BakeryItem.numberInStock -= 1;
            console.log("Customer with ID: " + customer.id + " has just purchased " + BakeryItem.name + ". There are " + BakeryItem.numberInStock + " items left in stock. ");
        }
        catch (e) {
            console.log('Error encountered whilst making payment. Details: ', e.message);
        }
    });
};
payForItemsInBasket(customer);
