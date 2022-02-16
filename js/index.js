const contentOfChapters = document.querySelector("#content");




// function fetch (method,url,cb){
//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = ()=>{
//         if(xhr.readyState === 4){
//             if(xhr.status === 200){
//                 const resultObj = JSON.parse(xhr.responseText);
//                 cb(resultObj)
//             }
//         }
//     }
//     xhr.open(method,url);
//     xhr.send();
// }





function generatDiv () {
    const url = `https://api.quran.com/api/v4/chapters?language=en`;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                const resultObj = JSON.parse(xhr.responseText);
                console.log(resultObj);
                resultObj.chapters.forEach((ele)=>{
                    const newDiv = document.createElement("a");
                    newDiv.id = "container-of-surah";
                    const newSpan = document.createElement("span");
                    newSpan.id = "surah-card-number";
                    newSpan.textContent = ele.id;

                    const divNameSurah = document.createElement("div");
                    divNameSurah.id = "surah-details";

                    const h21 = document.createElement("h2");
                    h21.textContent = ele.name_simple;
                    divNameSurah.appendChild(h21);

                    const h22 = document.createElement("h2");
                    h22.textContent = ele.name_arabic;
                    divNameSurah.appendChild(h22);

                    newDiv.appendChild(newSpan);
                    newDiv.appendChild(divNameSurah);

                    contentOfChapters.appendChild(newDiv);

                    newDiv.style = "height:80px"


                })
                
            }
        }
    }
    xhr.open("GET",url);
    xhr.send();
}
generatDiv ();

