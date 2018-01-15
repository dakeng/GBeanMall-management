import './components/styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {
    AppContainer
} from 'react-hot-loader';

import App from './components/app';

ReactDOM.render(
    <AppContainer>
        <App />
    </AppContainer>,
    document.getElementById('react-html-container')
);
if (module.hot) {
    module.hot.accept('./components/app', () => {
        require('./components/app');
        ReactDOM.render(
            <AppContainer>
                <App />
            </AppContainer>,
            document.getElementById('react-html-container')
        );
    });
}
