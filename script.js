/* eslint-disable max-classes-per-file */
/* eslint-disable eqeqeq */

const addButton = document.getElementById('addButton');
const booksList = document.getElementById('booksList');
const addAuthor = document.getElementById('addAuthor');
const addTitle = document.getElementById('addTitle');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Manipulation {
  static allBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = Manipulation.allBooks();

    books.forEach((book) => {
      const li = document.createElement('li');
      const button = document.createElement('button');

      li.innerHTML = `
      <p>"${book.title}" by ${book.author}</p>`;
      booksList.append(li);
      li.append(button);
      button.setAttribute('id', book.id);
      button.setAttribute('class', 'remove');
      button.setAttribute('onclick', 'Manipulation.deleteBookMemory(this.id)');
      button.textContent = 'Remove';
    });
  }

  static isItDuplicate(title, author) {
    const books = Manipulation.allBooks();
    for (let i = 0; i < books.length; i += 1) {
      if (title === books[i].title && author === books[i].author) {
        return true;
      }
    }
    return false;
  }

  static addBook(e) {
    e.preventDefault();
    const books = Manipulation.allBooks();
    const title = addTitle.value;
    const author = addAuthor.value;
    const error = document.createElement('small');
    error.className = 'alert';
    const errLocation = document.querySelector('#error');
    const br = document.createElement('br');

    if (title === '' || author === '') {
      error.textContent = 'Please fill all the fields';
      errLocation.append(error);
      error.append(br);
    } else if (Manipulation.isItDuplicate(title, author) === true || error.textContent) {
      error.textContent = 'Book already exists';
      errLocation.append(error);
      error.append(br);
    } else {
      const book = new Book(title, author);
      const li = document.createElement('li');
      const button = document.createElement('button');

      book.id = Math.floor(Math.random() * 100);
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
      addTitle.value = '';
      addAuthor.value = '';

      li.classList.add('book');
      li.dataset.id = book.id;
      li.innerHTML = `<p>"${book.title}" by ${book.author}</p>`;
      booksList.append(li);
      li.append(button);
      button.setAttribute('id', book.id);
      button.setAttribute('class', 'remove');
      button.setAttribute('onclick', 'Manipulation.deleteBookMemory(this.id)');
      button.textContent = 'Remove';
    }
    if (error.classList.contains('alert') && (document.querySelector('.alert') !== null)) {
      setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }
  }

  static removeBook(elem) {
    if (elem.classList.contains('remove')) {
      elem.parentElement.remove();
    }
  }

  static deleteBookMemory(id) {
    const books = Manipulation.allBooks();
    for (let i = 0; i < books.length; i += 1) {
      if (books[i].id == id) {
        books.splice(i, 1);
      }
    }
    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', Manipulation.displayBooks);

addButton.addEventListener('click', Manipulation.addBook);

booksList.addEventListener('click', (e) => {
  if (e.target.previousElementSibling) {
    Manipulation.removeBook(e.target);
  }
});

const heroSection = document.getElementById('hero');
const booksSection = document.getElementById('books');
const addSection = document.getElementById('add');
const contactSection = document.getElementById('contactSection');
const timeValue = document.getElementById('clock');
const { DateTime } = luxon; // eslint-disable-line
const currentTime = DateTime.now();

const homeLink = document.getElementById('logo');
const listLink = document.getElementById('list');
const addLink = document.getElementById('addNew');
const contactLink = document.getElementById('contact');

function homeLinkClick() {
  heroSection.style.display = 'block';
  booksSection.style.display = 'none';
  addSection.style.display = 'none';
  contactSection.style.display = 'none';
}

function listLinkClick() {
  heroSection.style.display = 'none';
  booksSection.style.display = 'flex';
  addSection.style.display = 'none';
  contactSection.style.display = 'none';
  listLink.style.color = 'blue';
  addLink.style.color = 'black';
  contactLink.style.color = 'black';
}

function addLinkClick() {
  heroSection.style.display = 'none';
  booksSection.style.display = 'none';
  addSection.style.display = 'block';
  contactSection.style.display = 'none';
  listLink.style.color = 'black';
  addLink.style.color = 'blue';
  contactLink.style.color = 'black';
}

function contactLinkClick() {
  heroSection.style.display = 'none';
  booksSection.style.display = 'none';
  addSection.style.display = 'none';
  contactSection.style.display = 'block';
  listLink.style.color = 'black';
  addLink.style.color = 'black';
  contactLink.style.color = 'blue';
}

homeLink.addEventListener('click', homeLinkClick);
listLink.addEventListener('click', listLinkClick);
addLink.addEventListener('click', addLinkClick);
contactLink.addEventListener('click', contactLinkClick);
timeValue.textContent = currentTime.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);