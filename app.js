let myLibrary = [];
var elements_length = 0;

const DEFAULT_DATA = [
    { 'title': 'The Hobbit', 'author': 'J.R.R. Tolkien', 'pages': '295', 'status': 'read' },
    { 'title': 'Sapiens', 'author': 'Yuval N. Harari', 'pages': '458', 'status': 'not read' }
]

myLibrary = DEFAULT_DATA;

// function Book(title, author, pages, status) {
//     this.title = title
//     this.author = author
//     this.pages = pages
//     this.status = status
// }

class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

// Selectors

const tbodyElement = document.querySelector('tbody')
const title = document.querySelector("#title")
const author = document.querySelector("#author")
const pages = document.querySelector("#pages")
const status = document.querySelector("#status")

const btnAdd = document.querySelector("#btnAdd")

// Functions

function addBookToLibrary(event) {
    event.preventDefault()
    if (title.value === "" || author.value === "" || pages.value === "") {
        alert("Preencha os campos!")
        return
    }
    const newBook = new Book(title.value, author.value, pages.value, status.value)
    myLibrary.push(newBook)
    
    clearForm()
    updateLocalStorage()
    render()
    
}

function changeBookStatus(id) {
    console.log("entrou aqui")
    if (myLibrary[id].status === "read") {
        myLibrary[id].status = "not read"
    } else if (myLibrary[id].status === "not read") {
        myLibrary[id].status = "read"
    }
    updateLocalStorage()
    render()
}

function removeBook(id) {
    console.log("1")
    if (myLibrary[id]) {
        myLibrary.pop(id, id + 1)
    }
    updateLocalStorage()
    render()
}

function clearForm() {
    title.value = ""
    author.value = ""
    pages.value = ""
}

function getBtnStatus() {
    Array.from(document.querySelectorAll("#button-status"))
        .map(element => {
            element.addEventListener("click", function (e) {
                changeBookStatus(element.parentNode.parentNode.id)
            })
        })
}

function getDeleteId() {
    Array.from(document.querySelectorAll(".button-danger"))
        .map(element => {
            element.addEventListener("click", function (e) {
                removeBook(element.parentNode.parentNode.id)
            })
        })
}

function createIndex() {
    const ids = Array.from(document.querySelectorAll("tr#books"))
    for (i = 0; i < ids.length; i++) {
        ids[i].id = i
    }
}

function updateLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    //library = JSON.parse(localStorage.getItem("library"));
}

function checkLocalStorage() {
    if (localStorage.getItem("myLibrary")) {
        myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    } else {
        myLibrary = DEFAULT_DATA;
    }
}

function render() {
    checkLocalStorage()
    tbodyElement.innerHTML = ""
    myLibrary.forEach(book => {
        const htmlBook = `
        <tr id="books">
            <td> ${book.title} </td>
            <td> ${book.author} </td>
            <td> ${book.pages} </td>
            <td><button id="button-status">${book.status}</button></td>
            <td><button class="button-danger">Delete</button></td>
        </tr>
        `;
        tbodyElement.insertAdjacentHTML('beforeend', htmlBook)
    });
    getDeleteId()
    getBtnStatus();
    createIndex()
}

// Event Listeners

btnAdd.addEventListener("click", addBookToLibrary)

render()