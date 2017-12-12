import {BrowserRouter, Route, Switch} from  'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import './index.css';


ReactDOM.render(
<BrowserRouter> 
    <Switch>
        <Route exact path="/" component={App}/>
    </Switch>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
