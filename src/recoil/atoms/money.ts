import {atom, selector} from 'recoil';
import omniPayApi from '../../utils/omniPay';

export const walletAmountState = atom({
  key: 'uniqueWalletAmountState',
  default: 0,
});

export const amountState = atom({
  key: 'uniqueAmountState',
  default: 0,
});

export const addMoneyMutationState = selector({
  key: 'uniqueAddMoneyMutationState',
  get: async ({get}) => {
    try {
      console.log('run state');
      const response = await omniPayApi.post('/add-money', {
        amount: get(amountState),
      });
      console.log('response', response);
      return response;
    } catch (err) {
      return err;
    }
  },
});
