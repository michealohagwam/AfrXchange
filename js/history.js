// js/history.js
import { onSnapshot } from 'firebase/firestore';
import { db, collection, getDocs } from '../js/firebase.js';

document.addEventListener('DOMContentLoaded', function() {
    const transactionList = document.getElementById('transaction-list');
    const emptyMessage = document.getElementById('empty-message');
    const tabs = document.querySelectorAll('.transaction-tabs a');

    onSnapshot(collection(db, 'transactions'), (snapshot) => {
        const transactions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderTransactions();
    });

    // Sample transaction data (replace with API call in production)
    const transactions = [
        { id: 1, type: 'deposit', amount: '0.05 BTC', date: '10 Sep 2024, 21:00', status: 'Completed', color: 'green' },
        { id: 2, type: 'transfer', amount: '100 USDT', date: '11 Sep 2024, 09:00', status: 'Pending', color: 'blue' },
        { id: 3, type: 'withdrawal', amount: '500 NGN', date: '12 Sep 2024, 10:30', status: 'Failed', color: 'red' },
        { id: 4, type: 'converted', amount: '1 ETH to NGN', date: '13 Sep 2024, 14:00', status: 'Completed', color: 'green' }
    ];

    // Function to render transactions
    function renderTransactions(filter = 'all') {
        transactionList.innerHTML = '';
        const filteredTransactions = filter === 'all' 
            ? transactions 
            : transactions.filter(t => t.type === filter);

        if (filteredTransactions.length === 0) {
            emptyMessage.style.display = 'block';
            transactionList.style.display = 'none';
            return;
        }

        emptyMessage.style.display = 'none';
        transactionList.style.display = 'block';

        filteredTransactions.forEach(transaction => {
            const item = document.createElement('div');
            item.className = `transaction-item ${transaction.color}`;
            item.innerHTML = `
                <span>${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}: ${transaction.amount}</span>
                <span>${transaction.date} - ${transaction.status}</span>
            `;
            transactionList.appendChild(item);
        });
    }

    // Initial render
    renderTransactions();

    // Handle tab clicks
    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            renderTransactions(this.dataset.filter);
    });
});
// (imports moved to top, this duplicate import block is removed)

document.addEventListener('DOMContentLoaded', async function() {
    const transactionList = document.getElementById('transaction-list');
    const emptyMessage = document.getElementById('empty-message');
    const tabs = document.querySelectorAll('.transaction-tabs a');

    async function fetchTransactions() {
        const querySnapshot = await getDocs(collection(db, 'transactions'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    function renderTransactions(filter = 'all') {
        fetchTransactions().then(transactions => {
            transactionList.innerHTML = '';
            const filteredTransactions = filter === 'all' 
                ? transactions 
                : transactions.filter(t => t.type === filter);

            if (filteredTransactions.length === 0) {
                emptyMessage.style.display = 'block';
                transactionList.style.display = 'none';
                return;
            }

            emptyMessage.style.display = 'none';
            transactionList.style.display = 'block';

            filteredTransactions.forEach(transaction => {
                const item = document.createElement('div');
                item.className = `transaction-item ${transaction.color}`;
                item.innerHTML = `
                    <span>${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}: ${transaction.amount}</span>
                    <span>${transaction.date} - ${transaction.status}</span>
                `;
                transactionList.appendChild(item);
            });
        });
    }

    renderTransactions();
    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            renderTransactions(this.dataset.filter);
        });
    });
    });
});