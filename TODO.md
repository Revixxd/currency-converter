# TODO

## UiInput

- Adapt pennies/decimals logic for proper currency formatting
- Limit the maximum number of digits (both integer and decimal parts)

## AmountInput

- Apply `border-radius: var(--border-radius)` to `.container__select-currency`

## CurrencySelect

- Add country flag icons next to each currency option

## ArrowSwap (Currency Swap Button)

- On swap, transfer the value from the currently active input to the other one
- After swapping, automatically focus/activate the opposite input (e.g. if the top input was active, activate the bottom one after the swap)

## CurrencyCheck

- Watch for viewport changes (desktop ↔ mobile) and switch the currency selection view accordingly (e.g. dropdown on desktop, full-screen list on mobile)

## CurrencyBeacon (API Service)

- Implement proper error handling for API requests (network errors, rate limits, invalid responses)
- Refactor params passing based on request rather than setting all possible props

## Validation & Popups

- Implement popup resolver pattern for managing popup state
