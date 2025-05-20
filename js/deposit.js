function copyAddress() {
    const address = document.getElementById("crypto-address").innerText;
    navigator.clipboard.writeText(address).then(() => {
        alert("Address copied to clipboard!");
    });
}

// Fetch and display the wallet address
// In a real application, you would replace this with an actual API call
// Mock API call (replace with real API in production)
function toggleCurrencies() {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
}

// Fetch wallet address from API (mocked for this example)
// In a real application, you would replace this with an actual API call
// Mock API call (replace with real API in production)
// This function simulates fetching a wallet address from an API
function fetchWalletAddress() {
    // Mock API call (replace with real API in production)
    document.getElementById('crypto-address').textContent = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
    // Example: fetch('/api/generate-wallet').then(res => res.json()).then(data => {...});
}
fetchWalletAddress();