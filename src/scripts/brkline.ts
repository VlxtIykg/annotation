export default function findUniqueSpeakers(): void {
  const speakers: String[] = [];
  const cards = document.getElementsByClassName("personal_cards") as HTMLCollectionOf<HTMLElement>;

  for (let card of cards) {
    const speaker_number = card?.getElementsByClassName("speaker") as HTMLCollectionOf<HTMLElement>; // S3
    if (speaker_number === null || speaker_number === undefined) return;
    const current_speaker = speaker_number[0].classList[1];
    const previous_speaker = speakers[speakers.length - 1];
    if (previous_speaker === undefined) {
      speakers.push(current_speaker);
      continue;
    }
    if (previous_speaker !== current_speaker) {
      const filler = document.createElement("div");
      filler.classList.add("filler");
      filler.classList.add("grow");
      filler.classList.add("w-full");
      const previousSibling = card.previousSibling as HTMLElement | null;

      if (previousSibling && previousSibling.nodeType === Node.ELEMENT_NODE) {
        previousSibling.insertAdjacentElement("afterend", filler);
        previousSibling.insertAdjacentElement("afterend", document.createElement("br"));
      }
    }
    speakers.push(current_speaker);
  }
}
