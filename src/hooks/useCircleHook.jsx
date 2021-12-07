import rough from 'roughjs/bundled/rough.esm';
import { useCallback, useEffect, useState } from 'react';

const gen = rough.generator();

export const useCircle = () => {
    const [circleElements, setCircleElements] = useState([
        //{x1:100, y1:100, x2:300, y2:300}
    ]);

    useEffect(() => {

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

    return [circleElements, setCircleElements, changeLastElement, getCircleElement];
}