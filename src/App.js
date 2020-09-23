import React, { useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

const alanKey = '58a43290e335daa62874bb71e6f3febb2e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () => {

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles }) =>  {
                if( command === 'newHeadlines' ){
                    console.log(articles);
                }
            }

        })
    }, [])
    return (
        <div>
            <h1>Alan AI New Application</h1>
        </div>
    );
}

export default App;