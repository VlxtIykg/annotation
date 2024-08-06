import nullHandler from "./nullhandler";
import cache from "./cacheHandler";

const test_template = {
  start_time: "",
  end_time: "",
  confidence: "",
  text: "",
  speaker: "",
};

for (const item in test_template) {
  cache.set("text", "at", 5000);
  cache.set("start_time", 39.407, 5000);
  cache.set("start_time_2", 40.087, 5000);
  cache.set("end_time", 39.467, 5000);
  cache.set("confidence", 0.778, 5000);
  cache.set("speaker", "SPEAKER_01", 5000);
  cache.set("next_speaker", "SPEAKER_01", 5000);
  const nom = nullHandler(item);
  console.log(`${item}: ${nom}`);
}
