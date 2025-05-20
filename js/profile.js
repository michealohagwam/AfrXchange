// js/profile.js
import DOMPurify from 'dompurify';
const sanitizedBio = DOMPurify.sanitize(bioInput.value);

// js/profile.js
import { auth, db, doc, setDoc, getDoc } from '../js/firebase.js';

document.addEventListener('DOMContentLoaded', async function() {
    const profilePicInput = document.getElementById('profile-pic-upload');
    const profilePicture = document.getElementById('profile-picture');
    const profileImgHeader = document.getElementById('profile-img');
    const phoneInput = document.getElementById('phone-number');
    const bioInput = document.getElementById('bio');
    const saveButton = document.querySelector('.btn-save');

    // Load existing profile data
    const user = auth.currentUser;
    if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            phoneInput.value = userDoc.data().phone || '';
            bioInput.value = userDoc.data().bio || '';
        }
    }

    profilePicInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePicture.src = e.target.result;
                profileImgHeader.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a valid image file.');
        }
    });

    saveButton.addEventListener('click', async function() {
        if (phoneInput.value && !/^\+?\d{10,15}$/.test(phoneInput.value)) {
            alert('Please enter a valid phone number (10-15 digits).');
            return;
        }
        if (bioInput.value.length > 200) {
            alert('Bio must be 200 characters or less.');
            return;
        }
        if (user) {
            await setDoc(doc(db, 'users', user.uid), {
                phone: phoneInput.value,
                bio: bioInput.value,
                updatedAt: new Date()
            }, { merge: true });
            alert('Profile updated successfully!');
        } else {
            alert('You must be logged in to update your profile.');
        }
    });
});