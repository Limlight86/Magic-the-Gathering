const {sanityUrl, sanityQuery} = require("./data/Sanity")
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
  const { term } = request.params
  const { data } = await axios.get(`https://api.scryfall.com/cards/search?order=name&q=${term}`)
  response.json(data.data)
})

app.get("/api/card/:id", async (request, response) => {
  const { id } = request.params
  const { data } = await axios.get(`https://api.scryfall.com/cards/${id}`)
  response.json(data)
})

// app.get("/api/sanityData", async (_request, response) => {
//   const { data } = await axios({ 
//     method: 'post', 
//     url: sanityUrl, 
//     data: {query: sanityQuery }
//   });
//   response.json(data)
// })

app.listen(PORT, () =>
  console.log(`Server is up and running at port ${PORT} 🚀`)
);