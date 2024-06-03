// document.addEventListener('DOMContentLoaded', main);

document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('submit', function(event) {
    console.log("BRKLine script has loaded: L2C")
    findUniqueSpeakers(event)
})})

function findUniqueSpeakers(e) {
    e.preventDefault()
    console.log("Starting extraction")
    const p_cards = document.getElementsByClassName("personal_cards");
    console.log(p_cards, p_cards.length);
    // console.log(p_cards)
    // console.log(p_cards.length)
    if (p_cards.length === 0) return
    for (let i = 0; i < p_cards.length; i++) {
        console.log("p_cards" + i);
        console.log(p_cards[i]);
    }
}