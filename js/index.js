// Simulating no transactions for now
var transactionsExist = false;

if (!transactionsExist) {
    document.getElementById("transaction-list").style.display = "none";
    document.getElementById("empty-message").style.display = "block";
} else {
    document.getElementById("empty-message").style.display = "none";
    document.getElementById("transaction-list").style.display = "block";
    // Add transaction items dynamically here
}

// Toggle balance visibility
const toggleBalance = document.getElementById('toggle-balance');
const balanceAmount = document.getElementById('balance-amount');
let isBalanceVisible = true;

toggleBalance.addEventListener('click', function() {
    if (isBalanceVisible) {
        balanceAmount.textContent = '******* USDT';
        toggleBalance.classList.remove('fa-eye');
        toggleBalance.classList.add('fa-eye-slash');
    } else {
        balanceAmount.textContent = '6000.75.56 USDT';
        toggleBalance.classList.remove('fa-eye-slash');
        toggleBalance.classList.add('fa-eye');
    }
    isBalanceVisible = !isBalanceVisible;
});

// Generate unique 10-digit account number
function generateUniqueAccountNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000);
}

document.getElementById('account-number').textContent = generateUniqueAccountNumber();

// Update the date and time in the exchange rate section
function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString('en-US', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
    });
    document.querySelector('.exchange-rate p:first-child').textContent = `USDT to Naira   ${dateTimeString}`;
}

// Call updateDateTime immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);

// Toggle notification dropdown visibility
const notificationIcon = document.getElementById('notification-icon');
const notificationDropdown = document.getElementById('notification-dropdown');
const notificationCount = document.getElementById('notification-count');
let unreadCount = 3;

notificationIcon.addEventListener('click', function () {
    notificationDropdown.style.display = notificationDropdown.style.display === 'block' ? 'none' : 'block';
});

// Mark notifications as read and reduce unread count
const notificationItems = document.querySelectorAll('.notification-item.unread');

notificationItems.forEach(item => {
    item.addEventListener('click', function () {
        item.classList.remove('unread');
        const dot = item.querySelector('.red-dot');
        if (dot) dot.style.display = 'none';
        unreadCount--;
        if (unreadCount <= 0) {
            notificationCount.style.display = 'none';
        } else {
            notificationCount.textContent = unreadCount;
        }
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    if (!notificationIcon.contains(event.target) && !notificationDropdown.contains(event.target)) {
        notificationDropdown.style.display = 'none';
    }
});

// Fetch and update the exchange rate
// This function fetches the exchange rate from an API and updates the UI
function updateExchangeRate() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=ngn')
        .then(response => response.json())
        .then(data => {
            const rate = data.tether.ngn;
            document.querySelector('.exchange-rate .rate').textContent = `1 USDT = ₦${rate}`;
        })
        .catch(error => console.error('Error fetching rate:', error));
}
updateExchangeRate();
setInterval(updateExchangeRate, 60000); // Update every minute