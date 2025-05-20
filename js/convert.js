function toggleCurrencies() {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
}

// js/convert.test.js
import { toggleCurrencies } from './convert.js';

test('toggles currencies correctly', () => {
    document.body.innerHTML = `
        <select id="from-currency"><option value="USDT">USDT</option></select>
        <select id="to-currency"><option value="NGN">NGN</option></select>
    `;
    toggleCurrencies();
    expect(document.getElementById('from-currency').value).toBe('NGN');
    expect(document.getElementById('to-currency').value).toBe('USDT');
});