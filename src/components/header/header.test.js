import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import Header from './Header';


describe('Header', () => {
  it('loads the create event page', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toBeDefined();
  });
});