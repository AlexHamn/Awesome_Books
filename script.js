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

function addBook(e) {
  e.preventDefault();
  const title = addTitle.value;
  const author = addAuthor.value;
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