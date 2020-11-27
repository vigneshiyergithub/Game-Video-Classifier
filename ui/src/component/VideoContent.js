import React, { useState } from 'react';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { TextField, MenuItem, Typography, Slider, Chip, Select, InputLabel, Input } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import { CATEGORIES, TAGS } from './constants';
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
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '85vw',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  typography: {
    margin: theme.spacing(1),
    width: '85vw',
  },
  slider: {
    margin: theme.spacing(1),
    width: '85vw'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  select : {
    marginBottom: theme.spacing(2)
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(tag, tags, theme) {
  return {
    fontWeight:
      tags.indexOf(tag) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const VideoContent = (props) => {
  const classes = useStyles();
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [tags, setTags]= useState([])

  const theme = useTheme();
  const handleChange = (e) => {
    setCategory(e.target.value)
  }
  const width = '400';

  const { videoData } = props;

  const submitClick = () => {
    const postBody = {
      ...videoData,
      modifiedBy: [...new Set([...videoData.modifiedBy, props.user])],
      category,
      description,
      user: props.user,
      rating,
      tags
    }
    const { key, ...rest } = postBody;
    const db = firebase.database();
    const ref = db.ref('clips');
    ref
      .child(key)
      .update(rest)
      .then(props.clearContent)
  }

  const handleChangeMultiple = (event) => {
    const { value } = event.target;
    setTags(value);
  };

  if (videoData) {

    return (
      <Card className={classes.root} variant="outlined">
        <CardMedia
          className={classes.media}
          title="Game Video"
        >
          <iframe title="Game Video"
            width={width} height="360" frameBorder="0"
            src={videoData.url} allowFullScreen allow="play;" />
        </CardMedia>
        <CardContent>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              className={classes.textArea}
              id="outlined-basic" variant="outlined"
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
            <Typography id="discrete-slider" gutterBottom className={classes.typography}>
              Rating
            </Typography>
            <Slider
              className={classes.slider}
              defaultValue={0}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={10}
              value={rating}
              onChange={(e, value) => setRating(value)}
            />
            <InputLabel id="demo-mutiple-chip-label">Tags</InputLabel>
            <Select
              className={classes.select}
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={tags}
              onChange={handleChangeMultiple}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {TAGS.map((tag) => (
                <MenuItem key={tag} value={tag} style={getStyles(tag, tags, theme)}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
            <Button variant="contained" color="primary" onClick={submitClick}>Submit</Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return null;
}

export default VideoContent;