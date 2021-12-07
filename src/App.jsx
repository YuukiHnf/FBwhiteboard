import { useEffect, useState } from 'react';
import {DrawingTool} from './components/DrawingTool';
import { PencilTool } from './components/PencilTool';
import { Swatch } from './components/Swatch';

export const App = () => {
    
    return(
        <>
            <div className='App'>
                <DrawingTool />
                {/* action === 'line' && <DrawingTool />*/}
                {/*action === 'pencil' && <PencilTool />*/}
            </div>
        </>
    )
}