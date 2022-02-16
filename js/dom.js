const lightButton = document.getElementById('light');
const nightButton = document.getElementById('night');
const showSurahsList = document.querySelector('.first-surah');
const surahList = document.querySelector('.all-surahs-select');

const addEvent = (selector, event, callback) => {
    selector.addEventListener(event, callback);
}
const blackBackground = () => {
    document.body.style.backgroundColor = '#1c1c20';
    document.body.style.color = '#fff';
}
const whiteBackground = () => {
    document.body.style.backgroundColor = '#fff';
    document.body.style.color = '#000';
}
const showSurahsListFunction = () => {
    if(surahList.classList.contains('show')){
        surahList.classList.remove('show');
    }else{
        surahList.classList.add('show');
    }
}

addEvent(lightButton, 'click', whiteBackground);
addEvent(nightButton, 'click', blackBackground);
addEvent(showSurahsList, 'click', showSurahsListFunction);
addEvent(transitionButton, 'click', toggleActiveClass1);
addEvent(readingButton, 'click', toggleActiveClass2);