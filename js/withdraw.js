const withdrawalMethod = document.getElementById('withdrawalMethod');
const additionalFields = document.getElementById('additionalFields');

withdrawalMethod.addEventListener('change', function() {
    additionalFields.innerHTML = '';

    if (this.value === 'bank') {
        additionalFields.innerHTML = `
            <input type="text" id="bankName" placeholder="Enter Bank Name" required>
            <input type="text" id="accountNumber" placeholder="Enter Account Number/IBAN" required>
            <input type="text" id="swiftCode" placeholder="Enter Swift Code" required>
            <input type="text" id="description" placeholder="Note">
        `;
    } else if (this.value === 'usdt') {
        additionalFields.innerHTML = `
            <input type="text" id="walletAddress" placeholder="Enter crypto wallet address" required>
        `;
    } else if (this.value === 'btc') {
        additionalFields.innerHTML = `
            <input type="text" id="walletAddress" placeholder="Enter crypto wallet address" required>
        `;
    }
});

// Handle form submission
document.getElementById('withdrawForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Withdrawal initiated!');
});