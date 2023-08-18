const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

//routes
app.get('/', (req,res) => [
  res.send('Hello Node API')
])

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})