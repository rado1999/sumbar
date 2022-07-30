import express from 'express'
import { validateConfirm, validatePhone } from './validation.js'
import {
    savePassword, confirmPassword, checkUser, deletePassword
} from './db.js'
import { sendMessage } from './message.js'
import { errorMessage } from './utils.js'

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

    const password = Math.random().toString().slice(2, 8)

    const result = await savePassword(phone, password)
    if (!result) return res.status(400).send(errorMessage(
        'This phone number is already used'
    ))

    // await sendMessage(phone, password)

    return res.status(201).send()
})

app.post('/resend', async (req, res) => {
    const phone = req.body.phone
    const mess = validatePhone(phone)

    if (mess.length !== 0) return res.status(400).send(errorMessage(mess))

    const password = Math.random().toString().slice(2, 8)

    await deletePassword(phone)

    const result = await savePassword(phone, password)
    if (!result) return res.status(400).send(errorMessage(
        'This phone number is already used'
    ))

    // await sendMessage(phone, password)

    return res.status(201).send()
})

app.post('/confirm', async (req, res) => {
    const { phone, password } = req.body
    const mess = validateConfirm(phone, password)
    if (mess.length !== 0) return res.status(400).send(errorMessage(mess))
    
    const result = await confirmPassword(phone, password)

    if (!result)
        return res.status(400).send(errorMessage('Invalid phone or password'))

    const result_ = await checkUser(phone)
    
    // if user doesn't exist, then registrate him
    if (!result_) return res.sendStatus(200)
    
    // else, just give him/her the tokens
    return res.status(201).send({ id: result_.id })
})

app.listen(3001, '95.85.127.250')
