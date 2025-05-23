document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.card__row');
    const templateCard = document.querySelector('.col-md-3');
    templateCard.remove();

    for (let i = 0; i < 731; i++) {
        // Generar un número aleatorio entre 1 y 731 (suponiendo que haya 731 héroes en la API)
        // const randomHeroId = Math.floor(Math.random() * 731) + 1;

        fetch(`https://www.superheroapi.com/api.php/3655635531370779/${i}`)
            .then(response => response.json())
            .then(data => {
                const cardClone = templateCard.cloneNode(true); // Clonar la plantilla del card HTML

                // Llenar la tarjeta clonada con la información del héroe
                cardClone.querySelector('#imagen').src = data.image.url;
                cardClone.querySelector('#nombre').textContent = data.name;
                cardClone.querySelector('#nombre_real').textContent = data.biography['full-name'] || data.name;

                if (data.powerstats.intelligence == "null") {
                    cardClone.querySelector('.card__int').style.width = '1%';
                } else {
                    cardClone.querySelector('.card__int').style.width = `${data.powerstats.intelligence}%`;
                } if (data.powerstats.strength == "null") {
                    cardClone.querySelector('.card__str').style.width = '1%';
                } else {
                    cardClone.querySelector('.card__str').style.width = `${data.powerstats.strength}%`;
                } if (data.powerstats.speed == "null") {
                    cardClone.querySelector('.card__spd').style.width = '1%';
                } else {
                    cardClone.querySelector('.card__spd').style.width = `${data.powerstats.speed}%`;
                } if (data.powerstats.durability == "null") {
                    cardClone.querySelector('.card__dur').style.width = '1%';
                } else {
                    cardClone.querySelector('.card__dur').style.width = `${data.powerstats.durability}%`;
                } if (data.powerstats.combat == "null") {
                    cardClone.querySelector('.card__com').style.width = '1%';
                } else {
                    cardClone.querySelector('.card__com').style.width = `${data.powerstats.combat}%`;
                } if (data.powerstats.power == "null") {
                    cardClone.querySelector('.card__pwr').style.width = '1%';
                } else {
                    cardClone.querySelector('.card__pwr').style.width = `${data.powerstats.power}%`;
                }

                cardClone.querySelector('.raza').textContent = data.appearance.race;
                cardClone.querySelector('.genero').textContent = data.appearance.gender;
                cardClone.querySelector('.trabajo').textContent = data.work.occupation;
                cardClone.querySelector('.aparicion').textContent = data.biography['first-appearance'];
                cardClone.querySelector('.publisher').textContent = data.biography.publisher;

                if (data.biography.alignment == "good") {
                    cardClone.querySelector('.malobueno').src = "img/angel.png"
                } if (data.biography.alignment == "bad") {
                    cardClone.querySelector('.malobueno').src = "img/evil.png"
                } if (data.biography.alignment == "neutral") {
                    cardClone.querySelector('.malobueno').src = "img/neutral.png"
                }

                container.appendChild(cardClone); // Agregar la tarjeta clonada al contenedor deseado en el DOM

            })

            .catch(error => {
                console.error('Error fetching data from API:', error);
            });
    }
    // const cards = document.querySelectorAll('.card');
    // console.log("Conjunto de cards: " + cards)
    // cards.forEach(card => {
    //     console.log("Card por separado: " + card)
    //     card.addEventListener('click', function () {
    //         this.classList.toggle('card--flipped');
    //     });
    // });

    container.addEventListener('click', function (event) {
        const targetCard = event.target.closest('.card');
        if (targetCard) {
            targetCard.classList.toggle('card--flipped');
        }
    });

});