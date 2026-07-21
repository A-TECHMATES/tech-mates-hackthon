import { SAMPLE_CHALLENGE } from '@/lib/constants';
import ChallengeClient from './challenge-client';

export function generateStaticParams() {
  return [{ slug: SAMPLE_CHALLENGE.slug }];
}

export default function ChallengePage() {
  return <ChallengeClient />;
}
