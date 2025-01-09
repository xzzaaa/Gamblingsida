document.addEventListener("DOMContentLoaded", () => {
    const symbols = ["🍒", "7", "🍊", "🍉", "🍇", "🍓"];
    let balance = 100; 

    const spinBtn = document.getElementById("spin-btn");
    const addbalanceBtn = document.getElementById("addbalance-btn")
    const resultDiv = document.getElementById("result");
    const balanceDiv = document.getElementById("balance");
    const reels = document.querySelectorAll(".reel");
    const inputAmount = document.getElementById("add-amount");

    function spinReels() {
        const randomSymbols = [];
        for (let i = 0; i < reels.length; i++) {
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            randomSymbols.push(randomSymbol);
            reels[i].textContent = randomSymbol; 
        }
        return randomSymbols;
    }

    function checkWin(reelsSymbols) {
        if (new Set(reelsSymbols).size === 1) {
            resultDiv.textContent = "You Win!";
            balance += 10000;  
        } else {
            resultDiv.textContent = "Try Again!";
            balance -= 5; 
        }

        balanceDiv.textContent = `Balance: $${balance}`;
    }

    addbalanceBtn.addEventListener("click", () => {
        const amount = parseFloat(inputAmount.value); 
        

        if (!isNaN(amount) && amount > 0) {
            balance += amount; 
            balanceDiv.textContent = `Balance: $${balance}`; 
            inputAmount.value = "";  
        } else {
            resultDiv.textContent = "Please enter a valid amount to add.";
        }
    });
    spinBtn.addEventListener("click", () => {
        const reelsSymbols = spinReels();
        checkWin(reelsSymbols);
    });
});
