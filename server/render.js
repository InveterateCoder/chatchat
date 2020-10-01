const path = require('path')

function render(req, res) {
  return res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
}

module.exports = render
