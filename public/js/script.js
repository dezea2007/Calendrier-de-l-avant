const toggler = document.querySelector(".hamburger");
const navLinksContainer = document.querySelector(".list-items");

const toggleNav = (e) => {
	navLinksContainer.classList.toggle("open");
};

toggler.addEventListener("click", toggleNav);

new ResizeObserver((entries) => {
	if (entries[0].contentRect.width <= 776) {
		navLinksContainer.style.transition = "transform 0.3s ease-out";
	} else {
		navLinksContainer.style.transition = "none";
	}
}).observe(document.body);
