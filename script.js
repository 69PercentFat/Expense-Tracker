let expenses = [];

function addExpense() {
    const description = document.getElementById('expense-description').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const date = new Date();

    if (description && !isNaN(amount)) {
        const expense = {
            description,
            amount,
            date
        };

        expenses.push(expense);
        updateExpenseList();
        updateSummary();
        clearInputFields();
    } else {
        alert('Please enter a valid description and amount.');
    }
}

function updateExpenseList() {
    const expenseList = document.getElementById('expenses');
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const listItem = document.createElement('li');
        const formattedDate = expense.date.toLocaleDateString();
        listItem.innerHTML = `<strong>${expense.description}</strong> ($${expense.amount.toFixed(2)}) on ${formattedDate} <button onclick="removeExpense(${index})">Delete</button>`;
        expenseList.appendChild(listItem);
    });
}

function updateSummary() {
    const totalSpending = expenses.reduce((total, expense) => total + expense.amount, 0);
    const averageDailySpending = totalSpending / expenses.length || 0;

    document.getElementById('total-spending').textContent = `$${totalSpending.toFixed(2)}`;
    document.getElementById('average-daily-spending').textContent = `$${averageDailySpending.toFixed(2)}`;
}

function removeExpense(index) {
    expenses.splice(index, 1);
    updateExpenseList();
    updateSummary();
}

function clearInputFields() {
    document.getElementById('expense-description').value = '';
    document.getElementById('expense-amount').value = '';
}

updateSummary();
