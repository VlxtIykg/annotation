export default function htmlFormatter(data) {
	const htmlText = data.map(obj => {
		let htmlElements = Object.entries(obj).map(([key, value]) => generateHTML(key, value)).join('');
		htmlElements = "<div class='personal_card'>" + htmlElements + "</div>";
		return htmlElements;
	}).join('');

	return htmlText;
}


function generateHTML(key, value) {
	if (key === 'text') {
		value = value.replace(/\s/g, '');
		// console.log('"' + value + '"');
		if (value === '.') return '.<br/>';
		if (value === ' ') return;
		return `<p class="text">${value}</p>`;
	}
  return `<p class="details ${key} ${value}">${key}: ${value}</p><br/>\n`;
}
