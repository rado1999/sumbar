export function validatePhone(phone) {
    if (!phone) return 'Phone must not be empty'
    else if (phone.length !== 8)
        return 'Invalid length of phone number'

    for (let i = 0; i < phone.length; i++) {
        if (isNaN(+phone[i]))
            return 'Phone number must contains only integer numbers'
    }

    const num = +phone.slice(0, 2)
    if (num < 61 || num > 65) return '61-65 not more or less'

    return ''
}

export function validateConfirm(phone, password) {
    const mess = validatePhone(phone)
    if (mess.length !== 0) return mess
    else if (!password) return 'Password must not be empty'
    else if (password.length < 6 || password.length > 6)
        return 'Password length must be 6'
    
    return ''
}
