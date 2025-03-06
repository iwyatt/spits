// SPITS - Stochastic Parrot In The Sheets
// Isaac Wyatt
// https://github.com/iwyatt/spits
// 
// Get Your API Key Here: https://aistudio.google.com/app/apikey
// List of models available: https://ai.google.dev/gemini-api/docs/models/gemini#model-variations
// List of experimental models: https://ai.google.dev/gemini-api/docs/models/experimental-models
// List of API Limits per Model: https://ai.google.dev/gemini-api/docs/rate-limits

// Replace "INSERT_YOUR_API_KEY_HERE" with your api key from https://aistudio.google.com/app/apikey
// `gemini-2.0-flash-lite` has the highest number of requests per minute as of 2025-03-02
//
/**
* Ask Google Gemini to evalaute a range of data.
* 
* Documentation: https://github.com/iwyatt/spits
* @param {"Count the unique vowels: "} prompt - What you want to ask Google Gemini to do with your data.
* @param {A1:B2} dataRange - The data you are asking Google Gemini to evalutate.
* @param {"gemini-2.0-pro-exp-02-05"} modelName [Optional] - A specific Google Gemini model you want to use in your formula
* @param {"api-key"} apiKey [Optional] - Specify Google Gemini API Key if you didn't update it in the script (see documentation)
* @return {string} Google Gemini's evaluated result.
* @customfunction
**/
function spits(prompt, dataRange, modelName = "gemini-2.0-flash-lite", apiKey = "INSERT_YOUR_API_KEY_HERE") {
  const baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/";
  const modelAndMethod = ":generateContent?key=";
  // if model not specified, use default
  if (modelName == ""){ modelName = "gemini-2.0-flash-lite"};
  const url = baseUrl + modelName + modelAndMethod + apiKey;

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

  const response = UrlFetchApp.fetch(url, options);
  const content = JSON.parse(response.getContentText());
  if (content.candidates.finishReason === 'SAFETY')
    {return "[Prompt Response Blocked]"};

  if (content.candidates && content.candidates.length > 0 && content.candidates[0].content && content.candidates[0].content.parts && content.candidates[0].content.parts.length > 0) {
    const firstCandidate = content.candidates[0];
    const generatedText = firstCandidate.content.parts[0].text;
    return generatedText;
  } else {
    return "[No response generated]";
  }
}
