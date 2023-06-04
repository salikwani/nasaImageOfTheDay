var saveDate = [];

const apiKey = 'jQTZSfWfhMSKAwS6yMxcYzmO5qUjjpl6CXWoGspx';
var date = new Date().toISOString().split("T")[0];
const currentImageContainer = document.getElementById('current-image-container');
const searchForm = document.getElementById('search-form');
const inputDate = document.getElementById('custom-date');
const history = document.getElementById('search-history');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    date = inputDate.value;
    saveSearch();
    addSearchToHistory();
    getImageOfTheDay();
});

async function getImage() {
    try {
        var url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        if(data) {
            document.querySelector('#current-image-container > img').setAttribute('src',`${data.url}`);
            document.querySelector('#current-image-container > h3').innerText = `${data.title}`;
            document.querySelector('#current-image-container > p').innerText = `${data.explanation}`;
        }
    }
    catch(e) {
        console.log('error',e);
    }
}

function getCurrentImageOfTheDay() {
    getImage();
}

getCurrentImageOfTheDay();

function getImageOfTheDay() {
    document.querySelector('#current-image-container > h1').innerText = `Picture on ${date}`;
    getImage();
}

function saveSearch() {
    if(!saveDate.find(e => e==date)) {
        saveDate.push(date);
        localStorage.setItem('saveDate',JSON.stringify(saveDate));
    }
}

function addSearchToHistory() {
    history.innerHTML = "";
    if(localStorage.getItem('saveDate')) {
        saveDate = JSON.parse(localStorage.getItem('saveDate'));
    }
    var l = saveDate.length;
    for(var i=0;i<l;i++) {
        var li = document.createElement('li');
        li.innerText = `${saveDate[i]}`;
        li.setAttribute('id',saveDate[i]);
        li.addEventListener('click',(e)=>display(e.target.id));
        history.appendChild(li);
    }
}

addSearchToHistory();

function display(id) {
    date = id;
    document.querySelector('#current-image-container > h1').innerText = `Picture on ${date}`;
    getImage();
}
