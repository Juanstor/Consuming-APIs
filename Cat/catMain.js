const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites';
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';
const spanError = document.getElementById('error')


async function loadRandomDogs() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    
    console.log('Random')
    console.log(data)

    if (res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + res.status + " → " + data.message;
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');

        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick = () => saveFavoriteDog(data[0].id);
        btn2.onclick = () => saveFavoriteDog(data[1].id);
    }
}

async function loadFavoriteDogs() {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'live_N6Rgqu4It0XrhjY91dQDx1UAyBGXFlXJIM6fhbUiwfrORaleyO4Esm9wRG04YQkY'
        }
    }); 
    const data = await res.json();

    console.log('Favoritos')
    console.log(data)
    
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        const section = document.getElementById('favorites');
        section.innerHTML = "";

        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Favorites');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(doggy => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Quitar de favoritos');

            img.src = doggy.image.url;
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavoriteDog(doggy.id); 
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        })
    };
}

async function saveFavoriteDog(id) {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'live_N6Rgqu4It0XrhjY91dQDx1UAyBGXFlXJIM6fhbUiwfrORaleyO4Esm9wRG04YQkY',
        },
        body: JSON.stringify({
            image_id: id
        }),
        });
    const data = await res.json();

    console.log('Save')
    console.log(res)

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        console.log('Se guardó el doggo en favoritos');
        loadFavoriteDogs();
    }
}

async function deleteFavoriteDog(id) {
    const res = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': 'live_N6Rgqu4It0XrhjY91dQDx1UAyBGXFlXJIM6fhbUiwfrORaleyO4Esm9wRG04YQkY',
        }
        });
        const data = await res.json();
    
        console.log('Save')
        console.log(res)
        if (res.status !== 200) {
            spanError.innerHTML = "Hubo un error: " + res.status + data.message;
        } else {
            console.log('Se eliminó el doggo de favoritos')
            loadFavoriteDogs()
        }
}

async function uploadDoggyPhoto() {
    const form = document.getElementById('uploadiongForm');
    const formData = new FormData(form);

    console.log(formData.get('file'));

    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            'X-API-KEY': 'live_N6Rgqu4It0XrhjY91dQDx1UAyBGXFlXJIM6fhbUiwfrORaleyO4Esm9wRG04YQkY',
        },
        body: formData,
    })
    const data = await res.json();

    if (res.status !== 201) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
        console.log({data})
    } else {
        console.log('Foto de perrito subida')
        console.log({data})
        console.log(data.url)
        saveFavoriteDog(data.id);
    }
}

loadRandomDogs();
loadFavoriteDogs()