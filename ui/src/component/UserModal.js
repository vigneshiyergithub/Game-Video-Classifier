import React from 'react';
import { TextField, Dialog , DialogTitle, DialogContent, MenuItem} from '@material-ui/core';
import {USERS} from './constants';

const UserModal = (props) => {
    return <Dialog onClose={() => props.setOpen(!props.open)} aria-labelledby="simple-dialog-title" open={props.open}>
    <DialogTitle id="simple-dialog-title">Who are thou ?</DialogTitle>
    <DialogContent>
        <TextField
              id="outlined-select-category"
              select
              label="User"
              value={props.user}
              onChange={(e) => {
                  props.setUser(e.target.value);
                  props.setOpen(!props.open)
                }
              }
              helperText="Please select user"
              variant="outlined"
            >
              {USERS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
    </DialogContent>
  </Dialog>
}

export default UserModal;