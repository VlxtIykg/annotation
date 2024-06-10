export default function nullHandler(key) {
		switch (key) {
			case "text": {
				return text();
			}
			case "start_time": {
				return start_time();
			}
			case "end_time": {
				return end_time();
			}
			case "confidence": {
				return confidence();
			}
			case "speaker": {
				return speaker();
			}
			default: {
				return "N/A (Error in transit)";
			}
		}

}

function start_time() {
	// return "00.00";
	mysterious_value = cache.get("end_time");
	return;
}

function end_time() {
	// return "00.00";
	mysterious_value = cache.get("start_time_2");
	return;
}

function confidence() {
	return "0.00";
}

function speaker() {
	// return "SPEAKER_N/A";
	mysterious_value = cache.get("speaker");
	
	return;
}

function text() {
	return "N/A (Error in transit)";
}