import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import { FormHelperText } from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    
    textAlign: "center",
    height: "75px", 
    margin: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 10,
    textAlign: "center"
  },
  pos: {
    marginBottom: 12,
  },
});

export const  SimpleCard = ({data, text}) => {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {`${data}`}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         {text}
        </Typography>
        
      </CardContent>
      <CardActions>
        
      </CardActions>
    </Card>
  );
}