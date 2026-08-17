// Operations Copilot Design System Tokens (§1)

export const COLOR_TOKENS = {
  // Surface (canvas + cards)
  bgCanvas: '#090514', // Root app background
  bgSurface1: '#130c25', // Primary cards, panels
  bgSurface2: '#1a1230', // Nested cards, hovered rows
  bgSurface3: '#241b40', // Modals, popovers, drawers
  bgElevated: '#2a1f4d', // Floating tooltips, toasts
  bgInput: '#0d0820', // Input fields, code blocks

  // Borders
  borderSubtle: '#2a1b4e',
  borderDefault: '#3b2a6b',
  borderStrong: '#553f8b',

  // Brand (indigo/violet)
  brandPrimary: '#8b5cf6', // Primary buttons, links, active states
  brandPrimaryHover: '#a78bfa',
  brandPrimaryActive: '#7c3aed',
  brandSecondary: '#6366f1', // Indigo accent
  brandTertiary: '#06b6d4', // Cyan highlights

  // Text
  textPrimary: '#f8fafc',
  textSecondary: '#cbd5e1',
  textMuted: '#64748b',
  textDisabled: '#475569',
  textInverse: '#090514',

  // Status
  statusSuccess: '#34d399',
  statusSuccessBg: '#064e3b',
  statusWarning: '#fbbf24',
  statusWarningBg: '#451a03',
  statusDanger: '#ef4444',
  statusDangerBg: '#450a0a',
  statusInfo: '#60a5fa',
  statusInfoBg: '#1e3a8a'
};

export const SPARK_PALETTE = [
  '#8b5cf6', '#6366f1', '#06b6d4', '#34d399', '#fbbf24', '#ef4444',
  '#f472b6', '#a78bfa', '#22d3ee', '#4ade80', '#facc15', '#fb7185'
];

export const SHADOW_TOKENS = {
  sm: '0 1px 2px 0 rgba(0,0,0,0.55)',
  md: '0 4px 14px -2px rgba(0,0,0,0.55), 0 0 0 1px rgba(139,92,246,0.05)',
  lg: '0 18px 40px -6px rgba(0,0,0,0.65), 0 0 30px -10px rgba(139,92,246,0.25)',
  glowPrimary: '0 0 40px -4px rgba(139,92,246,0.55)',
  glowDanger: '0 0 40px -4px rgba(239,68,68,0.45)'
};
