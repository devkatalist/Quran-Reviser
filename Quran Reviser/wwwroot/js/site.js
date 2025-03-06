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



