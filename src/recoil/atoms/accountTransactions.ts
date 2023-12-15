import {atom, selector} from 'recoil';
import {accountTransactions} from '../../utils';

export const transactionFilterState = atom({
  key: 'uniqueTransactionFilterState',
  default: '',
});

export const filteredTransactionsState = selector({
  key: 'uniqueFilteredTransactionsState',
  get: ({get}) => {
    const filters = get(transactionFilterState);
    return accountTransactions.filter(
      player => filters.length === 0 || filters.includes(player.status),
    );
  },
});
