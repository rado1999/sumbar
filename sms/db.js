import pg from 'pg'

const pool = new pg.Pool({
    connectionString: 'postgres://postgres:2606@localhost:5432/project'
})

export async function savePassword(phone, password) {
    const result = await pool.query(
        'SELECT * FROM password WHERE phone = $1', [phone]
    )

    if (result.rows[0]) return false

    await pool.query(
        'INSERT INTO password (phone, password) VALUES ($1, $2)',
        [phone, password]
    )
    
    return true
}

export async function deletePassword(phone) {
    await pool.query(
        'DELETE FROM password WHERE phone = $1',
        [phone]
    )
}

export async function confirmPassword(phone, pass) {
    const result = await pool.query(
        'SELECT * FROM password WHERE phone = $1', [phone]
    )

    if (!result.rows[0]) return false

    const { password } = result.rows[0]

    if (password !== pass) return false

    await pool.query(
        'DELETE FROM password WHERE phone = $1', [phone]
    )

    return true
}

// check is user registered or not
export async function checkUser(phone) {
    phone = '+993' + phone
    const result = await pool.query(
        'SELECT * FROM "user" "User" WHERE phone = $1', [phone]
    )

    if (!result.rows[0]) return false

    return result.rows[0]
}
