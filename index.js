const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

const PORT = 3000;

app.post('/payBill', (req, res) => {
    const transaction = req.body; 

    
    console.log('Transaction received:', transaction);

    
    const filePath = path.join(__dirname, 'transactions.csv');

    try {
        const transactionData = `${JSON.stringify(transaction)}\n`;
        fs.appendFileSync(filePath, transactionData);  // Write the transaction to the CSV file
        console.log('Transaction added to CSV');
        res.json({ message: 'Payment request added and invoice generated', transaction });
    } catch (err) {
        console.error('Error writing to transactions.csv:', err);
        res.status(500).json({ error: 'Failed to process payment' });
    }
});


app.get('/getTransactions', (req, res) => {
    const { type, user, amount } = req.query;
    
   
    const filePath = path.join(__dirname, 'transactions.csv');
    let transactions = [];
    
    try {
        
        const data = fs.readFileSync(filePath, 'utf-8');
        transactions = data.split('\n').map(line => {
            return line.trim() ? JSON.parse(line) : null;
        }).filter(transaction => transaction);

        if (type) {
            transactions = transactions.filter(transaction => transaction.type === type);
        }
        if (user) {
            transactions = transactions.filter(transaction => transaction.user === user);
        }
        if (amount) {
            transactions = transactions.filter(transaction => transaction.amount == amount);
        }

        
        res.json(transactions);
    } catch (err) {
        console.error('Error reading transactions:', err);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



