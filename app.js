let amountValue = "";
let selectedPaymentMethod = "";

const amountDisplay = document.getElementById("amount");

function formatAmount(value) {
  if (!value) return "0";

  const number = Number(value);

  if (isNaN(number)) return "0";

  return number.toLocaleString("en-US");
}

function updateAmount() {
  amountDisplay.textContent = formatAmount(amountValue);
}

function addNumber(number) {
  // Prevent an unnecessarily huge demo amount
  if (amountValue.length >= 9) return;

  // Don't allow leading zeros
  if (amountValue === "0") {
    amountValue = number;
  } else {
    amountValue += number;
  }

  updateAmount();
}

function deleteNumber() {
  amountValue = amountValue.slice(0, -1);
  updateAmount();
}

function clearAmount() {
  amountValue = "";
  updateAmount();
}

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(screenId).classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function goMethods() {
  const numericAmount = Number(amountValue);

  if (!numericAmount || numericAmount <= 0) {
    alert("Please enter an amount first.");
    return;
  }

  showScreen("methodsScreen");
}

function selectMethod(button, method) {
  document.querySelectorAll(".method").forEach(item => {
    item.classList.remove("selected");
  });

  button.classList.add("selected");

  selectedPaymentMethod = method;

  setTimeout(() => {
    document.getElementById("selectedAmount").textContent =
      formatAmount(amountValue);

    document.getElementById("confirmTotal").textContent =
      formatAmount(amountValue);

    document.getElementById("selectedMethod").textContent =
      selectedPaymentMethod;

    showScreen("confirmScreen");
  }, 150);
}

function goBackToAmount() {
  showScreen("amountScreen");
}

function goBackToMethods() {
  showScreen("methodsScreen");
}

function makePayment() {
  document.getElementById("successAmount").textContent =
    formatAmount(amountValue);

  document.getElementById("successMethod").textContent =
    selectedPaymentMethod;

  // Generate a demo transaction reference
  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  document.getElementById("transactionRef").textContent =
    "PS-" + randomNumber;

  const now = new Date();

  document.getElementById("transactionDate").textContent =
    now.toLocaleString("en-UG", {
      dateStyle: "medium",
      timeStyle: "short"
    });

  showScreen("successScreen");
}

function newPayment() {
  amountValue = "";
  selectedPaymentMethod = "";

  updateAmount();

  document.querySelectorAll(".method").forEach(item => {
    item.classList.remove("selected");
  });

  showScreen("amountScreen");
}

updateAmount();