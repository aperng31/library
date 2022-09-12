const Book = (myTitle, myAuthor, myPages, myRead) => {
    let title = myTitle;
    let author = myAuthor;
    let pages = myPages; 
    let read = myRead;
    let id;
    //id added in loadTable
    const changeRead = () => {
        if (read == false) {
            read = true;
        }
        else {
            read = false;
        }
        console.log('changed!');
    }
    const getTitle = () => {
        return title;
    }
    const getAuthor = () => {
        return author;
    }
    const getPages = () => {
        return pages;
    }
    const getRead = () => {
        return read;
    }
    const setID = (myId) => {
        id = myId;
    }
    const getID = () => {
        return id;
    }
    return { changeRead, getTitle, getAuthor, getPages, getRead, setID, getID };
}

const libraryCreator = (() => {
    let myLibrary = [];

    const loadBook = (book) => {
        myLibrary.push(book);
        book.setID(myLibrary.indexOf(book) + 1);
        //console.log(book.getID());
        return book.getID();
    }
    const deleteBook = (id) => {
        myLibrary.splice(id - 1, 1);
        shiftID(id - 1);
    }
    const getLib = () => {
        return myLibrary;
    }
    const shiftID = (pos) => {
        for (let i = pos; i < myLibrary.length; i++) {//need to update id of succeeding objects -1
            myLibrary[i].setID(i);    //reset book id to new index and row
        }
    }

    return { loadBook, deleteBook, getLib };
})();

const DOM_manager = (() => {

    let tbody = document.querySelector('#tbody');

    const loadTable = (book) => { //creates new tr and td to load book info into tbody
        const newTr = document.createElement('tr');

        const titleTd = document.createElement('td');
        titleTd.innerHTML = book.getTitle(); 
        newTr.appendChild(titleTd);

        const authorTd = document.createElement('td');
        authorTd.innerHTML = book.getAuthor();
        newTr.appendChild(authorTd)

        const pagesTd = document.createElement('td');
        pagesTd.innerHTML = book.getPages();
        newTr.appendChild(pagesTd);

        const readTd = document.createElement('td');
        if (book.getRead() == true) {
            readTd.innerHTML = "<input type=\"checkbox\" class=\"read\" checked></input>"
        } 
        else {
            readTd.innerHTML = "<input type=\"checkbox\" class=\"read\"></input>"
        }
        newTr.appendChild(readTd);

        //create functioning delete button
        const delTd = document.createElement('td');
        const delButton = document.createElement('input'); //image button to respond to 'click' to delete row and book
        delButton.type = "image";
        delButton.src="./images/trash-can-outline.png";
        delButton.classList.add = "delButton";
        delButton.alt = "Delete Book";
        delButton.id = book.getID();
        console.log(delButton.id);
        delTd.appendChild(delButton);

        newTr.appendChild(delTd);
        console.log(newTr);
        //add event listener for when delete button is clicked
        delButton.addEventListener('click', () => deleteBook(book));

        tbody.appendChild(newTr);//append new tr to tbody

    }
    const deleteBook = (book) => {
        let id = book.getID();
        console.log(id);
        const delRow = document.querySelector(`#tbody tr:nth-child(${id})`);
        console.log(delRow);

        delRow.remove(); //remove corres tr from table
        libraryCreator.deleteBook(id); //remove at index
        
        //libraryCreator.getLib().forEach(book => console.log(book.getTitle()));
    }   

    return { loadTable, deleteBook };
})();

const loader = (() => {
    const add = document.querySelector("#add");
    const inputTitle = document.querySelector("#title");
    const inputAuthor = document.querySelector("#author");
    const inputPages = document.querySelector("#pages");
    const inputRead = document.querySelector('#read');

    const clearFields = () => {
        inputTitle.value = '';
        inputAuthor.value = '';
        inputPages.value = '';
        inputRead.checked = false;
    }

    add.addEventListener("click", () => {  
        let myBook = Book(inputTitle.value, inputAuthor.value, inputPages.value, inputRead.checked);
        libraryCreator.loadBook(myBook);
        DOM_manager.loadTable(myBook);
        clearFields();
    });
})();

let book1 = Book('1Q84', 'Murakami', 928, true);
let book2 = Book('The Alchemist', 'Coelho', 197, false);
libraryCreator.loadBook(book1);
libraryCreator.loadBook(book2);
DOM_manager.loadTable(book1);
DOM_manager.loadTable(book2);
