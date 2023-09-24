let expenses = [];

// Function to add an expense
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
        updateSpendingChart();
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
        const formattedDate = expense.date.toLocaleDateString();
        listItem.innerHTML = `<strong>${expense.description}</strong> (₹${expense.amount.toFixed(2)}) on ${formattedDate} <button onclick="removeExpense(${index})">Delete</button>`;
        expenseList.appendChild(listItem);
    });
}

// Function to update the summary section
function updateSummary() {
    const totalSpending = expenses.reduce((total, expense) => total + expense.amount, 0);
    const averageDailySpending = totalSpending / expenses.length || 0;

    document.getElementById('total-spending').textContent = `₹${totalSpending.toFixed(2)}`;
    document.getElementById('average-daily-spending').textContent = `₹${averageDailySpending.toFixed(2)}`;
}

// Function to update the spending chart
function updateSpendingChart() {
    const labels = expenses.map(expense => expense.description);
    const data = expenses.map(expense => expense.amount);

    const ctx = document.getElementById('spending-chart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Spending',
                data,
                backgroundColor: 'rgba(0, 123, 255, 0.5)', // Blue color
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to remove an expense
function removeExpense(index) {
    expenses.splice(index, 1);
    updateExpenseList();
    updateSummary();
    updateSpendingChart();
}

// Function to clear input fields
function clearInputFields() {
    document.getElementById('expense-description').value = '';
    document.getElementById('expense-amount').value = '';
}

// Call the updateSpendingChart function initially to render the chart
updateSpendingChart();
