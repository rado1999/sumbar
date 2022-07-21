import { exec } from 'child_process'
import { promisify } from 'util'

promisify(exec)

export async function sendMessage(phone, password) {
    await exec(
        'echo "2606" | sudo -S gammu -c ~/.gammurc ' +
        `sendsms TEXT +993${phone} -text "${password}"`
    )
}
