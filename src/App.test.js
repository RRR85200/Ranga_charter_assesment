import React from 'react';
import App from './App';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import TransactionList from "./components/transactionsList/transactionsList";

configure({adapter: new Adapter()});

describe('<App />', () => {
  beforeEach(() => {});

  it('should render the App correctly ', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(AppBar)).toHaveLength(1);
  });

  it('should render transaction list', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(TransactionList)).toHaveLength(1);
  });

  it('should render Typography Bar with correct heading', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(TransactionList)).toHaveLength(1);
    expect(wrapper.find(Typography).text()).toEqual('Customer Transactions & Rewards');
  })

})

