import React from 'react'
import {
  List, ListItem, ListItemText, makeStyles,
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { dType } from './store/actions'

const useStyles = makeStyles((theme) => ({
  list: {
    width: theme.drawerWidth,
  },
  listPad: {
    paddingTop: theme.baseShiftTop,
  },
}))

function DrawerContent() {
  const dtype = useSelector((state) => state.dtype)
  const classes = useStyles()
  return (
    <List className={clsx(classes.list, { [classes.listPad]: dtype !== dType.temporary })}>
      <ListItem>
        <ListItemText primary="Hello there, my fellow friend. How are you?" />
      </ListItem>
    </List>
  )
}

export default DrawerContent
