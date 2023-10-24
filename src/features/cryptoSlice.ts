import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// TypeScript declarations
export type CurrencyCode = "USD" | "EUR" | "JPY";
export type CurrencySymbol = "$" | "€" | "¥";

export interface CurrencyMap {
  [currencyCode: string]: CurrencySymbol;
}

export const currencySymbols: CurrencyMap = {
  USD: "$",
  EUR: "€",
  JPY: "¥",
};

export interface initial_I {
  currencyCode: CurrencyCode;
  currencySymbol: CurrencySymbol;
}

// Redux itself
const initialCurrency: CurrencyCode = "USD";

const initialState: initial_I = {
  currencyCode: initialCurrency,
  currencySymbol: currencySymbols[initialCurrency],
};

export const cryptoSlice = createSlice({
  name: "cryptoSlice",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<CurrencyCode>) => {
      state.currencyCode = action.payload;
      state.currencySymbol = currencySymbols[action.payload];
    },
  },
});

export const { setCurrency } = cryptoSlice.actions;

export default cryptoSlice.reducer;
