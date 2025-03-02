// SPITS - Stochastic Parrot In The Sheets
// Isaac Wyatt
// https://github.com/iwyatt/spits

function spits(apiKey, prompt, dataRange) {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey;

  // Check if the required parameters are defined
  if (apiKey === undefined || prompt === undefined) {
    return "Error: Missing parameters. Ensure you provide apiKey and prompt.";
  }

  let values;
  let tableString;
  
  if (typeof dataRange === 'string'){
    tableString = dataRange;
  } else if (Array.isArray(dataRange)){
      values = dataRange;
        // Build the table string
      if (values.length > 0) {
      //build the header row
      if (values[0].length > 0) {
        // Check if it is a single value or a table.
        if (values.length == 1 && values[0].length == 1) {
            tableString = values[0][0];
        } else {
          tableString += "|";
          for (let j = 0; j < values[0].length; j++) {
            tableString += values[0][j] + "|";
          }
          tableString += "\n";

          tableString += "|";
          for (let j = 0; j < values[0].length; j++) {
            tableString += "---|";
          }
          tableString += "\n";

          //build the table rows
          for (let i = 1; i < values.length; i++) {
            tableString += "|";
            for (let j = 0; j < values[i].length; j++) {
              tableString += values[i][j] + "|";
            }
            tableString += "\n";
          }
        }
      }
      }
  }

  // Append the table to the prompt
  const fullPrompt = prompt + "\n" + tableString;

  const payload = {
  
  var payload = {
    safetySettings: [
      {category: "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_ONLY_HIGH"},
      {category: "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_ONLY_HIGH"},
      {category: "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_ONLY_HIGH"}
    ],
    contents: [{
      parts: [{
        text: fullPrompt
      }]
    }]
  };


  const options = {
    "method": "post",
    "payload": JSON.stringify(payload),
    "headers": {
      "Content-Type": "application/json"
    }
  };

  console.log(payload);

  const response = UrlFetchApp.fetch(url, options);
  console.log(response);

  const content = JSON.parse(response.getContentText());

  if (content.candidates && content.candidates.length > 0 && content.candidates[0].content && content.candidates[0].content.parts && content.candidates[0].content.parts.length > 0) {
    const firstCandidate = content.candidates[0];
    const generatedText = firstCandidate.content.parts[0].text;
    return generatedText;
  } else {
    return "No response generated";
  }
  console.log(content);

  if (content.candidates.finishReason === 'SAFETY')
    {return "[Prompt Response Blocked]"}
  const firstCandidate = content.candidates[0];
  
  const generatedText = firstCandidate.content.parts[0].text;
  
  return generatedText;
}