import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { connect } from 'react-redux'
import Main from './Main.jsx'
import getTheme from './theme'

const mapStateToProps = ({ dark }) => ({
  theme: getTheme(dark),
})

function App({ theme }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Main />
    </ThemeProvider>
  )
}

App.propTypes = {
  theme: PropTypes.isRequired,
}

export default connect(mapStateToProps)(App)
