import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from 'firebase/database';

export const firebaseConfig = {
    apiKey: "AIzaSyAJs7E2Trp9aB6pFRIvNyjtqa8edKXpArU",
    authDomain: "myfirebasetutorial-331006.firebaseapp.com",
    databaseURL: "https://myfirebasetutorial-331006-default-rtdb.firebaseio.com",
    projectId: "myfirebasetutorial-331006",
    storageBucket: "myfirebasetutorial-331006.appspot.com",
    messagingSenderId: "321718486500",
    appId: "1:321718486500:web:a1fa09833a71157a2733f1",
    measurementId: "G-G6ESDYCMXB"
};

export const app = initializeApp(firebaseConfig);

export const realtimeDB = getDatabase();