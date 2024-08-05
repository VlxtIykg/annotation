export default function cardActivator(): void {
	console.log("Start of card activator");
	document.querySelectorAll('.personal_cards').forEach(function (cardWrapper: Element) {
		console.log("Adding wrapper");
		cardWrapper.addEventListener('click', function (this: HTMLElement) {
			this.classList.toggle('expanded');
			console.log('clicked');
		});
	});
};