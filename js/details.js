const surahsList = document.querySelector('.all-surahs-select');
const surahContainer = document.querySelector('.show-surah-container');
const transitionButton = document.querySelector('.transition');
const readingButton = document.querySelector('.reading');

const fetch = (method, url ,callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () =>{
        if(xhr.readyState === 4 && xhr.status === 200){
            const result = JSON.parse(xhr.responseText);
            callback(result);
        }
    }
    xhr.open(method,url);
    xhr.send()
}
// Create Select Options
const selectSurahs = (data) => {
    const allSurah = data.chapters;
    allSurah.forEach((e) => {
        const surahOptions = document.createElement('li');
        surahOptions.className = "surah-name-info";
        surahOptions.setAttribute('data-id',e.id);

        const surahInfo = document.createElement('div');
        surahInfo.className = 'surah-info';

        const idSpan = document.createElement('span');
        idSpan.className = 'id';
        idSpan.appendChild(document.createTextNode(e.id));

        const surahName = document.createElement('div');
        surahName.className = 'surah-name';

        const englishName = document.createElement('span');
        englishName.className = 'en-name';
        englishName.appendChild(document.createTextNode(e.name_simple));

        const arabicName = document.createElement('span');
        arabicName.className = 'ar-name';
        arabicName.appendChild(document.createTextNode(e.name_arabic));

        surahName.append(englishName, arabicName);
        surahInfo.append(idSpan, surahName);

        const translatedName = document.createElement('span');
        translatedName.className = 'translated-name';
        translatedName.appendChild(document.createTextNode(e.translated_name.name));

        surahOptions.append(surahInfo, translatedName);

        surahsList.appendChild(surahOptions);
        
    })
}
const changeSurah = () =>{
    const allListChildren = [...surahsList.children];
    allListChildren.forEach(e => {
       e.onclick = function(){
        surahContainer.innerHTML = '';
           const surahId = this.getAttribute('data-id') ;
           
           const playAudio = (data) => {
            document.getElementById('audio').setAttribute('src', data.audio_files[surahId-1].audio_url);
            //console.log(data.audio_files[0].audio_url)
            }
           
                fetch("GET", `https://api.quran.com/api/v4/chapter_recitations/1`, playAudio)
           if(transitionButton.classList.contains('active')){
            //surahContainer.innerHTML = '';
               fetch("GET", `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahId}`, createSurah);
               fetch("GET", `https://api.quran.com/api/v3/chapters/${surahId}/verses?translations=21&language=en`, translateEveryAyah)
           }else if(readingButton.classList.contains('active')){
            //surahContainer.innerHTML = '';
               fetch("GET", `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahId}`, createAllSurahTest)
           }
           surahsList.classList.remove('show');
        }
    })
    }



// Create Surah for Every Ayah
const createSurah = (data) => {
    const allAyahs = data.verses;
    //surahContainer.innerHTML = '';
        allAyahs.forEach((e) => {
                const ayah = document.createElement('div');
                ayah.className = 'surah-ayahs';
            
                const ayahNumber = document.createElement('div');
                ayahNumber.className = 'ayah-number';
                ayahNumber.append(document.createTextNode(e.verse_key));
            
                const ayahArabic = document.createElement('p');
                ayahArabic.className = 'ayah-arabic';
                ayahArabic.append(document.createTextNode(e.text_uthmani));

                ayah.append(ayahNumber, ayahArabic);
                surahContainer.appendChild(ayah);
        })
        changeSurah()
        }   
        
        const translateEveryAyah = (data) => {
            const translatedAyah = data.verses;
            translatedAyah.forEach((ele,i) => {
                    const ayahEnglish = document.createElement('p');
                    ayahEnglish.className = 'ayah-english';
                    ayahEnglish.append(document.createTextNode(ele.translations[0].text));
                    document.querySelectorAll('.surah-ayahs')[i].appendChild(ayahEnglish)
            })
        }
    // Create All Surah Text
    const createAllSurahTest = (data) => {
        //surahContainer.innerHTML = '';
        const eachAyah = data.verses;
        const surahText = eachAyah.map(element => element.text_uthmani).join('*');
        const suarhTag = document.createElement('p');
        suarhTag.className = 'surah-box';
        suarhTag.appendChild(document.createTextNode(surahText));
        surahContainer.appendChild(suarhTag);
        //changeSurah()
    }

    // When click on transition Button will show every ayah with transition
    const toggleActiveClass1 = () => {
        if(!transitionButton.classList.contains('active')){
            transitionButton.classList.add('active');
            readingButton.classList.remove('active');
            fetch("GET", `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=1`, createSurah) 
            fetch("GET", `https://api.quran.com/api/v3/chapters/1/verses?translations=21&language=en`, translateEveryAyah)
            surahContainer.innerHTML = '';
    }
}
    //When click on reading Button will show all Surah
    const toggleActiveClass2 = () => {
        if(!readingButton.classList.contains('active')){
            readingButton.classList.add('active');
            transitionButton.classList.remove('active');
            surahContainer.innerHTML = '';
            fetch("GET", `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=1`, createAllSurahTest)
        }
    }

    const playAudio = (data) => {
        document.getElementById('audio').setAttribute('src', data.audio_files[0].audio_url);
        //console.log(data.audio_files[0].audio_url)
    }
       
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
fetch("GET", `https://api.quran.com/api/v4/chapter_recitations/1`, playAudio)
fetch("GET", `https://api.quran.com/api/v4/chapters?language=en`, selectSurahs)
fetch("GET", `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${id}`, createSurah) 
//fetch("GET", `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=1`, createAllSurahTest)
fetch("GET", `https://api.quran.com/api/v3/chapters/1/verses?translations=21&language=en`, translateEveryAyah)
