import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// TypeScript declarations
type CurrencyCode = "USD" | "EUR" | "MDL";
type CurrencySymbol = "$" | "€" | "L";

export interface CurrencyMap {
  [currencyCode: string]: CurrencySymbol;
}

export const currencySymbols: CurrencyMap = {
  USD: "$",
  EUR: "€",
  MDL: "L",
};

export interface initial_I {
  currency: CurrencyCode;
  symbol: CurrencySymbol;
}

// Redux itself
const initialCurrency: CurrencyCode = "USD";

const initialState: initial_I = {
  currency: initialCurrency,
  symbol: currencySymbols[initialCurrency],
};

export const cryptoSlice = createSlice({
  name: "cryptoSlice",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<CurrencyCode>) => {
      state.currency = action.payload;
      state.symbol = currencySymbols[action.payload];
    },
  },
});

export const { setCurrency } = cryptoSlice.actions;

export default cryptoSlice.reducer;
