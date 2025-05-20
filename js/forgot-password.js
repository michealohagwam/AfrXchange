// js/forgot-password.js
import { auth, sendPasswordResetEmail } from '../js/firebase.js';

document.addEventListener('DOMContentLoaded', function() {
    const resetButton = document.querySelector('.forgot-password-container button');
    const emailInput = document.querySelector('input[type="email"]');

    resetButton.addEventListener('click', async function(event) {
        event.preventDefault();
        if (!emailInput.value || !emailInput.value.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, emailInput.value);
            alert('Password reset link sent to your email.');
            window.location.href = 'html/login.html';
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
});