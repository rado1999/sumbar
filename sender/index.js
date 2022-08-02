import express from 'express'
import { sendMessage } from './message.js'
import { errorMessage } from './utils.js'
import { findPassword } from './db.js'
import { validatePhone } from './validation.js'

const app = express()
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )

    next()
})

app.post('/', async (req, res) => {
    const phone = req.body.phone
    const mess = validatePhone(phone)

    if (mess.length !== 0) return res.status(400).send(errorMessage(mess))

    const password = await findPassword(phone)
    if (!password) return res.status(404).send('Phone is not found')

    await sendMessage(phone, password.password)

    return res.sendStatus(200)
})

app.listen(3003, '192.168.31.202')
