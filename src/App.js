import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';

require('dotenv').config({path: __dirname + '/.env'})

const alanKey = process.env.REACT_APP_API_KEY;

const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) =>  {
                if( command === 'newHeadlines' ){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }
                else if ( command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                }
                else if ( command === 'open'){
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    console.log("parsedNumber= " + parsedNumber);
                    const article = articles[parsedNumber -1];

                    if ( parsedNumber > 20){
                        alanBtn().playText('Please try saying that again')
                    }
                    else if (article){
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening.. .');
                    }
                    else {
                        alanBtn().playText('Please try saying that again...');
                    }

                }
            }

        })
    }, [])
    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="https://alan.app/static/alan-logo-medium-text-and-icon.986d8ae5.svg" width="300" className={classes.alanLogo} alt="Alan Logo" />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    );
}

process.on('SIGINT', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    // some other closing procedures go here
    process.exit(1);
  });

export default App;