import { useCallback, useEffect, useState } from "react";
import rough from 'roughjs/bundled/rough.esm';
import {realtimeDB, getDatabaseFrom} from '../firebase';
import { ref, child, get , set, update, push, onValue} from 'firebase/database';

const gen = rough.generator();

const dbRef = ref(realtimeDB);

export const useSquare = (room_name) => {
    const [elements, setElements] = useState([
        //{x1:100,y1:100,x2:200,y2:200}
    ]);

    useEffect(() => {
        /*
        const initElement = getDatabaseFrom(dbRef,room_name);
        setCircleElements(initElement);
        */
        get(child(dbRef, room_name)).then((snapshot) => {
            if(snapshot.exists()){
                const hashData = snapshot.val();
                let initElement = []
                Object.keys(hashData).forEach(key => {
                    console.log(room_name,hashData[key]);
                    initElement = [...initElement, Object.assign({}, hashData[key])];
                });
                console.log(initElement);
                setElements(initElement);
            }else{
                console.log('[MyError]No data available');
            }
        }).catch((e) => {
            console.error('[then/Catch Error]',e);
        })

        onValue(child(ref(realtimeDB), `${room_name}`), (snapshot) => {
            const hashData = snapshot.val();
            let initElement = []
            hashData !== null && Object.keys(hashData).forEach(key => {
                console.log(room_name,hashData[key]);
                initElement = [...initElement, Object.assign({}, hashData[key])];
            });
            console.log(initElement);
            setElements(initElement);
        })
        //setCircleElements(getDatabaseFrom(dbRef, room_name));
    },[]);

    const changeLastElement = useCallback((x2,y2,isInit) => {
        //console.log(x2,y2,isInit);

        if(isInit){
            const [x1,y1] = [x2,y2];
            
            setElements(elems => [...elems, {
                x1,y1,x2,y2
            }]);
            /*
            const newPostKey = push(child(dbRef, room_name)).key;
            set(dbRef(realtimeDB, `${room_name}/${newPostKey}`),
                {
                    x1:x1, y1:y1, x2:x2, y2:y2
                });
            */
        }else{
            const targetIndex = elements.length-1;
            const {x1,y1} = elements[targetIndex];
            const newElems = [...elements];
            newElems[targetIndex] = {x1,y1,x2,y2};
            setElements(newElems);

            /*
            const newPostKey = push(child(dbRef, room_name)).key;
            const updates = {};
            updates[newPostKey] = {x1,y1,x2,y2}
            //console.log(`newPostKey:${newPostKey}`);
            update(dbRef, updates);
            */
        }
        console.log('[square]Change');
    });

    const onFinDrawing = () => {
        // keyを使ってデータベースに更新する余白を作る
        const newPostKey = push(child(ref(realtimeDB), room_name)).key;
        // updatesで、rootから、Keyを辿って紐づけるデータを定義する
        const updates = {};
        const targetIndex = elements.length-1;
        updates[`${room_name}/` + newPostKey] = elements[targetIndex];
        // updateでデータを更新し、thenで成功時のPromiseに対する関数を
        // 定義する
        update(ref(realtimeDB), updates)
        .then(() => {
            console.log('[success]Generate');
        });
    }
    
    return [elements, setElements, changeLastElement, onFinDrawing];
}