import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import Home from './Home';

describe('Home', () => {
  it('component render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
    < Home />
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});