const path = require('path')

function renderController(req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
}

module.exports = renderController
