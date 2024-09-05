"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { colors } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  palette: {
    primary: {
      main: "#299D91",
    },
    background:{
      default: '#F4F5F7'
    }
  },
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif'
    ].join(','),
  }
});

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="en"   
      >
        <body className={inter.className}>{children}</body>
      </html>
    </ThemeProvider>
  );
}
