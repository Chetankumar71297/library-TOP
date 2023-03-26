// Form generator button
let addButton = document.querySelector(".addButton>span");
addButton.addEventListener("click", formGenerator);

// Add Book button on form
let addBook = document.querySelector(".formContainer>form>button");
addBook.addEventListener("click", takeBookInfo);

//storing book object in array, generating book card and removing form
let bookInfoObject;
let arrayOfBookInfoObject = [];
function takeBookInfo(event) {
  event.preventDefault(); // without this, button by default will try to submit form on server and we will not able to get the values!
  const bookName = document.querySelector("#title").value;
  const authorName = document.querySelector("#author").value;
  const totalPages = document.querySelector("#totalPages").value;
  const readOrNot = document.querySelector(
    "input[name=readOrNot]:checked"
  ).value;
  bookInfoObject = new BookInfoObjectMaker(
    bookName,
    authorName,
    totalPages,
    readOrNot
  );

  if (
    !arrayOfBookInfoObject.some((book) => book.name === bookInfoObject.name)
  ) {
    arrayOfBookInfoObject.push(bookInfoObject);
    makeAddedBookCards();
  }

  formRemover();
}

// Form generator function
function formGenerator() {
  document.querySelector(".formContainer").style.display = "inline-flex";
}

// Book object constructor
function BookInfoObjectMaker(info1, info2, info3, info4) {
  this.name = info1;
  this.author = info2;
  this.pages = info3;
  this.readed = info4;
}

// Form remover function also reset input variables
function formRemover() {
  document.querySelector(".formContainer").style.display = "none";
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#totalPages").value = "";
}

// Card generator function
function makeAddedBookCards() {
  const currentBookIndex = arrayOfBookInfoObject.indexOf(bookInfoObject);

  const card = document.createElement("div");
  card.classList.add("card");

  const bookNameField = document.createElement("p");
  bookNameField.textContent = `Book name: ${bookInfoObject.name}`;

  const bookAuthorField = document.createElement("p");
  bookAuthorField.textContent = `Author: ${bookInfoObject.author}`;

  const bookTotalPageField = document.createElement("p");
  bookTotalPageField.textContent = `Total pages: ${bookInfoObject.pages}`;

  const statusButton = document.createElement("button");
  statusButton.textContent = `Readed? : ${bookInfoObject.readed}`;
  statusButton.classList.add("status");
  statusButton.setAttribute("onclick", "changeReadStatus(this)");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete");
  deleteButton.setAttribute("onclick", "deleteCard(this)");

  card.append(
    bookNameField,
    bookAuthorField,
    bookTotalPageField,
    statusButton,
    deleteButton
  );
  document.querySelector("#cardsBox").appendChild(card);
}

// Card remover function also removes corresponding book object from array
function deleteCard(target) {
  const deleteButtons = document.querySelectorAll(".delete");

  for (let i = 1; i <= deleteButtons.length; i++) {
    deleteButtons[i - 1].setAttribute("data-card-no", i);
  }

  const cardNoToBeDeleted = target.getAttribute("data-card-no");
  const cards = document.getElementById("cardsBox").children; // this method will not work with getElementByClassName also item method will not work that way
  const card = cards.item(cardNoToBeDeleted - 1);
  card.remove();
  arrayOfBookInfoObject.splice(cardNoToBeDeleted - 1, 1);
}

// Read status changer function also changes "readed" property of corresponding book object in array
function changeReadStatus(target) {
  const statusButtons = document.querySelectorAll(".status");
  for (let i = 1; i <= statusButtons.length; i++) {
    statusButtons[i - 1].setAttribute("data-card-no", i);
  }
  const cardNoToChangeStatus = target.getAttribute("data-card-no");
  const correspondingBookInArray =
    arrayOfBookInfoObject[cardNoToChangeStatus - 1];

  if (correspondingBookInArray.readed === "No") {
    correspondingBookInArray.readed = "Yes";
    target.textContent = "Readed? : Yes";
  } else {
    correspondingBookInArray.readed = "No";
    target.textContent = "Readed? : No";
  }
}
