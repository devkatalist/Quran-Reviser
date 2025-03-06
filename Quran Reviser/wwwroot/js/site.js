// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.


//Handle next/previous page
document.addEventListener("keydown", function (event) {
    const currentUrl = window.location.href; // Get current URL
    const match = currentUrl.match(/(page)(\d+)$/); // Match "page" followed by numbers at the end

    if (match) {
        const currentPageNumber = parseInt(match[2]); // Extract current page number
        let newPageNumber;

        if (event.key === "ArrowLeft") {
            newPageNumber = currentPageNumber + 1; // Increment for left arrow
        } else if (event.key === "ArrowRight") {
            newPageNumber = currentPageNumber - 1; // Decrement for right arrow
        } else {
            return; // Exit if it's not left or right arrow key
        }

        if (newPageNumber < 1) {
            alert("No previous page available."); // Prevent navigating below page 1
            return;
        }

        let newUrl = currentUrl.replace(/(page)\d+$/, `page${newPageNumber}`);

        // Check if the new page exists before navigating
        fetch(newUrl, { method: "HEAD" })
            .then(response => {
                if (response.ok) {
                    window.location.href = newUrl; // Navigate to the new page
                } else {
                    alert("No more pages."); // Show alert if the page does not exist
                }
            })
            .catch(() => alert("No page found.")); // Handle errors
    }
});

//Handle main logic of hiding/showing ayahs
document.addEventListener("DOMContentLoaded", function () {
    //data-maxayahs="18" data-ayahsindex="10
    let pageElement = document.getElementById("page-data");
    if (!pageElement) {
        console.warn("Page data not found.");
        return; // Exit if no page data
    }

    const maxAyahs = parseInt(pageElement.dataset.maxAyahs);
    let ayahsIndex = parseInt(pageElement.dataset.ayahsIndex);

    //console.log(`Current page max ayahs: ${maxAyahs}, Index: ${ayahsIndex}`);
    let ispageHidden = true;

    document.addEventListener('keydown', function (event) {

        const ayahDivs = document.querySelectorAll('div[class*="ayah"]');

        //Delete resets progress (all ayahs are hidden)
        if (event.key === 'Delete') {            
            ayahDivs.forEach(function (div) {
                div.style.backgroundColor = '#ffffff';
                ayahsIndex = 0;
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
                console.log('Down pressed. Ayahs Index is now', ayahsIndex);

                targetDivs.forEach(element => {
                    element.style.backgroundColor = 'transparent';
                });
            }
        }
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            console.log('Up pressed. Ayahs Index is now', ayahsIndex);
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
    

});


