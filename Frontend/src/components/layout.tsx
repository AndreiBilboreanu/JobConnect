import { ThemeProvider } from "../providers/theming";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>;
}
