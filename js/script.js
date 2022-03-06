const input = document.getElementById('search');
const formId = document.getElementById('form');
const container = document.getElementById('container');
const spinner = document.getElementById('spinner');
const error = document.getElementById('error');
const createDiv = document.createElement('div');
const showMoreBtn = document.getElementsByClassName('show-more');
// html form event handler
formId.addEventListener('submit', (event) => {
    spinner.classList.add('spinner');
    event.preventDefault();
    let letters = /[a-z]/i;
    const userQuery = input.value;
    if (userQuery === '' || !userQuery.match(letters)) {
        spinner.classList.remove('spinner');
        container.textContent = '';
        input.value = '';
        error.innerText = 'Please give a valid phone name';
    }
    else {
        spinner.classList.add('spinner');
        loadAPI(userQuery.toLowerCase());
        input.value = '';
        container.textContent = '';
        container.classList.remove('single-page');
        createDiv.textContent = '';
        error.textContent = '';
    }
});
// Load API for Search  
const loadAPI = (query) => {
    try {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${query}`)
            .then(response => response.json())
            .then(data => getSearchResult(data.data));
    } catch (error) {
        console.log(error);
        error.innerText = `${error}`;
    }
};