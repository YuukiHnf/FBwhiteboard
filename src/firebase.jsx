import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, update } from 'firebase/database';
import { useCallback } from "react";

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

export const dbRooms = ['line_room', 'rect_room', 'circle_room'];

export const getDatabaseFrom = (dbRef, room_name) => {
    get(child(dbRef, room_name)).then((snapshot) => {
        if(snapshot.exists()){
            const hashData = snapshot.val();
            let initElement = []
            Object.keys(hashData).forEach(key => {
                //console.log(room_name,hashData[key]);
                initElement = [...initElement, Object.assign({}, hashData[key])];
            });
            //console.log(initElement);
            return initElement;
        }else{
            console.log('[MyError]No data available');
            return [];
        }
    }).catch((e) => {
        console.error('[then/Catch Error]',e);
    })
}

