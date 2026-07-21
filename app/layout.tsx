import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'CodeArena — Master Algorithms One Challenge at a Time',
  description:
    'A modern algorithm challenge platform with learning tracks, dynamic input generation, competitions, and gamification. Master algorithms through guided journeys.',
  openGraph: {
    title: 'CodeArena — Master Algorithms One Challenge at a Time',
    description:
      'A modern algorithm challenge platform with learning tracks, dynamic input generation, competitions, and gamification.',
    images: [{ url: '/og.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
