export default function htmlFormatter(data) {
	const htmlText = data.map(obj => {
		const htmlElements = Object.entries(obj).map(([key, value]) => generateHTML(key, value)).join('');
		return htmlElements;
	}).join('');

	return `<div id="diarized_text" class="container">${htmlText}</div>`;
}


function generateHTML(key, value) {
  return `<p class="details ${key} ${value}">${key}: ${value}</p><br/>\n`;
}
