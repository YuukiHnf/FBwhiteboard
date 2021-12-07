import rough from 'roughjs/bundled/rough.esm';
import { useCallback, useEffect, useState } from 'react';
import {realtimeDB, getDatabaseFrom} from '../firebase';
import { ref, child, get, onValue, update, push } from 'firebase/database';


const gen = rough.generator();

export const useCircle = (room_name) => {
    const [circleElements, setCircleElements] = useState([
        //{x1:100, y1:100, x2:300, y2:300}
    ]);

    useEffect(() => {
        const dbRef = ref(realtimeDB);
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
                setCircleElements(initElement);
            }else{
                console.log('[MyError]No data available');
            }
        }).catch((e) => {
            console.error('[then/Catch Error]',e);
        });

        onValue(child(ref(realtimeDB), `${room_name}`), (snapshot) => {
            const hashData = snapshot.val();
            let initElement = []
            hashData !== null && Object.keys(hashData).forEach(key => {
                console.log(room_name,hashData[key]);
                initElement = [...initElement, Object.assign({}, hashData[key])];
            });
            console.log(initElement);
            setCircleElements(initElement);
        })
        //setCircleElements(getDatabaseFrom(dbRef, room_name));
    },[]);

    const getCircleElement = useCallback(({x1, y1, x2, y2}) => {
        return gen.circle((x1+x2)/2,
                    (y1+y2)/2,
                    Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
    });

    const changeLastElement = useCallback((x2, y2, isInit) => {
        if(isInit){
            const [x1,y1] = [x2,y2];
            setCircleElements(elems => [...elems, {
                x1,y1,x2,y2
            }]);
        }else{
            const targetIndex = circleElements.length-1;
            const {x1,y1} = circleElements[targetIndex];
            const newElems = [...circleElements];
            newElems[targetIndex] = {x1:x1,y1:y1,x2:x2,y2:y2};
            setCircleElements(newElems);
        }
        console.log('[circle]Change');
    });

    const onFinDrawing = () => {
        // keyを使ってデータベースに更新する余白を作る
        const newPostKey = push(child(ref(realtimeDB), room_name)).key;
        // updatesで、rootから、Keyを辿って紐づけるデータを定義する
        const updates = {};
        const targetIndex = circleElements.length-1;
        updates[`${room_name}/` + newPostKey] = circleElements[targetIndex];
        // updateでデータを更新し、thenで成功時のPromiseに対する関数を
        // 定義する
        update(ref(realtimeDB), updates)
        .then(() => {
            console.log('[success]Generate');
        });
    }


    return [circleElements, setCircleElements, changeLastElement, getCircleElement, onFinDrawing];
}