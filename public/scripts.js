const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');

/**
 * Para cada card clicado, adiciona a classe 'active' e seleciona o video
 * correto através do ID de cada card
 */
for (let card of cards) {
    card.addEventListener('click', () => {
        const videoId = card.getAttribute('id');
        window.location.href = `/video?id=${videoId}`;
    });
}





