import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store/configStore';
import App from 'components/App';
import 'styles/styles.scss';

import { loadUser } from 'actions/auth';
store.dispatch(loadUser());

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
