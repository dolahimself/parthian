import {naira} from '.';

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
  const formattedCurrency = `${currencySymbol}${integerWithCommas}`; //.${fractionalPart}

  return formattedCurrency;
}

export interface ACCOUNT_TRANSACTIONS_TYPE {
  id: number;
  status: string;
  title: string;
  transactionType: string;
}

export const contacts = [
  {
    id: 0,
    firstName: 'Hailey',
    lastName: 'Sanders',
    number: '+090078601',
    profileImage: 'https://unsplash.it/400/400?image=1',
  },
  {
    id: 1,
    firstName: 'Zayn',
    lastName: 'Michel',
    number: '+090078601',
    profileImage: 'https://unsplash.it/400/400?image=2',
  },
  {
    id: 2,
    firstName: 'Thomas',
    lastName: 'Denver',
    number: '+090078601',
    profileImage: 'https://unsplash.it/400/400?image=3',
  },
  {
    id: 3,
    firstName: 'Dola',
    lastName: 'Popoola',
    number: '+906469674',
    profileImage: 'https://unsplash.it/400/400?image=4',
  },
  {
    id: 4,
    firstName: 'King',
    lastName: 'Parthian',
    number: '+906469674',
    profileImage: 'https://unsplash.it/400/400?image=1',
  },
];


