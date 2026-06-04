import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

const TemaContext = createContext();

export const useTema = () => useContext(TemaContext);

export const TemaProvider = ({ children }) => {
  const [modo, setModo] = useState("light");

  const toggleTema = () => setModo((m) => (m === "light" ? "dark" : "light"));

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: modo,
          primary: { main: modo === "light" ? "#1e88e5" : "#90caf9" },
          secondary: { main: "#ff7043" },
          background: {
            default: modo === "light" ? "#f5f7fa" : "#0f1419",
            paper: modo === "light" ? "#ffffff" : "#1a2027",
          },
        },
        shape: { borderRadius: 12 },
        typography: {
          fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
          h1: { fontWeight: 700 },
          h2: { fontWeight: 700 },
          button: { textTransform: "none", fontWeight: 600 },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: { backdropFilter: "blur(8px)" },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: { boxShadow: "0 4px 20px rgba(0,0,0,0.06)" },
            },
          },
        },
      }),
    [modo]
  );

  return (
    <TemaContext.Provider value={{ modo, toggleTema }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </TemaContext.Provider>
  );
};