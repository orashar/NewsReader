import React, { useEffect, useState, createRef } from 'react'
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import useStyles from './style.js'
import classNames from 'classnames'

const NewsCard = ({ article : {description, publishedAt, source, title, url, urlToImage }, activeArticle, i }) => {
    const classes = useStyles()
    const [ elRefs, setelRefs ] = useState([])
    const scrollToRef = ref => window.scroll(0, ref.current.offsetTop - 50)

    useEffect(() => {
        setelRefs(refs => Array(20).fill().map((_, j) => refs[j] || createRef()))
    }, [])

    useEffect(() => {
        if(i === activeArticle && elRefs[activeArticle]) scrollToRef(elRefs[activeArticle])
    }, [i, activeArticle, elRefs])

    return(
      <Card ref={elRefs[i]} className={classNames(classes.card, (activeArticle === i ? classes.activeCard : null))}>
          <CardActionArea href={url} target='_blank'>
              <CardMedia className={classes.media} image={urlToImage || 'data:image/jpeg;base64,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'}/>
              <div className={classes.details}>
                  <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                  <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
              </div>
              <Typography className={classes.title} gutterBottom variant="h5">{title}</Typography>
              <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
              </CardContent>
          </CardActionArea>
          <CardActions className={classes.cardActions}>
              <Button size="small" color="primary">Learn more</Button>
              <Typography variant="h5" color="textSecondary">{i+1}</Typography>
          </CardActions>
      </Card>
   )

 }

export default NewsCard