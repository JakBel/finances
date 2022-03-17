const qs = (e) => document.querySelector(e);

const incomeSection = qs(".income-area");
const expensesSection = qs(".expenses-area");
const availableMoney = qs(".available-money");
const addTransactionPanel = qs(".add-transaction-panel");

const nameInput = qs("#name");
const amountInput = qs("#amount");
const categorySelect = qs("#category");

const addTransactionBtn = qs(".add-transaction");
const saveBtn = qs(".save");
const cancelBtn = qs(".cancel");
const deleteBtn = qs(".delete");
const deleteAllBtn = qs(".delete-all");

const lightBtn = qs(".light");
const darkBtn = qs(".dark");

//global variables
let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];

//function
const showPanel = () => {
    addTransactionPanel.style.display = "flex";
};

const closePanel = () => {
    addTransactionPanel.style.display = "none";
    clearInputs();
};

const checkForm = () => {
    if (
        nameInput.value !== "" &&
        amountInput.value !== "" &&
        categorySelect.value !== "none"
    ) {
        createNewTransaction();
    } else {
        alert("Wypełnij wszystkie pola!");
    }
};

const clearInputs = () => {
    nameInput.value = "";
    amountInput.value = "";
    categorySelect.selectedIndex = 0;
};

const createNewTransaction = () => {
    const newTransaction = document.createElement("div");
    newTransaction.classList.add("transaction");
    newTransaction.setAttribute("id", ID);

    checkCategory(selectedCategory);

    
    newTransaction.innerHTML = `
    <p class="transaction-name">
    ${categoryIcon} ${nameInput.value}
    </p>
    <p class="transaction-amount">
    ${parseFloat(amountInput.value).toFixed(2)}zł
    <button class="delete" onclick="deleteTransaction(${ID})">
    <i class="fas fa-times"></i>
    </button>
    </p>
    `;

    if(amountInput.value > 0) {
        incomeSection.append(newTransaction)
        newTransaction.classList.add("income")
    } else {
        expensesSection.append(newTransaction)
        newTransaction.classList.add("expense")
    }
    
    moneyArr.push(parseFloat(amountInput.value));
    countMoney(moneyArr);

    closePanel();
    ID++;
    clearInputs();
};

const selectCategory = () => {
    selectedCategory =
        categorySelect.options[categorySelect.selectedIndex].text;
};

const checkCategory = (transaction) => {
    switch (transaction) {
        case "Przychód":
            categoryIcon = '<i class="fas fa-money-bill-wave"></i>';
            break;
        case "Dotacja":
            categoryIcon = '<i class="fa-solid fa-coins"></i>';
            break;
        case "Oszczędności":
            categoryIcon = '<i class="fa-solid fa-piggy-bank"></i>';
            break;
        case "Wydatek":
            categoryIcon = '<i class="fa-solid fa-sack-dollar"></i>';
            break;
        case "Zakupy":
            categoryIcon = '<i class="fas fa-cart-arrow-down"></i>';
            break;
        case "Jedzenie":
            categoryIcon = '<i class="fas fa-hamburger"></i>';
            break;
        case "Kino":
            categoryIcon = '<i class="fas fa-film"></i>';
            break;
        case "Podatki":
            categoryIcon = '<i class="fa-solid fa-credit-card"></i>';
            break;
        case "Wakacje":
            categoryIcon = '<i class="fa-solid fa-plane"></i>';
            break;
        case "Prezent":
            categoryIcon = '<i class="fa-solid fa-gift"></i>';
            break;
    }
};

const countMoney = (money) => {
    const newMoney = money.reduce((a, b) => a + b);
    availableMoney.textContent = `${newMoney.toFixed(2)}zł`;
};

const deleteTransaction = (id) => {
    const transactionToDelete = document.getElementById(id);
    const transactionAmount = parseFloat(
        transactionToDelete.childNodes[3].innerText
    );
    const indexOfTransaction = moneyArr.indexOf(transactionAmount);

    moneyArr.splice(indexOfTransaction, 1);

    transactionToDelete.classList.contains("income")
        ? incomeSection.removeChild(transactionToDelete)
        : expensesSection.removeChild(transactionToDelete);

    countMoney(moneyArr);
};

const deleteAllTransactions = () => {
    incomeSection.innerHTML = "<h3>Przychód:</h3>";
    expensesSection.innerHTML = "<h3>Wydatki:</h3>";
    availableMoney.textContent = "0zł";
    moneyArr = [0];
};

const changeStyleToLight = () => {
    root.style.setProperty("--first-color", "#F9F9F9");
    root.style.setProperty("--second-color", "#14161F");
    root.style.setProperty("--border-color", "rgba(0, 0, 0, 0.2)");
};
const changeStyleToDark = () => {
    root.style.setProperty("--second-color", "#F9F9F9");
    root.style.setProperty("--first-color", "#14161F");
    root.style.setProperty("--border-color", "rgba(255, 255, 255, 0.4)");
};

//addEventListener
addTransactionBtn.addEventListener("click", showPanel);
cancelBtn.addEventListener("click", closePanel);
saveBtn.addEventListener("click", checkForm);
deleteAllBtn.addEventListener("click", deleteAllTransactions);
lightBtn.addEventListener("click", changeStyleToLight);
darkBtn.addEventListener("click", changeStyleToDark);
