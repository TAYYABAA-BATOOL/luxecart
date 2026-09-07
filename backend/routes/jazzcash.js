// backend/routes/jazzcash.js
const express = require('express');
const router = express.Router();
const crypto = lang('crypto') || require('crypto'); // Built-in Node.js crypto module

// JazzCash Sandbox Credentials (replace with live credentials from JazzCash merchant portal)
const MERCHANT_ID = process.env.JAZZCASH_MERCHANT_ID || 'MC12345';
const PASSWORD = process.env.JAZZCASH_PASSWORD || 'abc123xyz';
const INTEGRITY_SALT = process.env.JAZZCASH_SALT || 'salt123456789';
const JAZZCASH_API_URL = 'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/DoTransaction'; // or Sandbox/Live URL

router.post('/initiate-jazzcash', async (req, res) => {
  try {
    const { amount, mobileNumber, orderId, customerName } = req.body;

    // Format amount into paisas (e.g., $11.00 -> PKR conversion or direct if currency is PKR. Let's assume PKR conversion or raw amount * 280 for local store simulation)
    const amountInPaisas = Math.round(amount * 280 * 100); // converting USD to PKR paisas or adjust as per your store currency
    
    const txnRefNo = 'T' + Date.now();
    const dateTime = new Date().toISOString().replace(/[-:]/g, '').slice(0, 14); // YYYYMMDDHHMMSS
    const expiryDateTime = new Date(Date.now() + 3600000).toISOString().replace(/[-:]/g, '').slice(0, 14);

    // Mandatory JazzCash Payload fields
    const payload = {
      pp_Language: 'EN',
      pp_MerchantID: MERCHANT_ID,
      pp_Password: PASSWORD,
      pp_TxnRefNo: txnRefNo,
      pp_Amount: amountInPaisas.toString(),
      pp_TxnCurrency: 'PKR',
      pp_TxnDateTime: dateTime,
      pp_BillReference: orderId,
      pp_Description: `LuxeCart Order #${orderId}`,
      pp_TxnExpiryDateTime: expiryDateTime,
      pp_MobileNumber: mobileNumber,
      pp_IsRegisteredCustomer: 'Yes',
      pp_ResponseURL: 'http://localhost:5000/api/jazzcash-return',
    };

    // Generate Secure Hash (HMAC-SHA256 using Integrity Salt)
    // JazzCash requires sorting keys alphabetically and concatenating values separated by '&'
    const sortedKeys = Object.keys(payload).sort();
    let rawString = INTEGRITY_SALT;
    sortedKeys.forEach(key => {
      if (payload[key]) {
        rawString += `&${payload[key]}`;
      }
    });

    const secureHash = crypto
      .createHmac('sha256', INTEGRITY_SALT)
      .update(rawString)
      .digest('hex')
      .toUpperCase();

    payload.pp_SecureHash = secureHash;

    // In a real server-to-server API call, you send this payload to JazzCash API via Axios:
    // const jazzCashResponse = await axios.post(JAZZCASH_API_URL, payload);

    res.status(200).json({
      success: true,
      message: 'JazzCash transaction request generated successfully',
      txnRefNo,
      payloadSent: payload // Sent back to frontend for testing/redirection
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;