export default function htmlFormatter(data) {
	return data.map(obj => {
		let htmlElements = Object.entries(obj).map(([key, value]) => generateHTML(key, value)).join('');
		
		htmlElements = "<div class='personal_cards'>" + htmlElements + "</div>";
		return htmlElements;
	}).join('');
}

function generateHTML(key, value) {
	if (key === 'text') {
		if (value === '.') return '<p class="text">.<br/></p>';
		if (value === ',') return '<p class="text">,<br/></p>';
		if (value === ' ') return;
		return `<span class="space"> </span><p class="text">${value}</p>`;
}
  return `<p class="details ${key} ${value}">${key}: ${value}</p>`;
}
