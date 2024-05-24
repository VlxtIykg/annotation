export default function parseJSON(jsonString) {
	try {
		const parsedData = JSON.parse(jsonString);
		console.log('Parsed JSON:', parsedData);
		return JSON.stringify(parsedData, null, 2);
	} catch (error) {
		console.error('Error parsing JSON:', error);
		return null;
	}
}