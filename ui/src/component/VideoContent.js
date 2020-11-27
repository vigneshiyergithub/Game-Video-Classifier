import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Container, Typography, TextField , MenuItem, FormHelperText} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import {CATEGORIES, USERS} from './constants';
import firebase from './firebase'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '1rem',
    minWidth: 275
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    display: 'flex',
    justifyContent: 'center'
  },
  textArea: {
    width: '100%'
  },
  form : {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '85vw',
    },
    display : 'flex',
    flexDirection : 'column',
    justifyContent : 'center'
  }
}));

const VideoContent = (props) => {
  const classes = useStyles();
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('');
  const [user, setUser] = useState('')
  const handleChange = (e) => {
    setCategory(e.target.value)
  }
  const width = '400';

  const {videoData} = props;

  const submitClick = () => {
    const postBody = {
      ...videoData,
      category,
      description, 
      user
    }
    const {key, ...rest} = postBody;
    const db = firebase.database();
    const ref = db.ref('clips');
    ref
      .child(key)
      .update(rest)
      .then(props.clearContent)
  }

  if(videoData) {
    return (
      <Card className={classes.root} variant="outlined">
        <CardMedia
          className={classes.media}
          title="Game Video"
        >
          <iframe
            width={width} height="360" frameBorder="0"
            src="https://mega.nz/embed/sdMBVSaS#rEDMh8moE1KKtZu0Zv7YVdAFu3hCkVOwuN2RDKLDiLU!1a" allowFullScreen allow="play;" />
        </CardMedia>
        <CardContent>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              className={classes.textArea}
              id="outlined-basic" label="Outlined" variant="outlined"
              label="Description" multiline={true}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              id="outlined-select-category"
              select
              label="Category"
              value={category}
              onChange={handleChange}
              helperText="Please select your category"
              variant="outlined"
            >
              {CATEGORIES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-category"
              select
              label="User"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              helperText="Please select user"
              variant="outlined"
            >
              {USERS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" color="primary" onClick={submitClick}>Submit</Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return null;
}

export default VideoContent;