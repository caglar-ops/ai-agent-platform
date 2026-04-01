import fs from 'fs'
import path from 'path'

const emailsFile = path.join(process.cwd(), 'emails.json')

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  try {
    let emails = []
    if (fs.existsSync(emailsFile)) {
      const data = fs.readFileSync(emailsFile, 'utf-8')
      emails = JSON.parse(data || '[]')
    }

    if (emails.includes(email)) {
      return res.status(400).json({ error: 'Email already subscribed' })
    }

    emails.push(email)
    fs.writeFileSync(emailsFile, JSON.stringify(emails, null, 2))

    return res.status(200).json({ success: true, message: 'Successfully subscribed!' })
  } catch (error) {
    console.error('Error saving email:', error)
    return res.status(500).json({ error: 'Failed to save email' })
  }
}
