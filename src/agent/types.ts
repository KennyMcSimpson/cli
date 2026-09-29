import type { Region } from '../config/schema';

export const AGENT_IDS = [
  'claude-code',
  'codex',
  'grok',
  'opencode',
  'hermes',
  'pi',
] as const;

export type AgentId = typeof AGENT_IDS[number];

export const MINIMAX_MODELS = [
  {
    id: 'MiniMax-M3.1-Flash-Preview',
    contextWindow: 524288,
    maxTokens: 128000,
    input: ['text', 'image'],
    codex: {
      defaultReasoningLevel: 'max',
      supportedReasoningLevels: [
        { effort: 'low', description: 'Low' },
        { effort: 'medium', description: 'Medium' },
        { effort: 'high', description: 'High' },
        { effort: 'xhigh', description: 'Extra high' },
        { effort: 'max', description: 'Maximum' },
      ],
    },
  },
  {
    id: 'MiniMax-M3',
    contextWindow: 524288,
    maxTokens: 128000,
    input: ['text', 'image'],
    codex: {
      defaultReasoningLevel: 'high',
      supportedReasoningLevels: [
        { effort: 'none', description: 'Think-Off' },
        { effort: 'high', description: 'Deep' },
      ],
    },
  },
  {
    id: 'MiniMax-M2.7',
    contextWindow: 204800,
    maxTokens: 131072,
    input: ['text'],
    codex: {
      defaultReasoningLevel: 'high',
      supportedReasoningLevels: [{ effort: 'high', description: 'Always on' }],
    },
  },
  {
    id: 'MiniMax-M2.7-highspeed',
    contextWindow: 204800,
    maxTokens: 131072,
    input: ['text'],
    codex: {
      defaultReasoningLevel: 'high',
      supportedReasoningLevels: [{ effort: 'high', description: 'Always on' }],
    },
  },
] as const;

export const DEFAULT_MINIMAX_MODEL = MINIMAX_MODELS[0].id;
export type MiniMaxModelId = typeof MINIMAX_MODELS[number]['id'];

export interface AgentSetupOptions {
  agents: AgentId[];
  apiKey: string;
  region: Region;
  model: MiniMaxModelId;
  homeDir?: string;
  env?: NodeJS.ProcessEnv;
}

export interface PreparedAgentFile {
  agent: AgentId;
  path: string;
  targetPath: string;
  before: string | null;
  after: string;
}

export interface AppliedAgentFile {
  agent: AgentId;
  path: string;
  status: 'configured' | 'unchanged' | 'would-configure';
  backup?: string;
}

export interface AgentVerification {
  region: Region;
  model: string;
  endpoint: string;
  status: 'ok' | 'skipped';
}
