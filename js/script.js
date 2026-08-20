const track = document.querySelector(".reviews-track");

const originalCards = Array.from(track.children);

originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
})


let oneSetWidth = 0;
originalCards.forEach((card) => {
    oneSetWidth += card.offsetWidth;
});

let position = 0;
const speed = 1;

function animate() {
    position -= speed;

    if (Math.abs(position) >= oneSetWidth) {
        position = 0;
    }

    track.style.transform = `translateX(${position}px)`;
    updateActiveDot();

    requestAnimationFrame(animate);
}






const dots = Array.from(document.querySelectorAll(".reviews-dot"));
const wrapper = document.querySelector(".reviews-track-wrapper");

function updateActiveDot() {
    const wrapperCenter = wrapper.offsetWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    const allCards = Array.from(track.children);

    allCards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + position + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - wrapperCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
        }
    })

    const activeDotIndex = closestIndex % 9;

    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === activeDotIndex);
    })
}

animate();