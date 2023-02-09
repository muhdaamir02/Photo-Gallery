const btnel = document.getElementById("btn");
const errormsgel = document.getElementById("errormsg");
const photosel = document.getElementById("photos");

async function fetchImage() {
    const inputVal = document.getElementById("input").value;

    if (inputVal > 10 || inputVal < 1) {
        errormsgel.style.display = "block";
        return;
    }

    urls = "";

    try {
        btnel.style.display = "none";
        const loading = `<img src="Spinner.svg">`;
        photosel.innerHTML = loading;
        await fetch(`https://api.unsplash.com/photos?per_page=${inputVal}&page=${Math.round(Math.random() * 1000)}&client_id=hChIqWFhrfkzkQzlsCnCKoJexeG1lvkXfZqFSaJUpt4`).then((res) => res.json().then((data) => {
            if (data) {
                data.forEach((pic) => {
                    urls += `
                    <img src=${pic.urls.small} alt="image">
                    `
                    photosel.innerHTML = urls;
                    photosel.style.display = "block";
                    btnel.style.display = "block";
                    errormsgel.style.display = "none";
                });
            }
        })
        );
    } catch (error) {
        errormsgel.style.display = "block";
        btnel.style.display = "block";
        errormsgel.innerHTML = "An error happend see console";
    }
}

btnel.addEventListener("click", fetchImage);