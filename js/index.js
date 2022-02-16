const mainContainerSurah= document.querySelector('.main-section-container');

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

const selectSurahs = (data) => {
    const allSurah = data.chapters;
    allSurah.forEach((e) => {
        const surahBox = document.createElement('a');
        surahBox.className = "surah-box";
        surahBox.setAttribute('data-id',e.id);

        const surahBoxInfo = document.createElement('div');
        surahBoxInfo.className = 'surah-box-info';

        const idSpanSurah = document.createElement('span');
        idSpanSurah.className = 'id';
        idSpanSurah.appendChild(document.createTextNode(e.id));

        const surahBoxName = document.createElement('div');
        surahBoxName.className = 'surah-box-name';

        const englishBoxName = document.createElement('span');
        englishBoxName.className = 'english-name';
        englishBoxName.appendChild(document.createTextNode(e.name_simple));

        const translatedBoxName = document.createElement('span');
        translatedBoxName.className = 'translated-box-name';
        translatedBoxName.appendChild(document.createTextNode(e.translated_name.name));

        surahBoxName.append(englishBoxName, translatedBoxName);
        surahBoxInfo.append(idSpanSurah, surahBoxName);

        const arabicBoxName = document.createElement('span');
        arabicBoxName.className = 'arabic-name';
        arabicBoxName.appendChild(document.createTextNode(e.name_arabic));

        surahBox.append(surahBoxInfo, arabicBoxName);

        mainContainerSurah.appendChild(surahBox);
    })
}

fetch("GET", `https://api.quran.com/api/v4/chapters?language=en`, selectSurahs)
