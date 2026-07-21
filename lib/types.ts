export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  country: string;
  bio: string;
  xp: number;
  level: number;
  rank: string;
  solvedProblems: number;
  winStreak: number;
  accuracy: number;
  favoriteLanguage: string;
  createdAt: string;
}

export interface Track {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  levelCount: number;
  challengeCount: number;
  xpReward: number;
  estimatedHours: number;
  levels: Level[];
}

export interface Level {
  id: string;
  title: string;
  description: string;
  order: number;
  challengeCount: number;
  xpReward: number;
  challenges: Challenge[];
  completed: boolean;
  locked: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  estimatedTime: string;
  points: number;
  xpReward: number;
  description: string;
  story: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  examples: Example[];
  notes: string;
  hints: string[];
  allowedLanguages: string[];
  timeLimit: number;
  memoryLimit: number;
  tags: string[];
  completed: boolean;
  solved: boolean;
}

export interface Example {
  input: string;
  output: string;
  explanation: string;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  isSample: boolean;
}

export interface Submission {
  id: string;
  userId: string;
  challengeId: string;
  code: string;
  language: string;
  status: SubmissionStatus;
  runtime: number;
  memory: number;
  passedTests: number;
  totalTests: number;
  createdAt: string;
}

export type SubmissionStatus =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Time Limit Exceeded'
  | 'Memory Limit Exceeded'
  | 'Runtime Error'
  | 'Compilation Error'
  | 'Pending';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Competition {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  challenges: string[];
  participants: number;
  status: 'Upcoming' | 'Active' | 'Completed';
  prizes: string[];
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  xp: number;
  solvedProblems: number;
  accuracy: number;
  winStreak: number;
}

export interface GeneratedInput {
  id: string;
  challengeId: string;
  userId: string;
  input: string;
  expectedOutput: string;
  seed: string;
  createdAt: string;
}

export interface DashboardStats {
  totalXp: number;
  level: number;
  rank: string;
  leaderboardPosition: number;
  solvedChallenges: number;
  totalChallenges: number;
  winStreak: number;
  accuracy: number;
  currentTrack: Track | null;
  currentChallenge: Challenge | null;
  dailyChallenge: Challenge | null;
  recentSubmissions: Submission[];
  achievements: Achievement[];
  badges: Badge[];
}
