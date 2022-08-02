import express from 'express'

const app = express()
app.use(
    '/static',
    express.static(
        '/home/sumbar/front/build/static'
    )
)

app.get('*', (req, res) => {
    res.sendFile(
        '/home/sumbar/front/build/static/css/index.html'
    )
})

app.listen(3000)
