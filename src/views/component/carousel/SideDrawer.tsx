import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Accordion from '../carousel/Accordion'

const useStyles = makeStyles({

  list: {
    width: '780px',
    padding: '94px 40px 0 40px',
  },
  paper: {
    backgroundColor: 'rgba(29,34,39,0.60)'
  }

});

export default function SwipeableTemporaryDrawer(props) {

  const classes = useStyles();
  console.log(props);
  const list = () => (
    <div
      className={classes.list}
    // role="presentation"
    // onClick={() => props.onClick(false)}
    // onKeyDown={() => props.onClick(false)}
    >
      <Accordion />

    </div>
  );

  return (
    <div>
      {/* <React.Fragment key={anchor}>
        <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
      <Drawer
        classes={{ paper: classes.paper }}
        anchor={"right"}
        open={props.open}
        onClose={() => props.onClick(false)}>
        {list()}
      </Drawer>
      {/* </React.Fragment> */}
    </div>
  );
}
