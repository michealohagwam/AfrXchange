// Handle settings form interactions
document.addEventListener('DOMContentLoaded', function() {
    const saveButtons = document.querySelectorAll('.btn-save');
    const deleteButton = document.querySelector('.btn-delete');
    const phoneInput = document.querySelector('input[type="tel"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const languageSelect = document.querySelector('select:nth-of-type(1)');
    const currencySelect = document.querySelector('select:nth-of-type(2)');

    // Handle save button clicks
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Validate phone number
            if (phoneInput.value && !/^\+?\d{10,15}$/.test(phoneInput.value)) {
                alert('Please enter a valid phone number (10-15 digits).');
                return;
            }

            // Validate password
            if (passwordInput.value && passwordInput.value.length < 8) {
                alert('Password must be at least 8 characters long.');
                return;
            }

            // Simulate saving settings
            alert('Settings saved successfully!');
            console.log('Language:', languageSelect.value);
            console.log('Currency:', currencySelect.value);
            // Example: Send to API
            // fetch('/api/settings', { method: 'POST', body: JSON.stringify({ language: languageSelect.value, currency: currencySelect.value }) });
        });
    });

    // Handle delete account button
    deleteButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            alert('Account deletion initiated.');
            // Example: Redirect or call API
            // window.location.href = 'landing.html';
        }
    });
});

// Replace the delete account redirect comment
// window.location.href = 'landing.html';
// with
// window.location.href = 'html/landing.html';