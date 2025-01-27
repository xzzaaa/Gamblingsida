document.addEventListener("DOMContentLoaded", () => {

    const spinBtn = document.getElementById("spin-btn");
    const addbalanceBtn = document.getElementById("addbalance-btn")
    const resultDiv = document.getElementById("result");
    const balanceDiv = document.getElementById("funds");
    const reels = document.querySelectorAll(".reel");
    const inputAmount = document.getElementById("add-amount");
    var fruit = [];
    
    const symbols = ["🍒", "7", "🍊", "🍉", "🍇", "🍓"];
    let balance = 100; 

    

    var buttonsContainer = document.createElement('div')
    document.body.appendChild(buttonsContainer);

    var slotdiv = document.createElement("div");
    slotdiv.id = "slot-machine";
    document.body.appendChild(slotdiv);

    var slideDiv1 = document.createElement("div");
    slideDiv1.id = "reel1";
    slideDiv1.classList = "reel";
    slotdiv.appendChild(slideDiv1);

    var fruitContainer1 = document.createElement("div");
    slideDiv1.appendChild(fruitContainer1);

    var slideDiv2 = document.createElement("div");
    slideDiv2.id = "reel2";
    slideDiv2.classList = "reel";
    slotdiv.appendChild(slideDiv2);

    var fruitContainer2 = document.createElement("div");
    slideDiv2.appendChild(fruitContainer2);

    var slideDiv3 = document.createElement("div");
    slideDiv3.id = "reel3";
    slideDiv3.classList = "reel";
    slotdiv.appendChild(slideDiv3);
    
    var fruitContainer3 = document.createElement("div");
    slideDiv3.appendChild(fruitContainer3);

    var startButton = document.createElement("button");
    startButton.id = "spin-btn";
    startButton.innerHTML = "Spin";
    buttonsContainer.appendChild(startButton)
    slotdiv.appendChild(startButton);

    const addAmount = document.createElement('input');
    addAmount.type = 'number';
    addAmount.id = 'add-amount';
    addAmount.placeholder = 'Enter amount';
    buttonsContainer.appendChild(addAmount);

    const addBalanceBtn = document.createElement('button');
    addBalanceBtn.id = 'addbalance-btn';
    addBalanceBtn.textContent = 'Add Balance';
    buttonsContainer.appendChild(addBalanceBtn);

    const balanceDisplay = document.getElementById('funds');
    balanceDisplay.innerHTML=user.cash;
    document.body.appendChild(balanceDisplay);



    
    
    async function updateBalanceInDatabase(newBalance) {
        try {
            const response = await fetch('/api/update-balance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newBalance })
            });
    
            const result = await response.json();
            if (result.success) {
                console.log('Balance updated successfully');
            } else {
                console.error('Failed to update balance:', result.error);
            }
        } catch (error) {
            console.error('Error updating balance:', error);
        }
    }
    
    function checkWin(reelsSymbols) {
        if (fruit[0] == fruit[1] && fruit[0] == fruit[2] && fruit[1] == fruit[2]) {
            resultDiv.textContent = "You Win!";
            balance += 10000;  
        } else {
            resultDiv.innerHTML = "Try Again!";
            balance -= 5; 
        }
    
        balanceDiv.textContent = `Balance: $${balance}`;
    
        // Update balance in the database
        updateBalanceInDatabase(balance);
    }
    

    function spinReels() {
        const randomSymbols = [];
        for (let i = 0; i < reels.length; i++) {
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            randomSymbols.push(randomSymbol);
            reels[i].textContent = randomSymbol; 
        }
        return randomSymbols;
    }


    addBalanceBtn.addEventListener("click", () => {
        const amount = parseFloat(inputAmount.value); 
        

        if (!isNaN(amount) && amount > 0) {
            balance += amount; 
            balanceDiv.textContent = `Balance: $${balance}`; 
            inputAmount.value = "";  
        } else {
            resultDiv.textContent = "Please enter a valid amount to add.";
        }
    });
    startButton.addEventListener("click", () => {
        fruit = [];
        fruitContainer1.innerHTML = "";
        fruitContainer2.innerHTML = "";
        fruitContainer3.innerHTML = "";
        for (var i = 0; i < 7; i++) {
            var ranNum = Math.floor(Math.random()*6);
            var slideDiv = document.createElement("div");
            slideDiv.innerHTML = symbols[ranNum];
            slideDiv.classList = "extraSlide";
            fruitContainer1.appendChild(slideDiv)
            if (i == 0) {
                slideDiv.id = "div1"
            }
            if (i == 6) {
                fruit.push(ranNum);
            }
        }
        for (var i = 0; i < 7; i++) {
            var ranNum = Math.floor(Math.random()*6);
            var slideDiv = document.createElement("div");
            slideDiv.innerHTML = symbols[ranNum];
            slideDiv.classList = "extraSlide";
            fruitContainer2.appendChild(slideDiv)
            if (i == 0) {
                slideDiv.id = "div2"
            }
            if (i == 6) {
                fruit.push(ranNum);
            }
        }
        for (var i = 0; i < 7; i++) {
            var ranNum = Math.floor(Math.random()*6);
            var slideDiv = document.createElement("div");
            slideDiv.innerHTML = symbols[ranNum];
            slideDiv.classList = "extraSlide";
            fruitContainer3.appendChild(slideDiv)
            if (i == 0) {
                slideDiv.id = "div3"
            }
            if (i == 6) {
                fruit.push(ranNum);
            }
        }

        fruitContainer1.style.animationName = "spin";
        fruitContainer1.style.animationDuration = "1s";
        fruitContainer1.style.animationFillMode = "forwards";

        setTimeout(function() {
            fruitContainer1.style.animationName = ""
            document.getElementById("div1").innerHTML = symbols[fruit[0]]
        }, 1000)

        setTimeout(function() {
            fruitContainer2.style.animationName = "spin";
            fruitContainer2.style.animationDuration = "1s"
            fruitContainer2.style.animationPlayState = "forwards"
            fruitContainer2.style.animationFillMode = "forwards"; 
        }, 500)

        setTimeout(function() {
            fruitContainer2.style.animationName = ""
            document.getElementById("div2").innerHTML = symbols[fruit[1]]
        }, 1500)

        setTimeout(function() {
            fruitContainer3.style.animationName = "spin";
            fruitContainer3.style.animationDuration = "1s"
            fruitContainer3.style.animationPlayState = "forwards"
            fruitContainer3.style.animationFillMode = "forwards"; 
        }, 1000)

        setTimeout(function() {
            fruitContainer3.style.animationName = ""
            document.getElementById("div3").innerHTML = symbols[fruit[2]]
        }, 2000)

        //const reelsSymbols = spinReels();
        checkWin();

        console.log(fruit)
        console.log(symbols[fruit[0]] + symbols[fruit[1]] + symbols[fruit[2]])
    });
});
