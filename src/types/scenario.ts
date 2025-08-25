
export enum Role {
  student = "student",
  professor = "professor",
}

export enum Subscription {
  free = "free",
  basic = "basic",
  enterprise = "enterprise",
}

export enum Department {
  Nursing = "Nursing",
  Doctor = "Doctor",
  Pharmacy = "Pharmacy",
  Pre_health = "Pre_health",
}

export enum SkillLevel {
  PY1 = "PY1",
  PY2 = "PY2",
  PY3 = "PY3",
  PY4 = "PY4",
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  passHash?: string | null;
  image?: string | null;
  role: Role;
  subscription: Subscription;
  accounts: Account[];
  sessions: Session[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface VerificationToken {
  id: string;
  identifier: string;
  token: string;
  expires: Date;
}

export interface Profile {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  topic?: string | null;
  school?: string | null;
  bio?: string | null;
  cases: Case[];
  isProfessor?: boolean | null;
  image: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Case {
  id: string;
  profileId: string;
  profile: Profile;
  title: string;
  image?: string | null; // path to the image
  description?: string | null;
  skillLevel: SkillLevel;
  name?: string | null;
  dateOfBirth?: Date | null;
  sex: string;
  caseMarkdown: string;
  questions?: string | null;
  answerKey?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompletedScenario {
  id: string;
  userId: string;
  scenarioId: string;
  moduleId: string;
  createdAt: Date;
}

export interface Email {
  emailId: string;
  email: string;
}

export interface Module {
  id: string;
  title: string;
  description?: string | null;
  scenarios: string[];
  createdAt: Date;
  updatedAt: Date;
  scenarioObj: Scenario[];
}

export interface ScenarioRef {
  scenarioId: string;
  title: string;
  image: string;
}

export interface Scenario {
  id: string;
  moduleId?: string | null;
  module?: Module | null;
  title: string;
  evaluationPrompt: string;
  startingMessage: string;
  patientInfo: string;
  personaPrompt: string;
  description: string;

  tasks: string[];
  createdAt: Date;
  updatedAt: Date;
}
