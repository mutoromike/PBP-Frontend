import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import EditBusinessModal from './EditBusinessModal.jsx';

const forms = {
  id: '4',
  countries: [],
};
const users = [];


describe('Event', () => {
  it('loads the create event page', () => {
    const wrapper = shallow(<EditBusinessModal business={forms}/>);
    expect(wrapper).toBeDefined();
  });
});
