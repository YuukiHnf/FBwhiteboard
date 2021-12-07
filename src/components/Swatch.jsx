import {memo} from 'react';

export const Swatch = memo(({ setToolType , onClean}) => {
    return (
        <div>
            <div className='row'>
                <div className='col-md-12'>
                    <div>
                        <button
                            title='Cube'
                            onClick={
                                () => {
                                    setToolType('cube');
                                }
                            }
                        >
                            Cube
                        </button>
                        <button
                            title='Line'
                            onClick={() => {
                                setToolType('line');
                            }}
                        >
                            Line
                        </button>
                        <button
                            title='circle'
                            onClick={() => {
                                setToolType('circle');
                            }}>
                            Circle
                        </button>
                        <button
                            title='clean'
                            onClick={() => {
                                onClean();
                            }}>
                            Clean
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});