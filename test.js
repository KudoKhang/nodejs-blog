const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('LinkSharingHub')
})

app.listen(4000, () => {
    console.log('app running in port 4000')
})
