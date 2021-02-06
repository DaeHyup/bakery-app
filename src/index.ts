enum BakeryItemType {
  Cake,
  Bread,
  Other,
}

interface BakeryItem {
  name: string;
  description?: string;
  imageURL?: string;
  numberInStock: number;
  type: BakeryItemType;
  price: number;
}

const donut: BakeryItem = {
  name: 'Donut',
  description:
    'This donut has really vibrant pink frosting on it which makes it taste better!',
  numberInStock: 10,
  type: BakeryItemType.Cake,
  price: 10,
};

interface PaymentMethod {
  id: string;
  currency: 'gbp' | 'usd' | 'aud' | 'eur';
  availableBalance: number;
}

interface CreditCardPaymentMethod extends PaymentMethod {
  expiryDate: Date;
  type: 'credit' | 'debit';
  cardValid: boolean;
}

type CashPaymentMethod = PaymentMethod;

const myPaymentMethod: CreditCardPaymentMethod = {
  id: 'my-default-payment-method',
  currency: 'gbp',
  availableBalance: 50,
  expiryDate: new Date(),
  type: 'credit',
  cardValid: true,
};

const myBackupPaymentMethod: CashPaymentMethod = {
  id: 'my-backup-payment-method',
  currency: 'usd',
  availableBalance: 2000,
};

interface Customer {
  id: string;
  primaryPaymentMethod: CashPaymentMethod | CreditCardPaymentMethod;
  backupPaymentMethod?: CashPaymentMethod | CashPaymentMethod;
  itemsInBasket: BakeryItem[];
}

const customer: Customer = {
  id: 'my-first-customer',
  primaryPaymentMethod: myPaymentMethod,
  backupPaymentMethod: myBackupPaymentMethod,
  itemsInBasket: [donut],
};

// Making a Payment

const makePayment = (PaymentMethod: PaymentMethod, amount: number) => {
  if (PaymentMethod.availableBalance < amount)
    throw new Error('Payment method des not have sufficient funds.');

  PaymentMethod.availableBalance -= amount;

  console.log('Payment was taken successfully!');
};

// Buying a Bakery Item

const payForItemsInBasket = (customer: Customer) => {
  customer.itemsInBasket.forEach(BakeryItem => {
    try {
      makePayment(customer.primaryPaymentMethod, BakeryItem.price);
      BakeryItem.numberInStock -= 1;
      console.log(
        `Customer with ID: ${customer.id} has just purchased ${BakeryItem.name}. There are ${BakeryItem.numberInStock} items left in stock. `
      );
    } catch (e) {
      console.log(
        'Error encountered whilst making payment. Details: ',
        e.message
      );
    }
  });
};

payForItemsInBasket(customer);
