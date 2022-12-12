import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import {BrowserRouter} from "react-router-dom";
import {Api} from "./api/Api";
import {apiConfig, wsApiConfig} from "./utils";
import {WSApi} from "./api/WSApi";
import {ApiContext} from "./contexts/ApiContext";

export const api = new Api(apiConfig);
export const wsApi = new WSApi(wsApiConfig);

const removeListeners = wsApi.setListeners({
    message: (e) => {
        const {event, payload} = JSON.parse(e.data);

        if (event === "ID_ASSIGNMENT") {
            localStorage.setItem("WS-ID", payload.id.toString());
        }
    },
    close: () => {
        removeListeners();
        localStorage.removeItem("WS-ID");
    }
});

wsApi.connect();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <ApiContext.Provider value={{api, wsApi}}>
              <App/>
          </ApiContext.Provider>
      </BrowserRouter>
  </React.StrictMode>
);
