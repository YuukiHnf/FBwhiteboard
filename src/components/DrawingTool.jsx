import rough from 'roughjs/bundled/rough.esm';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useDrawing } from '../hooks/useDrawingHook';
import { useIsDrawing } from '../hooks/useIsDrawing';
import { useSquare } from '../hooks/useSquareHook';
import { Swatch } from './Swatch';
import { useCircle } from '../hooks/useCircleHook';

const gen = rough.generator();

export const DrawingTool = () => {
    const [lineElements, setLineElements, lineChangeLastElement] = useDrawing();
    const [squareElements, setSquareElement, squareChangeElement] = useSquare();
    const [circleElements, setCircleElement, circleChangeElement, getCircleElement] = useCircle();
    const [isDrawing, setIsDrawing] = useIsDrawing();
    const [action, setAction] = useState('none');

    const onChangeAction = useCallback((_action) => {
        setAction(_action);
        console.log('set Action',_action);
    },[]);

    const onMouseDown = (e) => {
        setIsDrawing(true);
        let {clientX, clientY} = e;
        const {left, top} = e.target.getBoundingClientRect();
        //console.log(clientX,clientY);
        clientX = clientX-left;
        clientY = clientY-top;
        action === 'line' && lineChangeLastElement(clientX,clientY,true);
        action === 'cube' && squareChangeElement(clientX, clientY, true);
        action === 'circle' && circleChangeElement(clientX, clientY, true);
    }

    const onMouseMove = (e) => {
        if(!isDrawing) return;
        let {clientX, clientY} = e;
        const {left, top} = e.target.getBoundingClientRect();
        //console.log(clientX,clientY);
        clientX = clientX-left;
        clientY = clientY-top;
        action === 'line' && lineChangeLastElement(clientX,clientY,false);
        action === 'cube' && squareChangeElement(clientX, clientY, false);
        action === 'circle' && circleChangeElement(clientX, clientY, false);
    }

    const onMouseUp = (e) => {
        setIsDrawing(false);
        console.log(lineElements);
    }

    const onCleanUp = useCallback(() => {
        setLineElements([]);
        setSquareElement([]);
        setCircleElement([]);
    },[]);

    useEffect(() => {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        context.clearRect(0,0,canvas.width,canvas.height);

        const rc = rough.canvas(canvas);
        lineElements.forEach((ele) => {
            rc.draw(gen.line(ele.x1,ele.y1,ele.x2, ele.y2));
        });
        squareElements.forEach((ele) => {
            rc.draw(gen.rectangle(ele.x1,ele.y1,(ele.x2-ele.x1),(ele.y2-ele.y1)));
        });
        circleElements.forEach((ele) => {
            rc.draw(getCircleElement(ele));
        });
    },[lineElements, squareElements, circleElements]);


    return (
        <>
            <Swatch setToolType={onChangeAction} onClean={onCleanUp}/>
            <p>MODE : {action}</p>
            <canvas id='canvas'
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
            >
                Canvas
            </canvas>
        </>
    );
}
