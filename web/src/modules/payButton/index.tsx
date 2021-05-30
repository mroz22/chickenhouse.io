import React from 'react';

const html = `
<form method="POST"  onsubmit="onBTCPayFormSubmit(event);return false"  action="https://btcpay883288.lndyn.com/api/v1/invoices" class="btcpay-form btcpay-form--block">
  <input type="hidden" name="storeId" value="FFyf9JSGv4BqkGsWnWw6G5DtzqPWcTpBSWsAhhj3MB31" />
  <input type="hidden" name="jsonResponse" value="true" />
  <input type="hidden" name="checkoutDesc" value="Příspěvek na šťastné slepice" />
  <input type="hidden" name="serverIpn" value="https://us-central1-probable-bebop-176607.cloudfunctions.net/webhook" />
  <div class="btcpay-custom-container">
    <div class="btcpay-custom">
      <button class="plus-minus" onclick="event.preventDefault(); var price = parseInt(document.querySelector('#btcpay-input-price').value); if ('-' == '-' && (price - 1) < 1) { return; } document.querySelector('#btcpay-input-price').value = parseInt(document.querySelector('#btcpay-input-price').value) - 1;">-</button>
      <input id="btcpay-input-price" name="price" type="text" min="1" max="20" step="1" value="1" style="width: 3em;" oninput="event.preventDefault();isNaN(event.target.value) || event.target.value <= 0 ? document.querySelector('#btcpay-input-price').value = 1 : event.target.value"  />
      <button class="plus-minus" onclick="event.preventDefault(); var price = parseInt(document.querySelector('#btcpay-input-price').value); if ('+' == '-' && (price - 1) < 1) { return; } document.querySelector('#btcpay-input-price').value = parseInt(document.querySelector('#btcpay-input-price').value) + 1;">+</button>
    </div>
    <select name="currency">
      <option value="USD" selected>USD</option>
      <option value="GBP">GBP</option>
      <option value="EUR">EUR</option>
      <option value="BTC">BTC</option>
    </select>
  </div>
<button type="submit" class="submit" name="submit" style="min-width:209px; min-height:57px; border-radius: 4px;border-style: none;background-color: #0f3b21;" alt="Pay with BtcPay, Self-Hosted Bitcoin Payment Processor"><span style="color:#fff">Poslat</span>
<img src="https://btcpay883288.lndyn.com/img/logo.svg" style="height:57px;display:inline-block;padding: 5% 0 5% 5px;vertical-align: middle;">
</button></form>
`

export const PayButton = () => {
    return (
        <>
            <div dangerouslySetInnerHTML={{
                __html: html
            }} />

        </>
    )
}