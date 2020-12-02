import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {TextField, MenuItem, Button} from '@material-ui/core'
import { extractData } from './commons';
import {getOption} from './constants';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    content : {
      display: 'flex',
      flexDirection : 'column',
    }
  }));


 

const FilterContent = (props) => {
    const classes = useStyles();
    const [streamer,setStreamer] = useState('');
    const [expand, setExpand] = useState(true)
    const {data} = props;
    let streamers = [];
    let dataList = [];
    if(data) {
      dataList = extractData(data)
      const streamerList = [...new Set(dataList.map(item => item.streamer))];
      streamers = streamerList.map(item => getOption(item, item));
      console.log(streamers)
    }

    const buttonClick = (e) => {
        const videoData = dataList.find(item => {
            return item.streamer === streamer
        });
        props.setVideoData(videoData);
        setExpand(false)
    }

    

    return <div className={classes.root}>
        <Accordion expanded={expand} onChange={() => setExpand(!expand)} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Query Filters</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.content}>
          <TextField
              id="outlined-select-category"
              select
              label="Streamer"
              value={streamer}
              onChange={(e) => setStreamer(e.target.value)}
              helperText="Please select your category"
              variant="outlined"
            >
              {streamers.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" color="primary" onClick={buttonClick}>Hit It</Button>
        </AccordionDetails>
      </Accordion>
    </div>
}

export default FilterContent;