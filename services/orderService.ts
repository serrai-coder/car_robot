import { OrderData } from '../components/OrderForm';

// IMPORTANT: Replace this URL with your actual Google Apps Script Web App deployment URL.
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwPHBAw-RuSEv57VEG9Bxmg38OgPfiTsnfcmpKoJLDFzF0dmzmC6f_D773XqiDTi4-T/exec';

/**
 * Submits order data to a Google Sheet via a Google Apps Script Web App.
 * @param orderData The order data to submit.
 */
export const submitOrder = async (orderData: OrderData): Promise<void> => {
  // Add a timestamp for better record-keeping in the Google Sheet.
  const dataWithTimestamp = {
    ...orderData,
    timestamp: new Date().toLocaleString('en-US', { timeZone: 'Africa/Algiers' }),
  };

  const response = await fetch(WEB_APP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify(dataWithTimestamp),
    redirect: 'follow', // Explicitly follow redirects
  });

  if (!response.ok) {
    // If the server responds with an error status, throw an error.
    const errorText = await response.text();
    console.error('Google Sheets API Error:', errorText);
    throw new Error(`Failed to submit order. Status: ${response.status}`);
  }
  
  // We don't need to return anything if successful.
};