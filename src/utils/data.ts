export const naira = '\u20A6';

export function formatCurrency(
  amount: number,
  currencySymbol: string = naira,
): string {
  // Round the amount to two decimal places
  const roundedAmount = Math.round(amount * 100) / 100;

  // Split the number into integer and fractional parts
  const [integerPart, fractionalPart] = roundedAmount.toFixed(2).split('.');

  // Add a comma for thousands separator
  const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Concatenate the parts and add the currency symbol
  const formattedCurrency = `${currencySymbol}${integerWithCommas}.${fractionalPart}`;

  return formattedCurrency;
}

export interface ACCOUNT_TRANSACTIONS_TYPE {
  id: number;
  status: string;
  title: string;
  transactionType: string;
}

export const accountTransactions = [
  {
    id: 0,
    status: 'credit',
    title: 'Fund Wallet',
    transactionType: 'transfer',
  },
  {
    id: 1,
    status: 'debit',
    title: 'Payment for Order 281352',
    transactionType: 'paylater',
  },
  {
    id: 2,
    status: 'debit',
    title: 'Payment for Order 908843',
    transactionType: 'paylater',
  },
  {
    id: 3,
    status: 'credit',
    title: 'Fund Wallet',
    transactionType: 'transfer',
  },
  {
    id: 4,
    status: 'debit',
    title: 'Payment for Order 281352',
    transactionType: 'paylater',
  },
  {
    id: 5,
    status: 'credit',
    title: 'Fund Wallet',
    transactionType: 'transfer',
  },
];
