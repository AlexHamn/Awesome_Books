const addButton = document.getElementById('addButton');
const booksList = document.getElementById('booksList');
const addAuthor = document.getElementById('addAuthor');
const addTitle = document.getElementById('addTitle');

let books;

if (localStorage.getItem('books') === null) {
  books = [];
} else {
  books = JSON.parse(localStorage.getItem('books'));
}

function displayBooks() {
  books.forEach((book) => {
    const li = document.createElement('li');
    li.innerHTML = `
    <h2>${book.title}</h2>  
    <p>${book.author}</p>  
    <button class="remove">remove</button>
    <hr>`;
    booksList.append(li);
  });
}

function isItDuplicate(title, author) {
  for (let i = 0; i < books.length; i += 1) {
    if (title === books[i].title && author === books[i].author) {
      return true;
    }
  }
  return false;
}

function addBook(e) {
  e.preventDefault();
  const title = addTitle.value;
  const author = addAuthor.value;
  const error = document.createElement('p');
  const location = document.querySelector('#addBook');
  if (title === '' || author === '') {
    error.innerHTML = `
    <small class="alert">Please fill all the fields</small>
  `;
    location.appendChild(error);
  } else if (isItDuplicate(title, author) === true) {
    error.innerHTML = `
    <small class="alert">Book already exists</small>
  `;
    location.appendChild(error);
  } else {
    const book = {
      title,
      author,
    };
    book.id = Math.floor(Math.random() * 100);
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    addTitle.value = '';
    addAuthor.value = '';
    const li = document.createElement('li');
    li.classList.add('book');
    li.dataset.id = book.id;
    li.innerHTML = `
    <h2>${book.title}</h2>  
    <p>${book.author}</p>  
    <button class="remove">remove</button>
    <hr>`;
    booksList.append(li);
  }
  setTimeout(() => document.querySelector('.alert').remove(), 2000);
}

function removeBook(elem) {
  if (elem.classList.contains('remove')) {
    elem.parentElement.remove();
  }
}

document.addEventListener('DOMContentLoaded', displayBooks);

addButton.addEventListener('click', addBook);

booksList.addEventListener('click', (e) => {
  removeBook(e.target);
  const newBooks = JSON.parse(localStorage.getItem('books'));
  newBooks.forEach((book, index) => {
    if (book.author === e.target.previousElementSibling.textContent) {
      newBooks.splice(index, 1);
    }
  });
  localStorage.setItem('books', JSON.stringify(newBooks));
});