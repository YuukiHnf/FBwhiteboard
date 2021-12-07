import { useEffect, useState } from "react"

export const useIsDrawing = () => {
    const [isDrawing, setIsDrawing] = useState(false);

    /*
    useEffect(() => {
        console.log('isDrawing Change...');
    },[isDrawing]);
    */
    return [isDrawing, setIsDrawing];
}