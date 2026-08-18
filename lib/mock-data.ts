// lib/mock-data.ts
// Deterministic demo data for all interactive components.
// This is a frontend prototype — no real AI processing occurs.

export type WorkflowStep = {
  id: string;
  label: string;
  description: string;
  duration: number; // ms to simulate
  icon: string;
};

export type DemoGoal = {
  id: string;
  label: string;
  description: string;
  steps: WorkflowStep[];
  result: {
    title: string;
    summary: string;
    insights: string[];
    nextAction: string;
  };
};

export const DEMO_GOALS: DemoGoal[] = [
  {
    id: "market-research",
    label: "Research a new market",
    description: "Explore market opportunities in AI automation",
    steps: [
      {
        id: "understand",
        label: "Understanding objective",
        description: "Parsing goal and identifying scope",
        duration: 900,
        icon: "brain",
      },
      {
        id: "research",
        label: "Gathering market data",
        description: "Scanning industry reports and signals",
        duration: 1200,
        icon: "search",
      },
      {
        id: "analyze",
        label: "Analyzing patterns",
        description: "Identifying trends and gaps",
        duration: 1000,
        icon: "bar-chart",
      },
      {
        id: "reason",
        label: "Synthesizing insights",
        description: "Drawing conclusions from evidence",
        duration: 900,
        icon: "lightbulb",
      },
      {
        id: "output",
        label: "Generating report",
        description: "Structuring findings into deliverable",
        duration: 700,
        icon: "file-text",
      },
    ],
    result: {
      title: "Market Opportunity Brief",
      summary:
        "The AI automation market shows strong signals across three high-value verticals. Workflow orchestration tools present the clearest entry opportunity.",
      insights: [
        "Enterprise workflow automation growing at ~35% YoY",
        "Key gap: tools that bridge NLP input with structured execution",
        "Buyers prioritize integration depth over feature breadth",
      ],
      nextAction: "Prioritize integration-first positioning for enterprise buyers",
    },
  },
  {
    id: "customer-feedback",
    label: "Analyze customer feedback",
    description: "Surface themes and priorities from qualitative data",
    steps: [
      {
        id: "understand",
        label: "Understanding objective",
        description: "Scoping the analysis task",
        duration: 800,
        icon: "brain",
      },
      {
        id: "collect",
        label: "Aggregating feedback",
        description: "Pulling signals from multiple sources",
        duration: 1100,
        icon: "messages-square",
      },
      {
        id: "classify",
        label: "Classifying themes",
        description: "Grouping feedback by topic and sentiment",
        duration: 1000,
        icon: "tag",
      },
      {
        id: "prioritize",
        label: "Prioritizing issues",
        description: "Ranking by frequency and impact",
        duration: 800,
        icon: "arrow-up-narrow-wide",
      },
      {
        id: "output",
        label: "Compiling summary",
        description: "Structuring actionable findings",
        duration: 700,
        icon: "file-text",
      },
    ],
    result: {
      title: "Customer Insight Report",
      summary:
        "Analysis surfaced three dominant themes across feedback channels. Onboarding friction appears most frequently and correlates with early churn signals.",
      insights: [
        "Onboarding complexity cited in 42% of negative signals",
        "Integration requests cluster around Slack, Notion, and Zapier",
        "Power users request granular workflow control and audit logs",
      ],
      nextAction: "Redesign onboarding flow with progressive disclosure",
    },
  },
  {
    id: "competitive-brief",
    label: "Create a competitive brief",
    description: "Map the competitive landscape for strategic positioning",
    steps: [
      {
        id: "understand",
        label: "Understanding objective",
        description: "Defining scope of competitive analysis",
        duration: 800,
        icon: "brain",
      },
      {
        id: "identify",
        label: "Identifying competitors",
        description: "Mapping direct and adjacent players",
        duration: 1100,
        icon: "scan-search",
      },
      {
        id: "analyze",
        label: "Analyzing positioning",
        description: "Comparing features, pricing, and messaging",
        duration: 1100,
        icon: "bar-chart",
      },
      {
        id: "differentiate",
        label: "Finding white space",
        description: "Identifying differentiation opportunities",
        duration: 900,
        icon: "split",
      },
      {
        id: "output",
        label: "Building brief",
        description: "Assembling strategic positioning document",
        duration: 700,
        icon: "file-text",
      },
    ],
    result: {
      title: "Competitive Positioning Brief",
      summary:
        "Three direct competitors occupy the automation-first positioning. A significant gap exists around goal-oriented orchestration that bridges prompt-and-pray AI with structured enterprise workflows.",
      insights: [
        "Competitors focus on task automation, not goal orchestration",
        "None offer transparent reasoning traces for enterprise buyers",
        "Pricing models skew toward seat-based vs. workflow-based",
      ],
      nextAction: "Own 'goal-to-outcome orchestration' as core positioning",
    },
  },
  {
    id: "automation-opportunities",
    label: "Find automation opportunities",
    description: "Identify where AI can save time in your business",
    steps: [
      {
        id: "understand",
        label: "Understanding objective",
        description: "Mapping target business function",
        duration: 800,
        icon: "brain",
      },
      {
        id: "map",
        label: "Mapping current workflows",
        description: "Identifying repetitive processes",
        duration: 1200,
        icon: "workflow",
      },
      {
        id: "evaluate",
        label: "Evaluating automability",
        description: "Scoring tasks by effort vs. impact",
        duration: 1000,
        icon: "sliders-horizontal",
      },
      {
        id: "prioritize",
        label: "Prioritizing opportunities",
        description: "Ranking by ROI and feasibility",
        duration: 800,
        icon: "list-ordered",
      },
      {
        id: "output",
        label: "Generating roadmap",
        description: "Building phased implementation plan",
        duration: 700,
        icon: "file-text",
      },
    ],
    result: {
      title: "AI Automation Roadmap",
      summary:
        "Ticket triage, report generation, and data normalization represent the highest-ROI automation opportunities with lowest implementation risk.",
      insights: [
        "Ticket classification could save ~12h/week per support agent",
        "Report generation is fully automatable with existing data",
        "Data normalization blocks 3 downstream workflows today",
      ],
      nextAction: "Start with ticket classification — highest impact, lowest risk",
    },
  },
];

// Workflow Builder data
export type GoalType = "Research" | "Analysis" | "Marketing" | "Operations";
export type InputSource = "Documents" | "Web" | "APIs" | "Data";
export type OutputFormat = "Report" | "Recommendation" | "Action Plan" | "Automation";

export type WorkflowConfig = {
  goal: GoalType;
  input: InputSource;
  output: OutputFormat;
};

export type BuilderWorkflow = {
  nodes: Array<{
    label: string;
    sublabel: string;
    type: "start" | "process" | "decision" | "end";
  }>;
};

export function getBuilderWorkflow(config: WorkflowConfig): BuilderWorkflow {
  const agentName = `${config.goal} Agent`;
  const inputNode = `Process ${config.input}`;

  const decisionLabel =
    config.goal === "Research"
      ? "Synthesize findings"
      : config.goal === "Analysis"
        ? "Identify patterns"
        : config.goal === "Marketing"
          ? "Develop messaging"
          : "Optimize process";

  const outputLabel = config.output;
  const outputSub =
    config.output === "Report"
      ? "Structured document"
      : config.output === "Recommendation"
        ? "Prioritized guidance"
        : config.output === "Action Plan"
          ? "Step-by-step plan"
          : "Executable workflow";

  return {
    nodes: [
      { label: "Goal", sublabel: config.goal, type: "start" },
      { label: agentName, sublabel: "Understanding objective", type: "process" },
      { label: inputNode, sublabel: `From ${config.input.toLowerCase()}`, type: "process" },
      { label: "Reason", sublabel: decisionLabel, type: "decision" },
      { label: outputLabel, sublabel: outputSub, type: "end" },
    ],
  };
}

// Capabilities data
export const CAPABILITIES = [
  {
    id: "ai-agents",
    title: "AI Agents",
    description:
      "Autonomous agents that reason through multi-step objectives, decomposing complex goals into structured execution plans.",
    accent: "indigo",
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    description:
      "Transform repetitive processes into structured, reliable workflows that execute consistently and transparently.",
    accent: "violet",
  },
  {
    id: "research-reasoning",
    title: "Research & Reasoning",
    description:
      "Transform raw information and signals into useful decisions, recommendations, and strategic insights.",
    accent: "blue",
  },
  {
    id: "action-orchestration",
    title: "Action Orchestration",
    description:
      "Bridge the gap between insight and execution through connected workflows that move your business forward.",
    accent: "purple",
  },
] as const;

// Philosophy principles
export const PRINCIPLES = [
  {
    id: "understand",
    number: "01",
    title: "Understand the objective",
    description:
      "Every workflow begins with a clear goal — not a prompt. Aivora interprets intent, not just instructions, to build a grounded execution plan.",
  },
  {
    id: "reason",
    number: "02",
    title: "Reason through the workflow",
    description:
      "Rather than executing steps blindly, Aivora applies structured reasoning at each stage — evaluating options, handling uncertainty, and adapting as information emerges.",
  },
  {
    id: "deliver",
    number: "03",
    title: "Deliver an actionable outcome",
    description:
      "The output of every Aivora workflow is structured, useful, and ready to act on. Not a wall of text. A deliverable.",
  },
] as const;
