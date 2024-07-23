// SPITS - Stochastic Parrot In The Sheets
// Isaac Wyatt
// https://github.com/iwyatt/spits

function spits(apiKey, prompt) {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey;
  
  const payload = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }]
  };
  
  const options = {
    "method" : "post",
    "payload" : JSON.stringify(payload),
    "headers": {
      "Content-Type": "application/json"
    }
  };
  
  const response = UrlFetchApp.fetch(url, options);
  const content = JSON.parse(response.getContentText());
  const firstCandidate = content.candidates[0];
  const generatedText = firstCandidate.content.parts[0].text;
  
  return generatedText;
}
