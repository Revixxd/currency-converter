# Ideas

## Currency State from URL (Deep Linking)

Support initializing the converter from URL query parameters so users can share or bookmark specific conversions.

**Example:**

```
http://localhost:5173/?from=USD&to=EUR&amount=100
```

On page load, the app would parse the query parameters and automatically:

1. Set the source and target currencies
2. Pre-fill the amount
3. Fetch and display the conversion result

## Exchange Rate Date Tooltip

Display a tooltip next to the exchange rate date explaining why the shown date might not be today's date.

**Reason:** Depending on the API plan/version, exchange rates may only update on business days or with a delay. Users should understand that a past date does not indicate an error, it reflects the most recent available rate from the data provider.
