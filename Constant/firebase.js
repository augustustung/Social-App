import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCK_okUG8CeZVP_PazwJufgw6KEVEr-svE",
    authDomain: "storageuser-41682.firebaseapp.com",
    projectId: "storageuser-41682",
    storageBucket: "storageuser-41682.appspot.com",
    messagingSenderId: "585513081664",
    appId: "1:585513081664:web:e7c4f5bef17dd8dbfe78a5"
}


if(firebase.default.apps.length === 0) {
    firebase.default.initializeApp(firebaseConfig)
} else {
    firebase.default.app()
}

const db = firebase.default.firestore()
const auth = firebase.default.auth()
const storage = firebase.default.storage()

export { db, auth, storage }
