import express from 'express';

const app = express()

const PORT = 3000;





app.get('/conversation', (req, res) => {
  res.send('Hello World!')
})




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})