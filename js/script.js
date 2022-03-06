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
// display search result
const getSearchResult = (phones) => {
    // if product not found
    if (phones.length === 0) {
        spinner.classList.remove('spinner');
        error.innerText = 'did not founds any phone';
    }
    // first 20 result show
    const firstPageResult = phones.slice(0, 20);
    firstPageResult.forEach(phone => {
        const createDivPhone = document.createElement('div');
        createDivPhone.classList.add('grid-item', 'animate-bottom');
        spinner.classList.remove('spinner');
        createDivPhone.innerHTML = `
            <img src="${phone.image}" alt="phone" class="avatar">
            <p class="product-title">Phone Name: ${phone.phone_name}</p>
            <p class="product-title">Brand: ${phone.brand}</p>
            <button class="details-btn" onclick="getDetailsAPI('${phone.slug}')">Details</button>`;
        container.appendChild(createDivPhone);
    });
    // rest of them result show
    if (phones.length >= 21) {
        showMoreBtn[0].style.display = 'block';
        const showMoreResult = phones.slice(20, phones.length);
        showMoreBtn[0].addEventListener('click', () => {
            showMoreResult.forEach(phone => {
            const createDiv = document.createElement('div');
            createDiv.classList.add('grid-item', 'animate-bottom');
            spinner.classList.remove('spinner');
            createDiv.innerHTML = `
                <img src="${phone.image}" alt="phone" class="avatar">
                <p class="product-title">Phone Name: ${phone.phone_name}</p>
                <p class="product-title">Brand: ${phone.brand}</p>
                <button class="details-btn" onclick="getDetailsAPI('${phone.slug}')">Details</button>`;
            container.appendChild(createDiv);
            });
            showMoreBtn[0].style.display = 'none';
        });
    }
};
// get details single phone
const getDetailsAPI = (slug) => {
    // spinner add
    spinner.classList.add('spinner');
    showMoreBtn[0].style.display = 'none';
    try {
        fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
        .then(response => response.json())
        .then(data => getDetailsPhone(data.data));
    } catch (error) {
        console.log(error);
    }
    // previous UI empty
    container.textContent = '';
}
// get details phone in single page
const getDetailsPhone = (phone) => {
    createDiv.classList.add('grid-item', 'animate-bottom');
    spinner.classList.remove('spinner');
    createDiv.innerHTML = `
        <img src="${phone.image}" alt="phone" class="avatar">
        <p class="product-title">Phone Name: ${phone.name}</p>
        <p class="product-title">Brand: ${phone.brand}</p>
        <h3>${phone.releaseDate ? phone.releaseDate : 'Release Date: Not Get'}</h3>
        <div>
        <h3>Main Features:</h3>
        <table>
        <tr>
            <td>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No'}</td>
            <td>Chip Set: ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'No'}</td>
        </tr>
        <tr>
            <td>Display Size: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No'}</td>
            <td>Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : "No"}</td>
        </tr>
        </table>
        <h3>Sensors:</h3>
        <table>
        <tr>
            <td>${phone.mainFeatures.sensors[0] ? phone.mainFeatures.sensors[0] : 'No'}</td>
            <td>${phone.mainFeatures.sensors[1] ? phone.mainFeatures.sensors[1] : 'No'}</td>
        </tr>
        <tr>
            <td>${phone.mainFeatures.sensors[2] ? phone.mainFeatures.sensors[2] : 'No'}</td>
            <td>${phone.mainFeatures.sensors[3] ? phone.mainFeatures.sensors[3] : 'No'}</td>
        </tr>
        <tr>
            <td>${phone.mainFeatures.sensors[4] ? phone.mainFeatures.sensors[4] : 'No'}</td>
            <td>${phone.mainFeatures.sensors[5] ? phone.mainFeatures.sensors[5] : 'No'}</td>
        </tr>
        </table>
        <h3>Others:</h3>
        <table>
        <tr>
            <td>Bluetooth: ${phone.others ? phone.others.Bluetooth : 'No'}</td>
            <td>GPS: ${phone.others ? phone.others.GPS : 'No'}</td>
        </tr>
        <tr>
            <td>NFC: ${phone.others ? phone.others.NFC : 'No'}</td>
            <td>Radio: ${phone.others ? phone.others.Radio : 'No'}</td>
        </tr>
        <tr>
            <td>USB: ${phone.others ? phone.others.USB : 'No'}</td>
            <td>WLAN: ${phone.others ? phone.others.WLAN : 'No'}</td>
        </tr>
        </table>
        </div>`;  
    container.appendChild(createDiv);
    container.classList.add('single-page');
    console.log(phone);
} 
