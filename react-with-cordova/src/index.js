import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './redux/store';
import {positions, Provider as ReactAlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};

function initApp(coords) {
  ReactDOM.render(
    <ReactAlertProvider template={AlertTemplate} {...options}>
      <Provider store={store}>
        <App coords={coords}/>
      </Provider>
    </ReactAlertProvider>, document.getElementById('root'));
    serviceWorker();
};
if (window.cordova) {
  document.addEventListener("deviceready", () => {
    navigator.geolocation.getCurrentPosition((position) => {
      initApp(position.coords);
    }, (error) => {
      console.log(error)
    });
  }, false);
} else {
  initApp();
}