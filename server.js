const axios = require("axios")
const express = require("express")
const cors = require('cors')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const PORT = process.env.PORT || 8080

app.get("/api/search/:term", async (request, response) => {
  let {data} = await axios.get(`https://api.scryfall.com/cards/search?order=name&q=${request.params.term}`)
  console.log(data.data)
  response.json(data.data)
})

app.listen(PORT, () =>
  console.log(`Server is up and running at port ${PORT} 🚀`)
);