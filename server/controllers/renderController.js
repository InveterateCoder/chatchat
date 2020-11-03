const path = require('path')

function renderController(req, res) {
  if (req.url !== '/') {
    res.redirect('/')
    return
  }
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
}

module.exports = renderController
