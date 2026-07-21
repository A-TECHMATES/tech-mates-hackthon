import { TRACKS } from '@/lib/constants';
import TrackClient from './track-client';

export function generateStaticParams() {
  return TRACKS.map((track) => ({ slug: track.slug }));
}

export default function TrackPage() {
  return <TrackClient />;
}
