const newBook = document.querySelector('.add-book-button');
const form = document.querySelector('#my-form');
const display = document.getElementById('display');
const displayButton = document.querySelector('.display-button');

const myLibrary = [];

class Book {
  constructor(name, author, pages, read, rating) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rating = rating;
  }
}

function addBookToLibrary() {
  const name = document.getElementById('book-name');
  const author = document.getElementById('author-name');
  const pages = document.getElementById('book-pages');
  const read = document.getElementById('book-read');
  const rating = document.getElementById('book-rating');

  if (read.checked) {
    read.value = 'Yes';
  } else {
    read.value = 'No';
  }

  const myBook = new Book(
    name.value,
    author.value,
    pages.value,
    read.value,
    rating.value
  );
  myLibrary.push(myBook);

  // removes the form from display
  form.textContent = '';
}

function createForm() {
  // Creates form content
  const div1 = document.createElement('div');
  const nameLabel = document.createElement('label');
  const name = document.createElement('input');
  const div2 = document.createElement('div');
  const authorLabel = document.createElement('label');
  const author = document.createElement('input');
  const div3 = document.createElement('div');
  const pagesLabel = document.createElement('label');
  const pages = document.createElement('input');
  const div4 = document.createElement('div');
  const readLabel = document.createElement('label');
  const read = document.createElement('input');
  const div5 = document.createElement('div');
  const ratingLabel = document.createElement('label');
  const rating = document.createElement('input');
  const button = document.createElement('button');

  div1.classList.add('name');
  nameLabel.setAttribute('for', 'book-name');
  nameLabel.textContent = 'Book Name';
  name.setAttribute('type', 'text');
  name.setAttribute('id', 'book-name');
  name.setAttribute('required', 'required');
  div2.classList.add('author');
  authorLabel.setAttribute('for', 'author-name');
  authorLabel.textContent = 'Book Author';
  author.setAttribute('type', 'text');
  author.setAttribute('id', 'author-name');
  author.setAttribute('required', 'required');
  div3.classList.add('pages');
  pagesLabel.setAttribute('for', 'book-pages');
  pagesLabel.textContent = 'Book Pages';
  pages.setAttribute('type', 'text');
  pages.setAttribute('id', 'book-pages');
  pages.setAttribute('required', 'required');
  div4.classList.add('read');
  readLabel.setAttribute('for', 'book-read');
  readLabel.textContent = 'Book Read?';
  read.setAttribute('type', 'checkbox');
  read.setAttribute('id', 'book-read');
  div5.classList.add('rating');
  ratingLabel.setAttribute('for', 'book-rating');
  ratingLabel.textContent = 'Rate This Book';
  rating.setAttribute('type', 'text');
  rating.setAttribute('id', 'book-rating');
  rating.setAttribute('placeholder', 'scale of 1 - 5');
  rating.setAttribute('required', 'required');
  button.classList.add('submit-button');
  button.setAttribute('type', 'submit');
  button.textContent = 'Submit';

  // Append nodes
  form.appendChild(div1);
  div1.appendChild(nameLabel);
  div1.appendChild(name);
  form.appendChild(div2);
  div2.appendChild(authorLabel);
  div2.appendChild(author);
  form.appendChild(div3);
  div3.appendChild(pagesLabel);
  div3.appendChild(pages);
  form.appendChild(div4);
  div4.appendChild(readLabel);
  div4.appendChild(read);
  form.appendChild(div5);
  div5.appendChild(ratingLabel);
  div5.appendChild(rating);
  form.appendChild(button);

  const submit = document.querySelector('.submit-button');
  submit.addEventListener('click', (e) => {
    let isFormValid = form.checkValidity();

    if (isFormValid === false) {
      form.reportValidity();
    } else {
      e.preventDefault();
      addBookToLibrary();
    }
  });
}

function displayBook() {
  // removes the display's child nodes
  display.textContent = '';

  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    const card = document.createElement('div');
    const removeButton = document.createElement('button');
    const statusButton = document.createElement('button');
    const para = document.createElement('p');

    card.classList.add('book-card');
    card.setAttribute('data-title', book.name);
    removeButton.classList.add('remove-book');
    removeButton.textContent = 'Remove Book';
    statusButton.classList.add('book-status');
    statusButton.textContent = 'Read';

    display.appendChild(card);
    card.appendChild(para);
    card.appendChild(removeButton);
    card.appendChild(statusButton);

    Object.entries(book).forEach(([key, value]) => {
      para.textContent += `${key.toUpperCase()}: ${value} `;
    });
  }

  // Removes books from the display and the library
  const removeButton = document.querySelectorAll('.remove-book');
  removeButton.forEach((button) =>
    button.addEventListener('click', () => {
      const parent = button.parentNode;
      const parentBookName = parent.dataset.title;
      const index = myLibrary.findIndex((item) => item.name === parentBookName);
      console.log(index);
      myLibrary.splice(index, 1);
      display.removeChild(parent);
    })
  );

  // Toggles the book read status
  const statusButton = document.querySelectorAll('.book-status');
  statusButton.forEach((button) => {
    button.addEventListener('click', () => {
      const parent = button.parentNode;
      const parentBookName = parent.dataset.title;
      const index = myLibrary.findIndex((item) => item.name === parentBookName);
      const found = Object.values(myLibrary[index]);

      console.log(found);
      console.log(myLibrary[index]);

      if (found.includes('Yes')) {
        myLibrary[index].read = 'No';
      } else {
        myLibrary[index].read = 'Yes';
      }
      console.log(myLibrary[index]);

      // empty current display and display book using
      displayBook();
    });
  });
}

newBook.addEventListener('click', createForm);
displayButton.addEventListener('click', displayBook);
