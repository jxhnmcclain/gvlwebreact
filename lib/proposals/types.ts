export type ProposalStat = {
  value: string;
  label: string;
  context?: string;
};

export type ProposalHeroItem = {
  title: string;
  body: string;
};

export type ProposalSectionLabels = Partial<{
  diagnosis: string;
  solution: string;
  content: string;
  investment: string;
  timeline: string;
  closing: string;
}>;

export type ProposalPillar = {
  title: string;
  description: string;
  tag: string;
};

export type ProposalContentExample = {
  title: string;
  description: string;
  example: string;
};

export type ProposalPlan = {
  eyebrow: string;
  title: string;
  price: string;
  cadence: string;
  deliverables: string[];
  featured?: boolean;
};

export type ProposalAddon = {
  title: string;
  price: string;
  cadence: string;
  description: string;
};

export type ProposalTimelineItem = {
  period: string;
  title: string;
  description: string;
};

export type ProposalTerm = {
  label: string;
  value: string;
};

export type ProposalData = {
  id: string;
  mode?: 'proposal' | 'offer';
  client: string;
  dateLabel: string;
  eyebrow: string;
  titleLines: string[];
  accentLine: string;
  introduction: string;
  quote: string;
  heroStats: ProposalStat[];
  heroSummary?: {
    title: string;
    items: ProposalHeroItem[];
  };
  sectionLabels?: ProposalSectionLabels;
  interestOptions?: string[];
  diagnosis: {
    title: string;
    introduction: string;
    stats: ProposalStat[];
    conclusion: string;
  };
  solution: {
    title: string;
    introduction: string;
    pillars: ProposalPillar[];
  };
  content?: {
    title: string;
    introduction: string;
    images: Array<{ src: string; label: string; caption: string }>;
    examples: ProposalContentExample[];
  };
  investment?: {
    title: string;
    introduction: string;
    plans: ProposalPlan[];
    addons?: ProposalAddon[];
    guarantee?: string;
    roiTitle?: string;
    roiBody?: string;
  };
  timeline: {
    title: string;
    items: ProposalTimelineItem[];
  };
  closing: {
    title: string;
    body: string;
    terms: ProposalTerm[];
  };
};
