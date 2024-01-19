// types.ts
import lightTheme from "../Themes/lightTheme";

export type ThemeType = typeof lightTheme;

export type ThemeContextType = {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
  toggleDarkTheme: () => void;
};
