/**
 * Created by fatih on 2019-01-10.
 */
/**
 * Created by fatih on 2019-01-07.
 */

import * as firebase from 'firebase/';
// Initialize Firebase
const config = {
    apiKey: "AIzaSyD8jSi9DH4omLmZVeTIFBCfr1Xw1DQGV2M",
    authDomain: "smarthome-3c6b9.firebaseapp.com",
    databaseURL: "https://smarthome-3c6b9.firebaseio.com",
    projectId: "smarthome-3c6b9",
    storageBucket: "smarthome-3c6b9.appspot.com",
    messagingSenderId: "227730898463"
};
const fire=firebase.initializeApp(config);
export default fire;