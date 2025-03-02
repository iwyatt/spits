# Stochastic Parrot in the Sheets (SPITS)
A Google Gemini AI / LLM Prompt function script for use in Google Sheets

# Usage
```=spits(_apikey_, _prompt_, _cell or range of cells_)```

# Examples
The first two examples reference a _single_ cell (eg: A1). The third example shows how this formula can be used on a _range_ of cells.

## (1) Get the website for a company
|   | Column A | Column B | { Response }
| --- | --- | --- | --- | 
| Row 1 | JPMorgan Chase | =spits("your_api_key","Get the website for and return only the root domain", A1) | "jpmorganchase.com"
| Row 2 | The company that makes World of Warcraft | =spits("your_api_key","Get the website for ", A2) | "blizzard.com"
| Row 3 | The Flight Academy in Renton, WA | =spits("your_api_key","Get the website for ", A3) | "theflightacademy.com"

## (2) Extract the First Name and Last Name from a single cell with a person's name in various formats and abbreviations
|   | Column A | Column B | { Response }
| --- | --- | --- | --- | 
| Row 1 | The Flight Academy | =spits("your_api_key","Please indicate if the following is a Fortune 2000 company: ", A1) | "No, The Flight Academy is not a Fortune 2000 company.  The Fortune 2000 list ranks the 2000 largest United States corporations by total revenue.  The Flight Academy is a flight school and significantly smaller than the companies listed."
| Row 2 | Alphabet Inc. | =spits("your_api_key","Please indicate if the following is a Fortune 2000 company: ", A2) | "Yes, Alphabet Inc. is a Fortune 2000 company."
| Row 3 | Fred Meyer | =spits("your_api_key","Please indicate if the following is a Fortune 2000 company: ", A3) | "No, Fred Meyer is not a Fortune 2000 company.  It's a subsidiary of Kroger, which *is* a Fortune 2000 company."

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
| Row 9 | =spits("{your_api_key}","How much did I spend on food in total? How much in November?",B14:D20) | | |


**{Response}**: Here's the breakdown of your food spending:

**Total Spending**: The only items clearly identifiable as food are Milk, Gum, Bananas, and Cereal.  Toothpaste is debatable.  Assuming only the clear food items, your total food spending is 3.49 + 0.99 + 2.99 + 5.99 = $13.46

**November Spending:** Your November food spending (Bananas and Cereal) was 2.99 + 5.99 = $8.98


## Other Examples
- Indicate if a company is a fortune 2000 company
- Normalize cases of names

# Requirements
- A Google Gemini API Key from https://aistudio.google.com/app/apikey
- A Google Sheet with App Script enabled
