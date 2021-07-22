import React, { useEffect, useState } from 'react'

import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js'
import wordsToNumbers from 'words-to-numbers'

const ALANKEY = "2bbec721ae0ada9a74878b3f6c7d86b32e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = (props) => {

    const [ newsArticles, setNewsArticles ] = useState([])
    const [ activeArticle, setActiveArticle ] = useState(-1);

    const classes = useStyles()

    useEffect(() => {
        alanBtn({
            key: ALANKEY,
            onCommand: ({ command, articles, number }) => {
                if(command === 'newHeadlines'){
                    setNewsArticles(articles)
                    setActiveArticle(-1);
                }else if(command === 'highlight'){
                    setActiveArticle((activeArticle => activeArticle+1))
                }else if(command === 'open'){
                    const i = parseInt(number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number);
                    const article = articles[i-1]
                    if(i > 20) alanBtn().playText('please try that again.')
                    else if(article){
                        window.open(article.url, '_blank')
                        alanBtn().playText(`Opening article ${i}`)
                    }else{
                        alanBtn().playText('please try that again.')
                    }
                }
            }
        })
    }, [])
  
    return(
    <div>
        <div className={classes.logoContainer}>
            <img src="https://alan.app/brand_assets/logo-horizontal/color/alan-logo-horizontal-color.png" className={classes.alanLogo} alt="Alan AI"/>
        </div>
        <NewsCards articles={newsArticles}activeArticle={activeArticle}/>
    </div>
   )

 }

export default App