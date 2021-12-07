import rough from 'roughjs/bundled/rough.esm';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { RoughCanvas } from 'roughjs/bin/canvas';


const gen = rough.generator();

export const useDrawing = () => {

    const [elements, setElements] = useState([
        //{x1:400,y1:500,x2:600,y2:500,roughEle:gen.line(400,500,600,500)},
        //{x1:400,y1:500,x2:600,y2:500},
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
        console.log('[Line]Change');
    });
    /*
    useEffect(() => {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        context.clearRect(0,0,canvas.width,canvas.height);

        const rc = rough.canvas(canvas);

        elements.forEach((elem) => {
            rc.draw(elem.roughEle);
        });
    },[elements]);*/

    return [elements, setElements, changeLastElement];
}