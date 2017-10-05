const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/storage');
import ReduxSagaFirebase from 'redux-saga-firebase';
const  config = {
    apiKey: "AIzaSyDAcZBGfq6aAZl8B-oeqX8jIxryJAEQg3A",
    authDomain: "portfolio-d6c32.firebaseapp.com",
    databaseURL: "https://portfolio-d6c32.firebaseio.com",
    projectId: "portfolio-d6c32",
    storageBucket: "gs://portfolio-d6c32.appspot.com/",
    messagingSenderId: "763692698732"
};
const firebaseApp = firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export const getItems = (fire, name) => {
	const promise = new Promise((resolve, reject) =>{
		let items = {};
		fire.database().ref(name).once('value', function(items) {
			items.forEach(function(childSnapshot) {
				items[childSnapshot.key] = childSnapshot.val();
			});
			resolve(items);
		});
	});	
	return promise;
}

export const getBaseUrl = `https://${config.projectId}.firebaseio.com/`

const rsf = new ReduxSagaFirebase(firebaseApp);

export default rsf;

