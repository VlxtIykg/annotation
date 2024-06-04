export default function findUniqueSpeakers(e) {
	const speakers = [];
	const cards = document.getElementsByClassName('personal_cards');
	
	// ['S1', 'S1', 'S1', 'S1', 'S1', 'S2', 'S2', 'S2', 'S3', 'S1', 'S3', 'S2']
	for (let card of cards) {
		const speaker_number = card?.getElementsByClassName('speaker'); // S3
		if (speaker_number === null || speaker_number === undefined) return;
		const current_speaker = speaker_number[0].classList[2];
		const previous_speaker = speakers[speakers.length - 1];
		if (previous_speaker === undefined) {
			speakers.push(current_speaker);
			continue;
		}
		if (previous_speaker !== current_speaker) {
			console.log({
				previous_speaker,
				current_speaker
			})
			
			const filler = document.createElement('div');
			filler.classList.add('filler');
			filler.classList.add('grow');
			filler.classList.add('w-full');
			console.log(card)
			card.previousSibling.insertAdjacentElement("afterend", filler);
			card.previousSibling.insertAdjacentElement("afterend", document.createElement('br'));
		}
		speakers.push(current_speaker);
	}
	
	console.log(speakers);

}



