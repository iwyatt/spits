// SPITS - Stochastic Parrot In The Sheets
// Isaac Wyatt
// https://github.com/iwyatt/spits
//
// Ask Google Gemini to evaluate a range of data within Google Sheets.
//
// Documentation: https://github.com/iwyatt/spits
// Get Your API Key Here: https://aistudio.google.com/app/apikey
// List of models available: https://ai.google.dev/gemini-api/docs/models/gemini#model-variations
// List of experimental models: https://ai.google.dev/gemini-api/docs/models/experimental-models
// List of API Limits per Model: https://ai.google.dev/gemini-api/docs/rate-limits
//
/**
* Ask Google Gemini to evalaute a range of data.
* 
* Documentation: https://github.com/iwyatt/spits
* @param {"Count the unique vowels: "} prompt - What you want to ask Google Gemini to do with your data.
* @param {A1:B2} dataRange - The data you are asking Google Gemini to evalutate.
* @param {"gemini-2.5-flash"} modelName [Optional] - A specific Google Gemini model you want to use in your formula
* @param {"api-key"} apiKey [Optional] - Specify Google Gemini API Key if you didn't update it in the script (see documentation)
* @return {string} Google Gemini's evaluated result.
* @customfunction
**/
function spits(prompt, dataRange, modelName = "gemini-2.5-flash", apiKey = "INSERT_YOUR_API_KEY_HERE") {
  // --- Input Validation and Error Handling ---
  if (!prompt || typeof prompt !== 'string' || prompt.trim() === "") {
    return "[Error: Invalid or empty prompt provided.]";
  }

  if (!dataRange) {
    return "[Error: No data range provided.]";
  }

  if (apiKey === "INSERT_YOUR_API_KEY_HERE") {
    return "[Error: API Key not set. Please replace 'INSERT_YOUR_API_KEY_HERE' with your actual API key.]";
  }

  if (!modelName || typeof modelName !== 'string' || modelName.trim() === "") {
      modelName = "gemini-2.5-flash";
  }
  
  // --- Construct API Endpoint URL ---
  const baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/";
  const modelAndMethod = ":generateContent?key=";
  const url = baseUrl + modelName + modelAndMethod + apiKey;

  // --- Data Range Handling ---
  let tableString;
  if (typeof dataRange === 'string') {
      tableString = dataRange;
  } else if (Array.isArray(dataRange) && dataRange.length > 0) {
      tableString = buildTableString(dataRange);
  } else {
      return "[Error: Invalid data range format.]";
  }

  // --- Build Full Prompt ---
  const fullPrompt = prompt + "\n" + tableString;

  // --- Construct Request Payload ---
  const payload = {
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
    ],
    contents: [{ parts: [{ text: fullPrompt }] }],
  };

  // --- Set Request Options ---
  const options = {
    method: "post",
    payload: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
    muteHttpExceptions: true // Critical to prevent script termination on HTTP errors
  };

  // --- Make API Request & Handle Response ---
  try {
      const response = UrlFetchApp.fetch(url, options);
      const responseCode = response.getResponseCode();
      const content = JSON.parse(response.getContentText());

      if (responseCode >= 400) {
        console.error(`HTTP Error: ${responseCode}`);
        if (content.error && content.error.message){
          return `[Error: ${responseCode} - ${content.error.message}]`;
        }
        return `[Error: HTTP ${responseCode} - check the console for more details]`;
      }

      if (content.candidates && content.candidates[0].finishReason === 'SAFETY') {
          return "[Prompt Response Blocked due to safety settings.]";
      }
      
      if (content.candidates && content.candidates.length > 0 && content.candidates[0].content && content.candidates[0].content.parts && content.candidates[0].content.parts.length > 0) {
          const generatedText = content.candidates[0].content.parts[0].text;
          return generatedText;
      } else {
          return "[No response generated or unexpected response format.]";
      }

  } catch (error) {
      console.error("API Request Error:", error);
      return `[Error: API Request Failed - ${error.toString()}]`;
  }
}

/**
 * Builds a markdown table string from a 2D array.
 *
 * @param {Array<Array<string>>} data - The 2D array representing the table data.
 * @return {string} A markdown formatted table string.
 */
function buildTableString(data) {
    if (data.length === 0) {
        return "";
    }
    
    if(data.length === 1 && data[0].length === 1) {
      return data[0][0]
    }
    
    let tableString = "|";
    for (let j = 0; j < data[0].length; j++) {
        tableString += data[0][j] + "|";
    }
    tableString += "\n";

    tableString += "|";
    for (let j = 0; j < data[0].length; j++) {
        tableString += "---|";
    }
    tableString += "\n";

    for (let i = 1; i < data.length; i++) {
        tableString += "|";
        for (let j = 0; j < data[i].length; j++) {
            tableString += data[i][j] + "|";
        }
        tableString += "\n";
    }

    return tableString;
}