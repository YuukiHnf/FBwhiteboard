import { useCallback, useEffect, useState } from "react";
import rough from 'roughjs/bundled/rough.esm';

const gen = rough.generator();

export const useSquare = () => {
    const [elements, setElements] = useState([
        //{x1:100,y1:100,x2:200,y2:200}
    ]);

    const changeLastElement = useCallback((x2,y2,isInit) => {
        //console.log(x2,y2,isInit);

        if(isInit){
            const [x1,y1] = [x2,y2];
            
            setElements(elems => [...elems, {
                x1,y1,x2,y2
            }]);
        }else{
            const targetIndex = elements.length-1;
            const {x1,y1} = elements[targetIndex];
            const newElems = [...elements];
            newElems[targetIndex] = {x1,y1,x2,y2};
            setElements(newElems);
        }
        console.log('[square]Change');
    });

    /*
    useEffect(() => {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        context.clearRect(0,0,canvas.width,canvas.height);

        const rc = rough.canvas(canvas);
        elements.forEach((ele) => {
            rc.draw(ele.roughEle);
        });
    },[elements]);*/
    
    return [elements, setElements, changeLastElement];
}