const test_1 = document.getElementsByClassName("personal_cards")[0];
const test_2 = Array.from(test_1.getElementsByClassName("details speaker"));

let speaker = "";
let speakerNumber = 1;

test_2.forEach(element => {
    const text = element.textContent;
    if (text.startsWith("S")) {
        speaker = text;
        const speakerText = document.createElement("div");
        speakerText.textContent = speaker;
        test_1.appendChild(speakerText);

        const invisibleDiv = document.createElement("div");
        invisibleDiv.style.flexBasis = "100%";
        test_1.appendChild(invisibleDiv);

        speakerNumber++;
    } else {
        const speechText = document.createElement("div");
        speechText.textContent = text;
        test_1.appendChild(speechText);
    }
});