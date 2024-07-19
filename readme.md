# Stochastic Pattor in the Sheets (SPIT)
A AI / LLM Prompt function script for use in Google Sheet

# Usage
```=spit(_apikey_, _prompt_)```

Example:
|   | Column A | Column B |
| --- | --- | --- |
| Row 1 | JPMorgan Chase | =spit("fake-api-key-123-insert-yours-here","Get the website for "&A1)
| Row 2 | The company that makes World of Warcraft | =spit("fake-api-key-123-insert-yours-here","Get the website for "&A2)
| Row 3 | The Flight Academy in Renton, WA | =spit("fake-api-key-123-insert-yours-here","Get the website for "&A3)

# Requirements
- A Google Gemini API Key
https://aistudio.google.com/app/apikey

- A Google Sheet with App Script
