//These are to be changed for every page
const maxAyahs = 18;
let ayahsIndex = 10;

let ispageHidden = true;

document.addEventListener('keydown', function (event) {

    const ayahDivs = document.querySelectorAll('div[class*="ayah"]');

    //Delete resets progress
    if (event.key === 'Delete') {
        ayahDivs.forEach(function (div) {
            div.style.backgroundColor = '#ffffff';
            ayahsIndex = 10;
            ispageHidden = true;
        });
    }

    //Spacebar reveals page
    if (event.key === ' ') {
        event.preventDefault();
        ayahDivs.forEach(function (div) {
            div.style.backgroundColor = 'transparent';
            ayahsIndex = maxAyahs;
            ispageHidden = false;
        });
    }

    if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (ayahsIndex <= maxAyahs - 1 || !ispageHidden) {
            ayahsIndex++;
            const className = `.ayah${String(ayahsIndex).padStart(3, '0')}`;

            const targetDivs = document.querySelectorAll(className);
            console.log("You pressed down.");
            console.log('Pressed down', ayahsIndex, targetDivs);

            targetDivs.forEach(element => {
                element.style.backgroundColor = 'transparent';
            });
        }
    }
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        console.log("You pressed up.");
        console.log('index is ', ayahsIndex)
        if (ayahsIndex > 0) {
            const className = `.ayah${String(ayahsIndex).padStart(3, '0')}`;
            const targetDivs = document.querySelectorAll(className);
            if (targetDivs) {
                targetDivs.forEach(element => {
                    element.style.backgroundColor = '#ffffff';
                });
            }
            ayahsIndex--;
        }
    }

});