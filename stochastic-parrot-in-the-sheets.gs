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
  
  // // Process the response (parse JSON etc.)
  // const content = JSON.parse(response.getContentText());
  // // Use the content object (generated text) here
  // Logger.log(content); // This logs the response to the script log
  // return content; // Return the generated content
  
  // Process the response and extract text
  const content = JSON.parse(response.getContentText());
  const firstCandidate = content.candidates[0];
  const generatedText = firstCandidate.content.parts[0].text;
  return generatedText;
}
