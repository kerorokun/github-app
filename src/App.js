import React from 'react';

import { Provider, connect } from 'react-redux';
import { store } from './store';
import { Root } from './root';



/*
  Starting point of the app.
*/
export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
              <Root/>
            </Provider>
        );
    }
}
