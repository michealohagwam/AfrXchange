// js/signup.js
import { sendEmailVerification } from 'firebase/auth';
await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
await sendEmailVerification(auth.currentUser);

// js/signup.js
import { auth, createUserWithEmailAndPassword } from '../js/firebase.js';
import { db, doc, setDoc } from '../js/firebase.js';

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.querySelector('.signup-container button');
    const nameInput = document.querySelector('input[type="text"]');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]:nth-of-type(1)');
    const confirmPasswordInput = document.querySelector('input[type="password"]:nth-of-type(2)');
    const termsCheckbox = document.querySelector('.terms input[type="checkbox"]');

    signupForm.addEventListener('click', async function(event) {
        event.preventDefault();
        if (!nameInput.value || nameInput.value.length < 2) {
            alert('Please enter a valid full name.');
            return;
        }
        if (!emailInput.value || !emailInput.value.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }
        if (!passwordInput.value || passwordInput.value.length < 6) {
            alert('Password must be at least 6 characters.');
            return;
        }
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert('Passwords do not match.');
            return;
        }
        if (!termsCheckbox.checked) {
            alert('You must agree to the Terms & Conditions.');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                fullName: nameInput.value,
                email: emailInput.value,
                createdAt: new Date()
            });
            window.location.href = 'html/index.html';
        } catch (error) {
            alert('Signup failed: ' + error.message);
        }
    });
});