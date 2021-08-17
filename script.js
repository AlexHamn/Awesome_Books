let collection = [];

class Book {
    constructor(title, author) {
        this.title = title,
        this.author = author,
        collection.push({ 'title': this.title, 'author': this.author });
    }
}

let book1 = Book('title1', 'mr writer');
let book2 = Book('title2', 'mr writer');

function displayBook(title, author, id) {
    let books = document.getElementById('books');
    let article = document.createElement('article');
    let h2 = document.createElement('h2');
    let p = document.createElement('p');
    let button = document.createElement('button');

    books.append(article);
    article.append(h2, p, button);

    button.setAttribute('id', id)
    button.setAttribute('onclick', 'removeBook(this.id)')

    h2.textContent = title;
    p.textContent = author;
    button.textContent = 'remove';

    function removeBook(id) {
        // collection = collection.filter(book => book.title !== title);
        collection = collection.splice(id, 1);
        article.remove();
    }
}

console.log(collection[1]);

for (let i = 0; i <= collection.length; i++) {
    displayBook(collection[i].title, collection[i].author, i);
}