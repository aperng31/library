class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages; 
        this.read = read;
        //this.id added in loadTable
    }
    changeRead() {
        if (this.read == false) {
            this.read = true;
        }
        else {
            this.read = false;
        }
        console.log('changed!');
    }
    deleteBook() {
        // const delBook = book.path[2]; //is a pointer, inspect browser <<DONT NEED
        const tempInd = this.id;    //id of book corresponds to index in myLibrary
        const nChild = +tempInd + 1;    //child counts starting at 1, not 0

        const delBook = document.querySelector(`#tbody tr:nth-child(${nChild})`);
        
        delBook.remove(); //remove corres tr from table
        myLibrary.splice(tempInd, 1); //remove at index
        myDelButtons.splice(tempInd, 1);

        console.log(myLibrary);
        
        for (let i = tempInd; i < myLibrary.length; i++) {//need to update id of succeeding objects -1
            myDelButtons[i].id = i; //correspond button id to index and row
            myLibrary[i].id = i;    //correspond book id to index and row
        }
        console.log(myDelButtons);
    }
}

function loadTable(book) {
    //add information to table, make sure to include class of certain 
    const newTr = document.createElement('tr');

    const titleTd = document.createElement('td');
    titleTd.innerHTML = book.title; 
    newTr.appendChild(titleTd);

    const authorTd = document.createElement('td');
    authorTd.innerHTML = book.author;
    newTr.appendChild(authorTd)

    const pagesTd = document.createElement('td');
    pagesTd.innerHTML = book.pages;
    newTr.appendChild(pagesTd);

    const readTd = document.createElement('td');
    if (book.read == true) {
        readTd.innerHTML = "<input type=\"checkbox\" class=\"read\" checked></input>"
    } 
    else {
        readTd.innerHTML = "<input type=\"checkbox\" class=\"read\"></input>"
    }
    newTr.appendChild(readTd);

    const delTd = document.createElement('td');

    const delButton = document.createElement('input'); //image button to respond to 'click' to delete row and book
    delButton.type = "image";
    delButton.src="./images/trash-can-outline.png";
    delButton.classList.add = "delButton";
    delButton.alt = "Delete Book";
    delTd.appendChild(delButton);

    myDelButtons.push(delButton); //append new button to array of delete buttons as well
    newTr.appendChild(delTd);

    myLibrary.push(book); //add book to myLibrary
    //newTr.id=myLibrary.indexOf(book); //add id to each row corresponding to index in myLibrary
    delButton.id = `${myLibrary.indexOf(book)}`; //correspond id w/ index of book in myLibrary
    book.id = myLibrary.indexOf(book);
    console.log(book.id);

    delButton.addEventListener('click', book.deleteBook);

    tbody.appendChild(newTr);//make new tr and append to previous, include id of row# in tr


}

function clearFields() {
    inputTitle.value = '';
    inputAuthor.value = '';
    inputPages.value = '';
    inputRead.checked = false;
}

let myDelButtons = []; //create array of delete buttons that corresponds by index w/ books in myLibrary
let myLibrary = [];
let table = document.querySelector('#table');
let tbody = document.querySelector('#tbody');

const add = document.querySelector("#add");
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#pages");
const inputRead = document.querySelector('#read');

let book1 = new Book('1Q84', 'Murakami', 928, true);
let book2 = new Book('The Alchemist', 'Coelho', 197, false);
loadTable(book1);
loadTable(book2);
let isChecked = document.querySelectorAll('.read');

add.addEventListener("click", () =>  {  
    let myBook = new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputRead.checked)
    loadTable(myBook);
    clearFields();
});
console.log(myLibrary);

// console.log(isChecked);
// console.log(isChecked[0]);
// isChecked.addEventListener('change', this.changeRead);
