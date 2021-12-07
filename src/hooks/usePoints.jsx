import {  useEffect, useState, useRef } from "react";

const pos = {x:0,y:0};

export const usePoints = () => {
    const [points, setPoints] = useState([]);
    const [drawing, setDrawing] = useState(false);
    const contextRef = useRef(null);

    
    const canvas = document.getElementById('canvas');


    useEffect(() => {
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        contextRef.current = ctx;

        //contextRef.current.moveTo(points.indexOf(0).x, points.indexOf(0).y);
        points.forEach((ele) => {
            contextRef.current.lineTo(ele.x,ele.y);
            contextRef.current.stroke();
        });
    },[points]);

    const onStartDrawing = (e) => {
        const { clientX, clientY } = e;
        [pos.x, pos.y] = [clientX, clientY];
        //ctx.moveTo(pos.x, pos.y);
    }

    const onDrawing = (e) => {
        //console.log(e.clientX, e.clientY);
        //setPoints((state) => [...state, Object.assign({}, pos)] );
        setPoints((state) => [...state, pos]);
        contextRef.current.moveTo(pos.x, pos.y);

        const { clientX, clientY } = e;
        [pos.x, pos.y] = [clientX, clientY];
    }


    const doClearRect = () => {
        contextRef.current.clearRect(0,0,canvas.width,canvas.height);
    }
    return [points, setPoints, onStartDrawing, onDrawing, doClearRect];
}