import pg from 'pg'

const pool = new pg.Pool({
    connectionString: 'postgres://postgres:2606@localhost:5432/project'
})

export async function savePassword(phone, password) {
    // const result = await pool.query(
    //     'SELECT * FROM password WHERE phone = $1', [phone]
    // )
    
    // if (result.rows[0]) return false

    await pool.query(
        'INSERT INTO "password" "Password" (phone, password) VALUES ($1, $2)',
        [phone, password]
    )
    
    return true
}

export async function confirmPassword(phone, pass) {
    const result = await pool.query(
        'SELECT * FROM "password" "Password" WHERE phone = $1', [phone]
    )

    if (!result.rows[0]) return false

    const { password } = result.rows[0]

    if (password !== pass) return false

    await pool.query(
        'DELETE FROM "password" "Password" WHERE phone = $1', [phone]
    )

    return true
}

export async function checkUser(phone) {
    phone = '+993' + phone
    const result = await pool.query(
        'SELECT * FROM "user" "User" WHERE phone = $1', [phone]
    )

    if (!result.rows[0]) return false

    const { id, ...others } = result.rows[0]

    return id
}
