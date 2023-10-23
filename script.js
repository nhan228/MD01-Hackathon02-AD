let cards = [];

function saveCard() {
  const cardNumber = document.getElementById("cardNumber").value;
  const expiryDate = document.getElementById("expiryDate").value;
  const cvv = document.getElementById("cvv").value;

  if (!validateCardInput(cardNumber, expiryDate, cvv)) {
    return;
  }

  cards.push({
    cardNumber: cardNumber,
    expiryDate: expiryDate,
    cvv: cvv,
  });

  document.getElementById("cardNumber").value = "";
  document.getElementById("expiryDate").value = "";
  document.getElementById("cvv").value = "";

  displayCards();
}

function displayCards() {
  const table = document.getElementById("cardList");
  table.innerHTML = "<tr><th>Card Image</th><th>Card Number</th><th>Expiry Date</th><th>CVV</th><th>Actions</th></tr>";

  cards.forEach((card, index) => {
    const maskedCardNumber = maskCardNumber(card.cardNumber);
    const maskedCvv = maskCvv(card.cvv);

    const row = table.insertRow(-1);
    row.innerHTML = `
      <td style="display:flex; justify-content:center; border: none">
        <img src="./image/masterCard.png" width="100px" height="60px">
      </td>
      <td>${maskedCardNumber}</td>
      <td>${card.expiryDate}</td>
      <td>${maskedCvv}</td>
      <td>
        <button onclick="editCard(${index})">Edit</button>
        <button onclick="deleteCard(${index})">Delete</button>
        <button onclick="viewCard(${index})">View</button>
      </td>
    `;
  });
}

function maskCardNumber(cardNumber) {
  const maskedPart = cardNumber.substring(0, 6) + "******" + cardNumber.substring(12);
  return maskedPart;
}

function maskCvv(cvv) {
  return "***";
}
// delete
function deleteCard(index) {
  cards.splice(index, 1);
  displayCards();
}
// edit
function editCard(index) {
  const card = cards[index];
  document.getElementById("cardNumber").value = card.cardNumber;
  document.getElementById("expiryDate").value = card.expiryDate;
  document.getElementById("cvv").value = card.cvv;
  displayCards();
}
// view
function viewCard(index) {
  const card = cards[index];
  alert(`Card Number: ${card.cardNumber}\nExpiry Date: ${card.expiryDate}\nCVV: ${card.cvv}`);
}
// validate
function validateCardInput(cardNumber, expiryDate, cvv) {
  cardNumber = cardNumber.replace(/\s/g, '');
  if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
    alert("Card Number should not be empty and must contain 16 digits.");
    return false;
  }

  if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
    alert("Expiry Date should not be empty and must be in the format MM/YY.");
    return false;
  }

  if (!cvv || !/^\d{3}$/.test(cvv)) {
    alert("CVV should not be empty and must contain 3 digits.");
    return false;
  }

  return true;
}

displayCards();