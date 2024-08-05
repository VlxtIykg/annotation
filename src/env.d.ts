/// <reference types="astro/client" />
declare module 'js-cache';

// React Types
type FormEvent = React.FormEvent<HTMLFormElement>
type MouseEvent = React.MouseEvent<HTMLButtonElement>
type ChangeEvent = React.ChangeEvent<HTMLInputElement>

// parser.ts and upload.ts
interface Alternative {
  confidence: number;
  content?: string;
  language?: string;
  speaker: string;
}

interface ResultItem {
  alternatives: Alternative[];
  end_time: number;
  start_time: number;
  type: string;
}

interface SpeechmaticsData {
  results: ResultItem[];
}
interface WhisperWord {
  word: string;
  start: number;
  end: number;
  score: number;
  speaker: string;
}

interface Segments {
  words: WhisperWord[];
}

interface WhisperData {
  segments: Segments[];
}


interface ReturningJson {
  start_time: number;
  end_time: number;
  confidence: number;
  text?: string;
  speaker: string;
}

interface SpeechmaticJson extends ReturningJson {
  type?: string;
  locale?: string;
}

interface WhisperJson extends ReturningJson {}

// interface