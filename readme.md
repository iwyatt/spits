# Stochastic Parrot in the Sheets (SPITS)
A Google Gemini AI / LLM Prompt function script for use in Google Sheets

# Usage
```=spits(_Prompt_, _Cell or Range_, [optional] Gemini Model, [optional] Api Key)```

## Parameters explained
- Prompt: What you want to ask Google Gemini to do with your data
- Cell/Range: The data you are asking Google Gemini to evalutate
- Gemini Model: A specific Google Gemini model you want to use in your formula
- ApiKey: Specify Google Gemini API Key if you didn't update it in the script (See below)

## Returned Result
- A text response from Google Gemini in the cell where you placed the formula, or an Error

# Examples
The first two examples reference a _single_ cell (eg: A1). The third example shows how this formula can be used on a _range_ of cells.

## (1) Get the website for a company
|   | Column A | Column B | { Response }
| --- | --- | --- | --- | 
| Row 1 | JPMorgan Chase | =spits("Get the website for and return only the root domain", A1) | "jpmorganchase.com"
| Row 2 | The company that makes World of Warcraft | =spits("Get the website for ", A2) | "blizzard.com"
| Row 3 | The Flight Academy in Renton, WA | =spits("Get the website for ", A3) | "theflightacademy.com"

## (2) Extract the First Name and Last Name from a single cell with a person's name in various formats and abbreviations
|   | Column A | Column B | { Response }
| --- | --- | --- | --- | 
| Row 1 | The Flight Academy | =spits("Please indicate if the following is a Fortune 2000 company: ", A1) | "No, The Flight Academy is not a Fortune 2000 company.  The Fortune 2000 list ranks the 2000 largest United States corporations by total revenue.  The Flight Academy is a flight school and significantly smaller than the companies listed."
| Row 2 | Alphabet Inc. | =spits("Please indicate if the following is a Fortune 2000 company: ", A2) | "Yes, Alphabet Inc. is a Fortune 2000 company."
| Row 3 | Fred Meyer | =spits("Please indicate if the following is a Fortune 2000 company: ", A3) | "No, Fred Meyer is not a Fortune 2000 company.  It's a subsidiary of Kroger, which *is* a Fortune 2000 company."

## (3) Range Example: Analyze spending by category and date
|   | Column A | Column B | Column C
| --- | --- | --- | --- |  
| Row 1 | Transaction Date	| Product	| Price
| Row 2 | 9/1/2021	| Milk	| $3.49 | 
| Row 3 | 10/1/2021	| Gum	| $0.99 | 
| Row 4 | 10/2/2021	| Toothpaste	| $3.99 | 
| Row 5 | 11/5/2021	| Bananas	| $2.99 | 
| Row 6 | 11/10/2021	| Cereal	| $5.99 | 
| Row 7 | 11/11/2021	| Soap	| $3.99 | 
| Row 8 | | | |
| Row 9 | =spits("How much did I spend on food in total? How much in November?",B14:D20) | | |


**{Response}**: Here's the breakdown of your food spending:

**Total Spending**: The only items clearly identifiable as food are Milk, Gum, Bananas, and Cereal.  Toothpaste is debatable.  Assuming only the clear food items, your total food spending is 3.49 + 0.99 + 2.99 + 5.99 = $13.46

**November Spending:** Your November food spending (Bananas and Cereal) was 2.99 + 5.99 = $8.98

## Other Examples
- Indicate if a company is a fortune 2000 company
- Normalize cases of names

# Requirements
- A Google Gemini API Key from https://aistudio.google.com/app/apikey
- A Google Sheet with App Script enabled

# Installation
## Get a Google Gemini API Key
- Go to https://aistudio.google.com/app/apikey
- Click `Create API Key` (you will need this in a moment)
> If you attempt to create an API key in an org with Google Workspaces, you may need to ask your IT / Engineering team to add you to a Google Cloud Project, or creaete an API Key on your behalf

## Install the Script in Google Sheets
- Open a Google Sheet that has the data you want to use
- Under the `Extensions` menu, select `Apps Script`
- Replace all the lines of `Untitled Project` with the script:
    - Copy/Paste the [script ](stochastic-parrot-in-the-sheets.gs) in to a Google Sheet of your choice
- Replace the text "`INSERT_YOUR_API_KEY_HERE`" in the code (somewhere around line 23) with your Google Gemini API Key. 

> After you do this step, the line in the code that starts with `function` would look something like this:
`function spits(prompt, dataRange, modelName = "gemini-2.0-flash-lite", apiKey = "DummyAPIKey") {`

- Save the file
- In your Google Sheet, write a formula in a cell as usual using the `spits` function: `=spits("Are you working?", A1:B2)`

> WARNING! If you intend to share this Google Sheet with others, they will be able to see your API Key which would allow them to use your Google Gemini API in other contexts.

# Limitations
- See above warning regarding sharing
- Personal Google Accounts have a limited number of [API Calls](https://ai.google.dev/gemini-api/docs/rate-limits) available per minute, and per day
- Google Sheets has _volatile_ calculations which means that formulas will re-calculate whenever there is a change to the underlying data. This can quickly use many of the limited API calls available on a per minute and per day basis, and/or result in high costs if billing to a Google Cloud project. Therefore it is highly recommended to copy+paste-_values_ when a satisfactory response from Google Gemini has been received.

# Additional Documentation
- List of models available: https://ai.google.dev/gemini-api/docs/models/gemini#model-variations
- List of experimental models: https://ai.google.dev/gemini-api/docs/models/experimental-models
- List of API Limits per Model: https://ai.google.dev/gemini-api/docs/rate-limits

# Warranty
There is no warranty. Use at your own risk.