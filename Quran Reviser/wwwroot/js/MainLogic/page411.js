let ayahsIndex = 0;
let ispageHidden = true;
const maxAyahs = 10;

document.addEventListener('keydown', function (event) {
    const ayahDivs = document.querySelectorAll('div[class*="ayah"]');

    if (event.key === 'Delete') {
        ayahDivs.forEach(function (div) {
            div.style.backgroundColor = '#ffffff';
            ayahsIndex = 0;
            ispageHidden = true;
        });
    }

    if (event.key === ' ') {
        event.preventDefault();
        ayahDivs.forEach(function (div) {
            div.style.backgroundColor = 'transparent';
            ayahsIndex = maxAyahs;
            ispageHidden = false;
        });
    }

    if (ispageHidden) {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (ayahsIndex <= maxAyahs - 1) {
                ayahsIndex++;
                const className = `.ayah${String(ayahsIndex).padStart(3, '0')}`;

                const targetDivs = document.querySelectorAll(className);
                console.log('action', ayahsIndex, targetDivs);

                targetDivs.forEach(element => {
                    element.style.backgroundColor = 'transparent';
                });
            }
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
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
    }
});