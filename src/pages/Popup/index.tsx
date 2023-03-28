import React from 'react';
import Popup from './Popup';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Store } from 'webext-redux';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#650228',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#C8366B',
    },
  },
});

const store = new Store();

Object.assign(store, {
  dispatch: store.dispatch.bind(store),
  getState: store.getState.bind(store),
  subscribe: store.subscribe.bind(store),
});

store.ready().then(() => {
  const container = document.getElementById('popup');
  if (container) {
    const root = createRoot(container);
    root.render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <HashRouter>
            <Popup />
          </HashRouter>
        </ThemeProvider>
      </Provider>
    );
  }
});
