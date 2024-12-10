let ul = document.querySelector('ul');
let surahDetails = document.querySelector('#surahDetails'); // Div-ka suuradda lagu soo bandhigi doono
let audioPlayer = document.querySelector('#audioPlayer'); // Audio player-ka suuradda (should be <audio>)

// Function-ka soo saaraya magacyada suuradaha
function AllSurah(link) {
    fetch(link)
    .then(res => res.json())
    .then(quran => {
        let AllData = '';
        quran.data.forEach((item) => {
            AllData += `<li data-surah="${item.number}">
                            <span>${item.number}</span> 
                            <span id='surah'>${item.name}</span>
                        </li>`;
        });
        ul.innerHTML = AllData;

        // Ku dar dhacdooyin dhageysiga liis kasta
        document.querySelectorAll('li').forEach(li => {
            li.addEventListener('click', (e) => {
                let surahNumber = e.currentTarget.getAttribute('data-surah');
                getSurahDetails(surahNumber); // Wac shaqada soo bandhigaysa suuradda oo dhameystiran iyo maqalka
            });
        });
    })
    .catch(error => {
        console.error('Error fetching the Quran data:', error);
        ul.innerHTML = "<li>Waxaa dhacay qalad, fadlan isku day mar kale.</li>";
    });
}

// Function-ka soo saaraya suuradda oo dhameystiran iyo maqalka
function getSurahDetails(surahNumber) {
    fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`)
    .then(res => res.json())
    .then(surah => {
        let surahContent = `<h2>${surah.data.name}</h2>`;
        surah.data.ayahs.forEach(ayah => {
            surahContent += `<p><strong>${ayah.numberInSurah}:</strong> ${ayah.text}</p>`;
        });
        surahDetails.innerHTML = surahContent;

        // URL-ka maqalka ee suuradda oo dhan
        let audioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${surahNumber}.mp3`;
        console.log("Maqalka URL-ka: ", audioUrl);

        if (audioUrl) {
            audioPlayer.src = audioUrl; // U dir maqalka player-ka
            audioPlayer.style.display = 'block'; // Muujinta audio player-ka
            audioPlayer.play(); // Bilaabidda maqalka suuradda
        } else {
            console.error("Maqalka lama helin");
            audioPlayer.style.display = 'none'; // Haddii aan maqalka la helin
        }
    })
    .catch(error => {
        console.error('Error fetching the Surah details:', error);
        surahDetails.innerHTML = "<p>Waxaa dhacay qalad, fadlan isku day mar kale.</p>";
    });
}

// Bilow soo saarida magacyada suuradaha
AllSurah('https://api.alquran.cloud/v1/surah');
