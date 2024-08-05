import JSON from "json5";

/**
 *
 * @param {array | string} data - Array of file paths
 * @param {string} data - json object
 * @description - If you are expecting to parse multiple files, add a handler like the zip handler
 * @returns
 */
export default function autoFill(data: SpeechmaticsData | WhisperData , formatter: string): WhisperJson[] | SpeechmaticJson[] | undefined {
  switch (formatter) {
    case "sms": {
      return speechmatics(data as SpeechmaticsData);
    }
    default: {
      return whisperx(data as WhisperData);
    }
  }
}

function speechmatics(data: SpeechmaticsData): SpeechmaticJson[] | undefined {
  try {
    const jsonData = data.results;
    const _temp = jsonData.map((result) => fillTemplate(result));
    console.log(_temp)
    return _temp;
  } catch (error) {
    console.error(`Error reading or parsing data:`, error);
  }
}

function whisperx(data: WhisperData): WhisperJson[] | undefined {
  try {
    if (isJSON(data)) console.log("JSON FOUND")
    const jsonData = data.segments;
    const _temp = jsonData.map((result) => fillTemplateWhisper(result));
    return _temp.flat();
  } catch (error) {
    console.error(`Error reading or parsing data:`, error);
  }
}

function isJSON(str: WhisperData): boolean {
  try {
    JSON.parse(str.toString());
  } catch (e) {
    return false;
  }
  return true;
}

function fillTemplate(json: ResultItem): SpeechmaticJson {
  const template: SpeechmaticJson = {
    start_time: 0,
    end_time: 0,
    type: "",
    confidence: 0,
    text: "",
    locale: "",
    speaker: "",
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

function fillTemplateWhisper(json: Segments): WhisperJson[] {
  const kami = [];

  for (let i = 0; i < json.words.length; i++) {
    const template: WhisperJson = {
      start_time: 0,
      end_time: 0,
      confidence: 0,
      text: "",
      speaker: "",
    };

    const ongod = json.words[i];

    template.start_time = ongod?.start;
    template.end_time = ongod?.end;
    template.confidence = ongod?.score;
    template.text = ongod?.word;
    template.speaker = ongod?.speaker;
    kami.push(template);
  }

  return kami;
}
