import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import Dashboard from './Dashboard'


describe('Dashboard', () => {
  it('loads the dashboard page', () => {
    const wrapper = shallow(<Dashboard/>);
    expect(wrapper).toBeDefined();
  });
});