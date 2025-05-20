// js/login.js
import { auth, signInWithEmailAndPassword } from '../js/firebase.js';

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-container button');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');

    loginForm.addEventListener('click', async function(event) {
        event.preventDefault();
        if (!emailInput.value || !emailInput.value.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }
        if (!passwordInput.value || passwordInput.value.length < 6) {
            alert('Please enter a password with at least 6 characters.');
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
            window.location.href = 'html/index.html';
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    });
});