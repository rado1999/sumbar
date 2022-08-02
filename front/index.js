import express from 'express'

const app = express()
app.use(
    '/',
    express.static(
        ''
    )
)

app.get('/', (req, res) => res.sendFile(
    
))

app.listen(3000)
