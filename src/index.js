import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Homepage from './pages/homepage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.hydrate(<Homepage />, document.getElementById('root'));
registerServiceWorker();
