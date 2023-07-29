import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

/*root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);*/
axios.get('http://localhost:3001/persons').then( response => {
  const persons = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App persons = {persons}/>
    </React.StrictMode>
  )

} )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
