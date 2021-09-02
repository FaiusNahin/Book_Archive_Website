// Input fild for find Books 
const loadBooks = () => {
    // Input Field
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    // No Input Error
    const noInput = document.getElementById('not-found');
    noInput.innerText = '';

    const booksContainer = document.getElementById('books');
    booksContainer.textContent = '';

    if (searchText === '') {
        const h1 = document.createElement('h1');
        h1.classList.add('text-center', 'text-danger')
        h1.innerText = 'Please! Give Some Search Items';
        noInput.appendChild(h1);
    }

    // Fetch data from API
    else {
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
            .then(res => res.json())
            .then(data => displayBooks(data))
    }
}

// Search Books Results Function
const displayBooks = data => {
    // Not Result Found 
    const notFound = document.getElementById('not-found');
    notFound.innerText = '';
    const h1 = document.createElement('h1');
    h1.classList.add('text-center', 'text-danger', 'mt-5');

    // Books Search Result
    if (data.numFound !== 0) {
        h1.innerText = `Total Result Found: ${data.numFound}`;
    }
    else {
        h1.innerText = 'No Result Found';
    }
    notFound.appendChild(h1);

    // Found Books Result
    const books = data.docs;
    const booksContainer = document.getElementById('books');
    booksContainer.textContent = '';

    // Show 30 books result
    books.slice(0, 30).forEach(book => {
        // error handle for author name & publisher
        const findArray = item => {
            if (!item) {
                return '';
            }
            else {
                return item[0];
            }
        }

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
          <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : ''}-M.jpg" 
                class="card-img-top" alt="..." style="height:450px;" >
            <div class="card-body mt-5">
              <h4 class="card-title text-primary"><span class="fw-bold text-success">Book Name:</span> ${book.title ? book.title : ''}</h4>
              <p class="card-text"><span class="fw-bold text-success">Author Name:</span> ${findArray(book.author_name)}</p>
              <p class="card-text"><span class="fw-bold text-success">Publisher:</span> ${findArray(book.publisher)}</p>
              <p class="card-text"><span class="fw-bold text-success">First Publish:</span> ${book.first_publish_year ? book.first_publish_year : ''}</p >
            </div >
          </div >
    `;
        booksContainer.appendChild(div);
    })
}