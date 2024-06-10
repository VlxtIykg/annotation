import cache from "js-cache";
import nullHandler from "./nullhandler";

export default function htmlFormatter(data) {
	cache.set("word", null);
	cache.set("start", null);
	cache.set("end", null);
	cache.set("score", null);
	cache.set("speaker", null);
	return data.map((obj, true_idx) => {
		let htmlElements = Object.entries(obj).map(([key, value]) => {
			const next_interval = data[true_idx + 1];
			// console.log({next_interval});
			cache.set("start_time_2", next_interval?.start_time ?? next_interval?.end_time);
			return generateHTML(key, value)
		}).join('');
		
		htmlElements = "<div class='personal_cards'>" + htmlElements + "</div>";
		return htmlElements;
	}).join('');
}

function generateHTML(key, value) {
	if (!value) value = nullHandler(key);
	if (key === "locale") return;
	if (value === ' ') return;

	cache.set(key, value);
	if (key === 'text') {
		if (value === '.' || value === ',') return punctuations(value);
		return `<span class="space"> </span><p class="text">${value}</p>`;
	}
	if (key === 'speaker') {
		let specific_speaker_cls = "S" + parseInt(value.split("_")[1]);
		return `<p class="speaker ${specific_speaker_cls}">Speaker ${value}</p>`;
	}
  return `<p class="details ${key} ${value}">${key}: ${value}</p>`;
}

function punctuations(arg1) {
	return `<p class="text">${arg1}<br/></p>`;
}

// Path: src/scripts/nullhandler.js
