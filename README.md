# payswitch
my pay.switch
const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "public");

const server = http.createServer((req, res) => {
  let pathname = decodeURIComponent(req.url.split("?")[0]);
  if (pathname === "/") pathname = "/index.html";
  const file = path.join(publicDir, pathname);
  if (!file.startsWith(publicDir)) {
    res.writeHead(403); return res.end("Forbidden");
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, {"Content-Type":"text/plain"});
      return res.end("Not found");
    }
    const ext = path.extname(file);
    const types = {".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8"};
    res.writeHead(200, {"Content-Type": types[ext] || "application/octet-stream"});
    res.end(data);
  });
});
server.listen(port, "0.0.0.0", () => console.log(`PaySwitch listening on ${port}`));




<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PaySwitch</title>

<style>
*{
  box-sizing:border-box;
  margin:0;
  padding:0;
}

body{
  font-family:Arial,Helvetica,sans-serif;
  background:#f3f5f8;
  color:#111827;
  min-height:100vh;
}

.app{
  width:100%;
  max-width:500px;
  min-height:100vh;
  margin:auto;
  background:white;
  padding:20px;
}

header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:20px;
}

.brand{
  display:flex;
  align-items:center;
  gap:12px;
}

.logo{
  width:46px;
  height:46px;
  background:#111827;
  color:white;
  border-radius:14px;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:23px;
  font-weight:bold;
}

.brand h1{
  font-size:21px;
}

.brand p{
  color:#8992a0;
  font-size:12px;
  margin-top:3px;
}

.menu{
  width:42px;
  height:42px;
  border:0;
  border-radius:50%;
  background:#f1f3f6;
  font-size:20px;
}

.demo{
  background:#fff7dc;
  border:1px solid #f0dda0;
  padding:12px;
  border-radius:13px;
  font-size:12px;
  margin-bottom:25px;
}

.demo b{
  color:#926b00;
}

.screen{
  display:none;
}

.screen.active{
  display:block;
}

.label{
  color:#8b94a3;
  font-size:11px;
  font-weight:bold;
  letter-spacing:1.5px;
  text-align:center;
  margin-bottom:12px;
}

.amount-area{
  text-align:center;
  padding:35px 0 30px;
}

.amount{
  display:flex;
  justify-content:center;
  align-items:baseline;
  gap:8px;
}

.amount span{
  color:#7d8795;
  font-size:17px;
}

.amount strong{
  font-size:48px;
  letter-spacing:-2px;
}

.hint{
  color:#929aa7;
  font-size:13px;
  margin-top:8px;
}

.keypad{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:10px;
}

.keypad button{
  height:62px;
  border:0;
  border-radius:16px;
  background:#f5f6f8;
  font-size:21px;
  font-weight:bold;
  color:#1d2531;
}

.keypad button:active{
  transform:scale(.95);
  background:#e7eaf0;
}

.primary{
  width:100%;
  height:56px;
  margin-top:20px;
  border:0;
  border-radius:15px;
  background:#111827;
  color:white;
  font-size:16px;
  font-weight:bold;
}

.primary:disabled{
  background:#d8dce3;
  color:#9299a5;
}

.back{
  border:0;
  background:none;
  color:#606a78;
  font-size:14px;
  font-weight:bold;
  margin-bottom:25px;
}

.heading h2{
  font-size:32px;
  margin-bottom:6px;
}

.heading p{
  color:#858e9d;
  font-size:14px;
}

.methods{
  display:flex;
  flex-direction:column;
  gap:12px;
  margin-top:25px;
}

.method{
  width:100%;
  display:flex;
  align-items:center;
  text-align:left;
  background:white;
  border:1px solid #e5e8ed;
  border-radius:17px;
  padding:15px;
}

.method:active{
  transform:scale(.98);
}

.icon{
  width:48px;
  height:48px;
  border-radius:14px;
  display:flex;
  justify-content:center;
  align-items:center;
  margin-right:13px;
  font-size:19px;
  font-weight:bold;
}

.mtn{
  background:#ffd900;
  color:#111;
}

.airtel{
  background:#e21b23;
  color:white;
}

.card{
  background:#e8edf6;
}

.bank{
  background:#e5efff;
}

.method-info{
  flex:1;
  display:flex;
  flex-direction:column;
  gap:4px;
}

.method-info strong{
  font-size:14px;
}

.method-info span{
  font-size:12px;
  color:#8992a0;
}

.arrow{
  font-size:25px;
  color:#9ca4af;
}

.confirm h2{
  font-size:39px;
  margin-bottom:25px;
}

.summary{
  background:#f6f7f9;
  border-radius:18px;
  padding:18px;
}

.row{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:20px;
  font-size:14px;
}

.row span{
  color:#818a98;
}

.row strong{
  text-align:right;
}

.line{
  height:1px;
  background:#e2e5e9;
  margin:16px 0;
}

.security{
  display:flex;
  gap:12px;
  background:#f1f6ff;
  border-radius:15px;
  padding:15px;
  margin-top:15px;
}

.security-icon{
  font-size:20px;
}

.security strong{
  font-size:13px;
}

.security p{
  color:#7e8795;
  font-size:11px;
  margin-top:5px;
  line-height:1.5;
}

.success{
  text-align:center;
  padding-top:60px;
}

.check{
  width:80px;
  height:80px;
  border-radius:50%;
  background:#e5f8ed;
  color:#16a05d;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:40px;
  font-weight:bold;
  margin:0 auto 20px;
}

.success h2{
  font-size:29px;
  margin-bottom:10px;
}

.success > p{
  color:#7e8795;
  font-size:14px;
  line-height:1.5;
}

.success-box{
  margin-top:30px;
  background:#f6f7f9;
  border-radius:18px;
  padding:18px;
  text-align:left;
}

.success-box .row{
  margin:10px 0;
}

.note{
  margin-top:18px;
  padding:13px;
  border-radius:12px;
  background:#fff7dc;
  color:#806622;
  font-size:12px;
  line-height:1.5;
}

@media(min-width:600px){
  body{
    padding:30px 0;
  }

  .app{
    min-height:auto;
    border-radius:25px;
    box-shadow:0 20px 60px rgba(0,0,0,.08);
  }
}
</style>
</head>

<body>

<div class="app">

<header>
  <div class="brand">
    <div class="logo">P</div>

    <div>
      <h1>PaySwitch</h1>
      <p>Simple payments</p>
    </div>
  </div>

  <button class="menu">•••</button>
</header>

<div class="demo">
  <b>DEMO MODE</b>
  — No real money is transferred.
</div>


<section id="amountScreen" class="screen active">

  <div class="amount-area">

    <div class="label">ENTER AMOUNT</div>

    <div class="amount">
      <span>UGX</span>
      <strong id="amount">0</strong>
    </div>

    <p class="hint">
      Enter the amount you want to pay
    </p>

  </div>

  <div class="keypad">

    <button onclick="press('1')">1</button>
    <button onclick="press('2')">2</button>
    <button onclick="press('3')">3</button>

    <button onclick="press('4')">4</button>
    <button onclick="press('5')">5</button>
    <button onclick="press('6')">6</button>

    <button onclick="press('7')">7</button>
    <button onclick="press('8')">8</button>
    <button onclick="press('9')">9</button>

    <button onclick="press('00')">00</button>
    <button onclick="press('0')">0</button>
    <button onclick="backspace()">⌫</button>

  </div>

  <button
    id="continue"
    class="primary"
    onclick="goMethods()"
    disabled>
    Continue
  </button>

</section>


<section id="methodScreen" class="screen">

  <button
    class="back"
    onclick="show('amountScreen')">
    ← Back
  </button>

  <div class="heading">

    <div class="label" style="text-align:left;">
      PAY
    </div>

    <h2>
      UGX <span id="methodAmount">0</span>
    </h2>

    <p>Select how you want to pay</p>

  </div>

  <div class="methods">

    <button
      class="method"
      onclick="selectMethod('MTN Mobile Money')">

      <div class="icon mtn">M</div>

      <div class="method-info">
        <strong>MTN Mobile Money</strong>
        <span>Pay using MTN MoMo</span>
      </div>

      <div class="arrow">›</div>

    </button>


    <button
      class="method"
      onclick="selectMethod('Airtel Money')">

      <div class="icon airtel">A</div>

      <div class="method-info">
        <strong>Airtel Money</strong>
        <span>Pay using Airtel Money</span>
      </div>

      <div class="arrow">›</div>

    </button>


    <button
      class="method"
      onclick="selectMethod('Visa / Mastercard')">

      <div class="icon card">💳</div>

      <div class="method-info">
        <strong>Visa / Mastercard</strong>
        <span>Use a debit or credit card</span>
      </div>

      <div class="arrow">›</div>

    </button>


    <button
      class="method"
      onclick="selectMethod('Bank Account')">

      <div class="icon bank">🏦</div>

      <div class="method-info">
        <strong>Bank Account</strong>
        <span>Pay directly from your bank</span>
      </div>

      <div class="arrow">›</div>

    </button>

  </div>

</section>


<section id="confirmScreen" class="screen">

  <button
    class="back"
    onclick="show('methodScreen')">
    ← Back
  </button>

  <div class="confirm">

    <div class="label" style="text-align:left;">
      CONFIRM PAYMENT
    </div>

    <h2>
      UGX <span id="confirmAmount">0</span>
    </h2>

    <div class="summary">

      <div class="row">
        <span>Amount</span>

        <strong>
          UGX <span id="summaryAmount">0</span>
        </strong>
      </div>

      <div class="line"></div>

      <div class="row">
        <span>Payment method</span>

        <strong id="summaryMethod">
          -
        </strong>
      </div>

    </div>

    <div class="security">

      <div class="security-icon">🔒</div>

      <div>
        <strong>Secure payment</strong>

        <p>
          Your payment details should be handled
          by the selected payment provider.
        </p>
      </div>

    </div>

    <button
      id="payButton"
      class="primary"
      onclick="makePayment()">
      Confirm Payment
    </button>

  </div>

</section>


<section id="successScreen" class="screen">

  <div class="success">

    <div class="check">✓</div>

    <h2>Payment Ready</h2>

    <p>
      Your PaySwitch demo payment has been
      prepared successfully.
    </p>

    <div class="success-box">

      <div class="row">
        <span>Amount</span>

        <strong>
          UGX <span id="successAmount">0</span>
        </strong>
      </div>

      <div class="row">
        <span>Method</span>

        <strong id="successMethod">
          -
        </strong>
      </div>

    </div>

    <div class="note">
      This is a prototype.
      No real money was transferred.
    </div>

    <button
      class="primary"
      onclick="newPayment()">
      Make Another Payment
    </button>

  </div>

</section>

</div>


<script>

let amount = "";
let selectedMethod = "";

function formatNumber(value){

  if(!value){
    return "0";
  }

  return Number(value).toLocaleString("en-US");

}

function updateAmount(){

  document.getElementById("amount")
    .textContent = formatNumber(amount);

  document.getElementById("continue")
    .disabled =
    !amount || Number(amount) <= 0;

}

function press(key){

  if(amount.length >= 12){
    return;
  }

  if(key === "00"){

    if(amount.length > 0){
      amount += "00";
    }

  }else{

    if(amount === "0"){
      amount = key;
    }else{
      amount += key;
    }

  }

  updateAmount();

}

function backspace(){

  amount =
    amount.substring(0,amount.length-1);

  updateAmount();

}

function show(id){

  document
    .querySelectorAll(".screen")
    .forEach(screen=>{
      screen.classList.remove("active");
    });

  document
    .getElementById(id)
    .classList.add("active");

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

}

function goMethods(){

  if(!amount){
    return;
  }

  document.getElementById("methodAmount")
    .textContent =
    formatNumber(amount);

  show("methodScreen");

}

function selectMethod(method){

  selectedMethod = method;

  const formatted =
    formatNumber(amount);

  document.getElementById("confirmAmount")
    .textContent = formatted;

  document.getElementById("summaryAmount")
    .textContent = formatted;

  document.getElementById("summaryMethod")
    .textContent = method;

  show("confirmScreen");

}

function makePayment(){

  const button =
    document.getElementById("payButton");

  button.disabled = true;

  button.textContent =
    "Processing...";

  setTimeout(()=>{

    document.getElementById("successAmount")
      .textContent =
      formatNumber(amount);

    document.getElementById("successMethod")
      .textContent =
      selectedMethod;

    button.disabled = false;

    button.textContent =
      "Confirm Payment";

    show("successScreen");

  },1000);

}

function newPayment(){

  amount = "";
  selectedMethod = "";

  document.getElementById("amount")
    .textContent = "0";

  document.getElementById("continue")
    .disabled = true;

  show("amountScreen");

}

updateAmount();

</script>

</body>
</html>






{
  "name": "payswitch",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "npx serve . -l $PORT"
  },
  "dependencies": {
    "serve": "^14.2.4"
  }
}
