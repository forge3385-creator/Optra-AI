import './globals.css';

export const metadata = {
  title: 'Operations Copilot',
  description: 'Enterprise Operations AI Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
