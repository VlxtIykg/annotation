export default function cardActivator() {
	console.log("Start of card activator");
	document.querySelectorAll('.personal_cards').forEach(function (cardWrapper) {
		console.log("Adding wrapper");
		cardWrapper.addEventListener('click', function () {
			this.classList.toggle('expanded');
			console.log('clicked');
		});
	});
};