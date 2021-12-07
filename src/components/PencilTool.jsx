import { useRef, useState } from "react";
import { usePoints } from "../hooks/usePoints";


export const PencilTool = () => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [points, setPoints, onStartDrawing, onDrawing, doClearRect] = usePoints();

    const checkPoints = () => {
        console.log(points);
        doClearRect();
    }

    const startDrawing = (e) => {
        setIsDrawing(true);
        onStartDrawing(e);
    }

    const drawing = (e) => {
        if(!isDrawing) return;
        onDrawing(e);
    }

    const endDrawing = (e) => {
        setIsDrawing(false);
    }

    return (
        <>
        <button onClick={checkPoints}>PUSH</button>
        <canvas id='canvas'
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={startDrawing}
            onMouseMove={drawing}
            onMouseUp={endDrawing}
        >
            Canvas
        </canvas>
        </>
    );
}