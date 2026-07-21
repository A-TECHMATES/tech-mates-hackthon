import { LEADERBOARD_DATA } from '@/lib/constants';
import ProfileClient from './profile-client';

export function generateStaticParams() {
  return LEADERBOARD_DATA.map((user) => ({ username: user.username }));
}

export default function UserProfilePage() {
  return <ProfileClient />;
}
