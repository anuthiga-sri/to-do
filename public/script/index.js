function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function getQueryParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
}

function highlightSelectedCard(selectedCard) {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('selected');
    });
    selectedCard.classList.add('selected');
}