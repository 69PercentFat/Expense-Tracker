// Initialize an array to store expenses
let expenses = [];

// Function to add an expense
function addExpense() {
    const description = document.getElementById('expense-description').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (description && !isNaN(amount)) {
        const expense = {
            description,
            amount
        };

        expenses.push(expense);
        updateExpenseList();
        clearInputFields();
    } else {
        alert('Please enter a valid description and amount.');
    }
}

// Function to update the expense list
function updateExpenseList() {
    const expenseList = document.getElementById('expenses');
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${expense.description}:</strong> $${expense.amount.toFixed(2)} <button onclick="removeExpense(${index})">Delete</button>`;
        expenseList.appendChild(listItem);
    });
}

// Function to remove an expense
function removeExpense(index) {
    expenses.splice(index, 1);
    updateExpenseList();
}

// Function to clear input fields
function clearInputFields() {
    document.getElementById('expense-description').value = '';
    document.getElementById('expense-amount').value = '';
}
