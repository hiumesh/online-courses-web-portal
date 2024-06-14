import "./globals.css";
import GlobalProviders from "./providers";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background">
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
