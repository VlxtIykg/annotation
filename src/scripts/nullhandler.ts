import cache from "./cacheHandler";

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

function start_time(): number {
	let mysterious_value = cache.get("end_time") ?? cache.get("start_time") ?? 0;
	return mysterious_value;
}

function end_time(): number | string {
	let mysterious_value = cache.get("start_time_2") ?? cache.get("end_time") ?? cache.get("start") ?? 0;
	return mysterious_value;
}

function confidence(): number {
	return 0.00;
}

function speaker(): string {
	let previous = cache.get("speaker");
	let next = cache.get("next_speaker");
	let mysterious_value = previous ?? next ?? "SPEAKER_N/A";
	return mysterious_value;
}

function text(): string {
	return "N/A (Error in transit)";
}