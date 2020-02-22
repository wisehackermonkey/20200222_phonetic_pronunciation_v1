import express from 'express'
const app = express()
const PORT = 3000
console.log("Server Started: " + PORT)
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))