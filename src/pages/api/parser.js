import JSON from 'json5';

/**
 * 
 * @param {array | string} data - Array of file paths
 * @param {string} data - json object
 * @description - If you are expecting to parse multiple files, add a handler like the zip handler 
 * @returns 
 */
export default function autoFill(data, formatter) {
	switch(formatter){
		case "sms": {
			return speechmatics(data);
		}
		default: {
			return whisperx(data);
		}	
	}	
}

function speechmatics(data) {
	try {
		const jsonData = data.results;
		const _temp = jsonData.map(result => fillTemplate(result));
		return _temp;	
	} catch (error) {
		console.error(`Error reading or parsing data:`, error);
	}
}

function whisperx(data) {
	try {
		const jsonData = data.segments;
		const _temp = jsonData.map(result => fillTemplateWhisper(result));
		return _temp.flat();
	} catch (error) {
		console.error(`Error reading or parsing data:`, error);	
	}
}

// vanillaJS
function isJSON(str) {
	try {
		JSON.parse(str);
	} catch (e) {
			return false;
	}
	return true;
}
function fillTemplateWhisper(json) {
	const kami = []

	for(let i = 0; i < json.words.length; i++){
		const template = {
			start_time: '',
			end_time: '',
			confidence: '',
			text: '',
			speaker: ''
		};
		
		const ongod = json.words[i]
		
		template.start_time = ongod?.start;
		template.end_time = ongod?.end;
		template.confidence = ongod?.score;
		template.text = ongod?.word;
		template.speaker = ongod?.speaker;
		kami.push(template)
	}
	
return kami

}
function fillTemplate(json) {
	const template = {
		start_time: '',
		end_time: '',
		type: '',
		confidence: '',
		text: '',
		locale: '',
		speaker: ''
	};

	const alternative = json?.alternatives?.[0]; // Assuming there's only one alternative
	template.start_time = json?.start_time;
	template.end_time = json?.end_time;
	template.type = json?.type;
	template.confidence = alternative?.confidence;
	template.text = alternative?.content;
	template.locale = alternative?.language;
	template.speaker = alternative?.speaker;
	return template;
}