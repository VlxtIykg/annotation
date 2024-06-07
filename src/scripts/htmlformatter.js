import cache from "js-cache";

export default function htmlFormatter(data) {
	console.log(data)
	return data.map(obj => {
		let htmlElements = Object.entries(obj).map(([key, value]) => generateHTML(key, value)).join('');
		
		htmlElements = "<div class='personal_cards'>" + htmlElements + "</div>";
		return htmlElements;
	}).join('');
}

function generateHTML(key, value) {
	console.log("Key: ", key, "Value: ", value)

	if (key === "locale") return
	if (key === 'text') {
		if (value === '.') return '<p class="text">.<br/></p>';
		if (value === ',') return '<p class="text">,<br/></p>';
		if (value === ' ') return;
		cache.get("Hewo", (v) => {
			console.log({v})
			return v
		})		
		return `<span class="space"> </span><p class="text">${value}</p>`;
	}
	if (key === 'speaker') {
		console.log(value.split("_")[1] ?? cache.get(key));
		let specific_speaker_cls = "S" + parseInt(value.split("_")[1]);
		return `<p class="speaker ${specific_speaker_cls}">Speaker ${value}</p>`;
	}
	cache.set(key, value);
  return `<p class="details ${key} ${value}">${key}: ${value}</p>`;
}


generateHTML()