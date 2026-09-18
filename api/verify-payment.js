import crypto from 'crypto'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Missing required payment fields' })
  }

  const body = razorpay_order_id + '|' + razorpay_payment_id
  const expected_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex')

  if (expected_signature === razorpay_signature) {
    return res.status(200).json({ verified: true, payment_id: razorpay_payment_id })
  }

  return res.status(400).json({ verified: false, error: 'Payment signature verification failed' })
}
