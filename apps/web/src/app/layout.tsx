import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Operations Copilot — Enterprise AI Operations Intelligence OS',
  description: 'The AI-native operations intelligence platform that turns workflows, approvals, projects, and documents into a self-driving command center.',
  openGraph: {
    title: 'Operations Copilot — Enterprise AI Operations Intelligence OS',
    description: 'The AI-native operations intelligence platform that turns workflows, approvals, projects, and documents into a self-driving command center.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-canvas text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
