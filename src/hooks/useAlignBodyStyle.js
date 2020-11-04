import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { dType } from '../store/types'

const useStyles = makeStyles((theme) => ({
  contentOpen: {
    marginLeft: theme.drawerMaxWidth,
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  contentOpenNoTrans: {
    marginLeft: theme.drawerMaxWidth,
  },
}))

function useAlignBodyStyle() {
  const classes = useStyles()
  const dtype = useSelector((state) => state.dtype)
  const dopen = useSelector((state) => state.dopen || false)
  const [style, setStyle] = useState(clsx(
    {
      [classes.contentOpen]: dopen && dtype !== dType.temporary,
      [classes.contentOpenNoTrans]: dtype === dType.permanent,
    },
  ))
  useEffect(() => {
    setStyle(clsx(classes.content,
      {
        [classes.contentOpen]: dopen && dtype !== dType.temporary,
        [classes.contentOpenNoTrans]: dtype === dType.permanent,
      }))
  }, [dtype, dopen, classes])
  return style
}

export default useAlignBodyStyle
