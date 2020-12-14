import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FileUploader from './FileUploader/fileUploader'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';


const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyAJ4Ps9Dx1gwbupsvEkbX67oGZcASG0jCs",
    authDomain: "examsprovider-dad52.firebaseapp.com",
    databaseURL: "https://examsprovider-dad52.firebaseio.com",
    projectId: "examsprovider-dad52",
    storageBucket: "examsprovider-dad52.appspot.com",
    messagingSenderId: "239598032635",
    appId: "1:239598032635:web:d81cc34eaf5c889e48c25e",
   
  };

  firebase.initializeApp(firebaseConfig);
 


  const routing = (
    <Router>
      <div>
        <Route  exact path="/" component={App} />
        <Route path="/upload" component={FileUploader} />
      </div>
    </Router>
  )
  ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
