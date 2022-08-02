import pg from 'pg'

const pool = new pg.Pool({
    connectionString: 'postgres://postgres:2606@localhost:5432/project'
})

export async function findPassword(phone) {
    const phone_ = await pool.query(
        'SELECT password FROM password WHERE phone = $1', [phone]
    )

    await pool.query(`
        DELETE FROM "password" WHERE phone = $1
    `, [phone])

    return phone_.rows[0]
}