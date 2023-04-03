// Consuming API cat
async function getCatImage() {
    try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search');
        const data = await response.json();
        
        return data[0].url;
    } catch (error) {
        console.error(error);
        console.log("unable to get the image");
    }
}

async function showCatImage() {
    try {
        const catImage = await getCatImage();
        const img = document.querySelector('img');
        img.src = catImage;
    } catch (error) {
        console.error(error);
        console.log("unable to show the kitty");
    }
}

showCatImage();



//Event click buttom 
let buttomNextCat = document.querySelector('.buttom--next-cat');

buttomNextCat.addEventListener('click', function() {
    showCatImage();
});



//ANOTHER WAY TO GET THE IMAGE WITH FETCH

// const URL = 'https://api.thecatapi.com/v1/images/search';
// fetch(URL)
//     .then(res => res.json())
//     .then(data => {
//         const img = document.querySelector('img');
//         img.src = data[0].url;
//     })