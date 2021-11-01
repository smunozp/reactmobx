import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
//declare var window: { firebase: firebase.FirebaseApp }
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  //databaseURL: process.env.REACT_APP_DB,
  projectId: process.env.REACT_APP_PID,
  storageBucket: process.env.REACT_APP_SB,
  messagingSenderId: process.env.REACT_APP_SID,
  appId: process.env.REACT_APP_APPID,
  //measurementId:process.env.REACT_APP_MID
}


const firebaseApp = initializeApp(firebaseConfig)
//window.firebase = firebaseApp
export const db = getFirestore(firebaseApp)
//export const auth = getAuth(firebaseApp)
// export default firebaseApp
