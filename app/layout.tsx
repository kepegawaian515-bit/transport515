export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body style={{margin:0, background:'#f1f5f9'}}>{children}</body>
    </html>
  );
}
