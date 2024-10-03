// SPITS - Stochastic Parrot In The Sheets
// Isaac Wyatt
// https://github.com/iwyatt/spits

function spits(apiKey, prompt) {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey;
  
  var payload = {
    safetySettings: [
      {category: "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_ONLY_HIGH"},
      {category: "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_ONLY_HIGH"},
      {category: "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_ONLY_HIGH"}
    ],
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
  console.log(payload);

  const response = UrlFetchApp.fetch(url, options);
  console.log(response);

  const content = JSON.parse(response.getContentText());
  console.log(content);

  if (content.candidates.finishReason === 'SAFETY')
    {return "[Prompt Response Blocked]"}
  const firstCandidate = content.candidates[0];
  
  const generatedText = firstCandidate.content.parts[0].text;
  
  return generatedText;
}