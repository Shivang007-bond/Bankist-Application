"use strict";

//Bankist Application

// Data
const account1 = {
  owner: "Yogesh Tripathi",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Shivang Tripathi",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Rishabh Dubey",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Prakhar Kotnala",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//Lectures

const now = new Date();
labelDate.textContent = now;

//Displaying Movements like deposit or withdrawl

const displayMovements = function (movements, sort = false) {
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  containerMovements.innerHTML = "";

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date"></div>
        <div class="movements__value">${mov}</div>
      </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// console.log(containerMovements.innerHTML)

//Calculate and Printing Balance

const calcDisplayBalance = (accs) => {
  accs.balance = accs.movements.reduce((acc, curr) => acc + curr, 0);

  labelBalance.textContent = `${accs.balance}💶`;
};

// Calculate and Display Summary
const calcDisplaySummary = function (accs) {
  //Deposits
  const incomes = accs.movements
    .filter((mov) => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);

  labelSumIn.textContent = `${incomes}💶`;

  //Transfers
  const transfer = accs.movements
    .filter((mov) => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);

  labelSumOut.textContent = `${Math.abs(transfer)}💶`;

  //Interests - Method Chaining

  const interest = accs.movements
    .filter((mov) => mov > 0)
    .map((deposits) => (deposits * accs.interestRate) / 100)
    .filter(function (int, i, arr) {
      // console.log(arr)
      return int >= 1;
    })
    .reduce((int, curr) => int + curr, 0);

  labelSumInterest.textContent = `${interest}💶`;
};

//Creating Usernames
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUserNames(accounts);
// console.log(accounts)

const updateUI = function (accs) {
  //Display Movement
  displayMovements(accs.movements);

  //Display Balance
  calcDisplayBalance(accs);

  //Display Summary
  calcDisplaySummary(accs);
};

//Find Method Usage
// const account = accounts.find(accs => accs.owner === "Prakhar Kotnala")
// console.log(account)

//LOGOUT TIMER
const startLogoutTimer = function () {
  let time = 60;
  
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    //when time = 0 , stop timer
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "LOG IN TO GET STARTED";
      containerApp.style.opacity = 0;
    }

        //Decrease Time
        time--; 
  }

    tick();
  const timer = setInterval(tick , 1000);
  return timer ;
};

//Login Implementation Event Listeners
let currentAccount, timer ;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault(); //prevents form from submitting

  currentAccount = accounts.find(
    (accs) => accs.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and Welcome Message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    //Clearing Input feilds
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    //Start Logout timer
    if(timer) 
    clearInterval(timer);
    timer = startLogoutTimer();

    //Updating UI function
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  // console.log(amount , recieverAccount)
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    recieverAccount &&
    recieverAccount?.username !== currentAccount.username
  ) {
    //Doing Transfer
    currentAccount.movements.push(-amount);
    recieverAccount.movements.push(amount);

    updateUI(currentAccount);

    //reset timer 
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  inputLoanAmount.value = "";

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(() => {
      currentAccount.movements.push(amount);

      updateUI(currentAccount);

      //reset timer 
      clearInterval(timer);
      timer = startLogoutTimer();
    }, 5000);
  }
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );

    //delete account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
    
    

    //Set input feild
    inputCloseUsername.value = inputClosePin.value = "";
    
  }
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
