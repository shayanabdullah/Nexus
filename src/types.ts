export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
  gridSpan?: string;
}

export interface MetricItem {
  id: string;
  value: string;
  targetNumber: number;
  suffix: string;
  label: string;
  description: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  isFeatured: boolean;
  ctaText: string;
}

export interface AIGeneratedItem {
  type: 'report' | 'startup' | 'email' | 'meeting' | 'workflow';
  title: string;
  prompt: string;
  response: string;
  tokens: number;
  duration: string;
}
