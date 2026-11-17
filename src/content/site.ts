// All copy comes from the live paythonic.ai (captured 2026-11-17). Keep claims factual: no certifications,
// customer counts or live-corridor claims that aren't true. Sample data in illustrations is labelled as sample.

export const SITE = {
  name: "Paythonic AI Lab",
  url: "https://paythonic.ai",
  email: "hello@paythonic.ai",
  description:
    "DIFC-based fintech building BlutusCore: an AI-native remittance engine and partner integration platform for regulated cross-border payments.",
  ogDescription: "AI-native remittance infrastructure for regulated institutions.",
  status: "DIFC Registration in Progress · Dubai, UAE",
  /** Footer copyright year. A literal on purpose: the site is static, so a computed year freezes at build time anyway. Bump it each January. */
  copyrightYear: 2026,
  legal:
    "Paythonic AI Lab is currently in the process of company registration in the DIFC. It is a technology provider and does not provide regulated financial services or transmit customer funds unless explicitly licensed by the relevant authority.",
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blutuscore/", label: "BlutusCore" },
  { href: "/solutions/", label: "Solutions" },
  { href: "/compliance/", label: "Compliance" },
  { href: "/company/", label: "Company" },
  { href: "/contact/", label: "Contact" },
] as const;

export type SceneKey = "route" | "plug" | "radar" | "chain" | "ledger" | "shield";

export const HOME = {
  title: "AI-Native Infrastructure for Global Remittance",
  lead: "develops BlutusCore, an AI-native remittance engine and partner integration platform for regulated institutions moving money across borders.",
  chips: ["Audit-ready", "Traceable ledger", "API-first", "Compliance-by-design"],
  what: {
    eyebrow: "What we do",
    title: "Build, launch, and scale cross-border money movement",
    lead: "BlutusCore orchestrates the remittance lifecycle (routing, payout partner integration, settlement rails, ledger traceability, and compliance workflows) through a modular, API-first platform.",
  },
  capabilities: [
    { scene: "route", title: "Global Remittance Orchestration", text: "Multi-corridor routing, lifecycle state management, and intelligent partner selection." },
    { scene: "plug", title: "Partner Integration Platform", text: "Unified partner APIs, streamlined onboarding, and continuous SLA monitoring." },
    { scene: "radar", title: "Agentic AI for Ops & Risk", text: "Anomaly detection, fraud signals, and automated exception handling workflows." },
    { scene: "chain", title: "Blockchain & Stablecoin Settlement", text: "Support for stablecoin settlement rails with built-in reconciliation adapters." },
    { scene: "ledger", title: "Double-Entry Ledger", text: "Complete ledger with balances, journals, and comprehensive reconciliation support." },
    { scene: "shield", title: "Compliance-by-Design Controls", text: "KYC/AML/sanctions integration points with configurable rules and escalation." },
  ] satisfies { scene: SceneKey; title: string; text: string }[],
  steps: [
    ["Integrate", "Connect once via APIs & webhooks"],
    ["Configure", "Set corridors, partners, and pricing rules"],
    ["Enable", "Activate compliance workflows and risk policies"],
    ["Orchestrate", "Route, payout, and settle automatically"],
    ["Monitor", "Track performance, exceptions, and reconciliation"],
  ],
  trust: {
    eyebrow: "Compliance-first",
    title: "Designed for trust and regulator expectations",
    lead: "BlutusCore supports auditability, traceability, configurable controls, and human-in-the-loop workflows, helping institutions operate with transparency across jurisdictions.",
  },
  uses: [
    ["Remittance Companies (MSBs)", "Launch corridors faster, standardize partner integrations, and automate exception handling."],
    ["Banks & Neo-banks", "Expand cross-border offerings with controlled risk policies, auditability, and modular adoption."],
    ["Digital Wallets & Fintech", "Enable global payouts to banks, wallets, and cash networks using unified integrations."],
  ],
  cta: { title: "Ready to modernize your remittance stack?", lead: "Talk to Paythonic AI Lab about BlutusCore and corridor deployment options." },
};

export const BLUTUSCORE = {
  eyebrow: "Product",
  title: "BlutusCore",
  subtitle: "AI-Native Remittance Engine & Partner Integration Platform",
  lead: "BlutusCore is a modular, API-first platform designed to power cross-border money movement for regulated institutions, combining orchestration, automation, settlement rails, and audit-ready ledger traceability.",
  modules: [
    { scene: "route", title: "Orchestration", text: "Multi-corridor routing, lifecycle state management, and intelligent partner selection based on cost, speed, and availability." },
    { scene: "radar", title: "AI Ops & Risk", text: "Anomaly detection, fraud signals, exception handling workflows, and predictive routing optimization." },
    { scene: "chain", title: "Settlement Rails", text: "Stablecoin settlement options (e.g., USDC/USDT) alongside traditional rails, with reconciliation adapters." },
    { scene: "ledger", title: "Ledger", text: "Double-entry ledger with balances, journals, comprehensive reconciliation support, and audit trails." },
    { scene: "shield", title: "Compliance", text: "KYC/AML/sanctions integration points, configurable rules engine, and escalation workflows." },
    { scene: "plug", title: "Partner Integration", text: "Unified partner APIs, standardized onboarding checklist, SLA monitoring, and certification workflows." },
  ] satisfies { scene: SceneKey; title: string; text: string }[],
  integration: {
    eyebrow: "Integration",
    title: "Integrate once. Expand globally.",
    lead: "Standardized APIs and event-driven workflows reduce repeated partner builds and accelerate corridor rollout.",
    items: [
      ["RESTful APIs", "Well-documented, versioned APIs for all platform capabilities."],
      ["Event-Driven Webhooks", "Real-time notifications for transaction lifecycle events."],
      ["SDK Support", "Client libraries for faster integration in popular languages."],
    ],
  },
  cta: { title: "See BlutusCore in action", lead: "Schedule a walkthrough with our team to explore how BlutusCore can power your cross-border operations." },
};

export const SOLUTIONS = {
  eyebrow: "Solutions",
  title: "Solutions for Modern Cross-Border Payments",
  lead: "Whether you're a licensed remittance operator, a bank expanding internationally, or a fintech enabling global payouts, BlutusCore adapts to your operational model.",
  audiences: [
    { scene: "route", title: "MSBs / Remittance Operators", text: "Launch corridors faster, standardize partner integrations, and automate exception handling.",
      benefits: ["Reduce time-to-market for new corridors", "Standardize partner onboarding workflows", "Automate exception handling and retries", "Maintain complete transaction traceability"] },
    { scene: "shield", title: "Banks & Neo-banks", text: "Expand cross-border offerings with controlled risk policies, auditability, and modular adoption.",
      benefits: ["Modular adoption path for existing infrastructure", "Enterprise-grade audit and compliance controls", "Configurable risk policies per corridor", "Integration with existing core banking systems"] },
    { scene: "chain", title: "Wallets & Fintech Platforms", text: "Enable global payouts to banks, wallets, and cash networks using unified integrations.",
      benefits: ["Single integration for multiple payout methods", "Real-time payout status and notifications", "Support for wallet-to-wallet transfers", "Cash pickup network integrations"] },
    { scene: "plug", title: "Payout Partners", text: "Connect through consistent technical and operational standards with clear SLAs and monitoring.",
      benefits: ["Standardized technical integration specifications", "Clear SLA definitions and monitoring", "Certification workflows for quality assurance", "Unified reporting and reconciliation"] },
    { scene: "radar", title: "Operations & Compliance Teams", text: "Improve traceability, reduce manual ops, and establish consistent controls across corridors.",
      benefits: ["Centralized exception management dashboard", "Configurable escalation workflows", "Real-time compliance monitoring", "Comprehensive audit trail access"] },
  ] satisfies { scene: SceneKey; title: string; text: string; benefits: string[] }[],
  cta: { title: "Which solution fits your needs?", lead: "Schedule a call to discuss your specific requirements and explore how BlutusCore can help." },
};

export const COMPLIANCE = {
  eyebrow: "Compliance & Trust",
  title: "Compliance & Trust by Design",
  lead: "BlutusCore is architected with compliance, auditability, and operational transparency at its core, helping regulated institutions meet their obligations across jurisdictions.",
  principles: {
    eyebrow: "Our Principles",
    title: "Built for regulator expectations",
    lead: "Every aspect of BlutusCore is designed with compliance officers and regulators in mind.",
    items: [
      { scene: "ledger", title: "Transparent Audit Trails", text: "Every transaction and system action is logged with timestamps, actors, and state changes for complete traceability." },
      { scene: "shield", title: "Configurable Risk Controls", text: "Define and enforce corridor-specific risk policies, limits, and approval workflows based on your regulatory requirements." },
      { scene: "radar", title: "Human-in-the-Loop Escalation", text: "Automated workflows surface exceptions to human operators, ensuring critical decisions receive appropriate oversight." },
      { scene: "plug", title: "Secure Integration Patterns", text: "Least-privilege access controls, encrypted communications, and secure credential management by design." },
      { scene: "route", title: "Operational Monitoring", text: "Real-time dashboards and alerting for transaction health, compliance metrics, and incident readiness." },
    ] satisfies { scene: SceneKey; title: string; text: string }[],
  },
  integrations: {
    eyebrow: "Compliance Integrations",
    title: "KYC, AML & Sanctions",
    lead: "BlutusCore integrates with third-party providers for identity verification, AML monitoring, and sanctions screening.",
    items: [
      ["KYC Integration", "Connect to your preferred identity verification providers with standardized data flows and fallback handling."],
      ["AML Monitoring", "Integration points for transaction monitoring services with configurable escalation rules."],
      ["Sanctions Screening", "Pre-built connectors for major sanctions screening providers with real-time and batch processing support."],
      ["Policy Configuration", "Define policies and escalation flows per partner and corridor to match your regulatory obligations."],
    ],
  },
  security: {
    eyebrow: "Security Engineering",
    title: "Defense in depth",
    lead: "We follow industry best practices for security engineering, access controls, monitoring, and secure SDLC. Our infrastructure is designed with defense in depth, encryption at rest and in transit, and continuous security monitoring.",
    items: ["Encryption at Rest & Transit", "Role-Based Access Control", "Secure SDLC", "Continuous Monitoring"],
  },
  notice:
    "Paythonic AI Lab is currently in the process of company registration in the Dubai International Financial Centre (DIFC). We are a technology provider and do not provide regulated financial services or transmit customer funds unless explicitly licensed by the relevant authority.",
  cta: { title: "Questions about our compliance approach?", lead: "Our team is ready to discuss how BlutusCore can support your regulatory requirements." },
};

export const COMPANY = {
  eyebrow: "About Us",
  statement: "Building infrastructure software for the future of global remittance.",
  profile:
    "Paythonic AI Lab is a fintech startup currently in the process of registering in the Dubai International Financial Centre (DIFC). We are building infrastructure software for global remittance and developing BlutusCore, an AI-native platform designed for regulated institutions to move money across borders with greater speed, safety, and operational clarity.",
  mission: "Modernize global remittance infrastructure through intelligence, automation, and trust.",
  vision: "Become the operating system for cross-border money movement.",
  values: [
    ["Trust", "Building reliable infrastructure that regulators and institutions can depend on."],
    ["Clarity", "Transparent communication, clear documentation, and straightforward operations."],
    ["Execution", "Delivering working solutions that solve real problems for our clients."],
    ["Partnership", "Collaborating closely with clients to understand and meet their needs."],
  ],
  cta: { title: "Ready to work with us?", lead: "Learn how Paythonic AI Lab can help modernize your cross-border payment operations." },
};

export const CONTACT = {
  eyebrow: "Contact",
  title: "Contact Paythonic",
  lead: "Request a product walkthrough, discuss partner integration, or explore corridor deployment options.",
  location: "Dubai International Financial Centre (DIFC), Dubai, UAE",
  response: "We typically respond within 1-2 business days",
  faq: [
    ["Is Paythonic a money service business?", "No. Paythonic AI Lab operates as a technology provider. Regulated activities are performed by licensed institutions."],
    ["Do you support stablecoin settlement?", "BlutusCore can support stablecoin-based settlement rails where appropriate, alongside reconciliation and controls."],
    ["How long does integration take?", "Integration timelines vary by corridor and partners; BlutusCore is designed to reduce repeated integrations through standard APIs and workflows."],
    ["Can we adopt modules selectively?", "Yes. BlutusCore is modular and supports phased adoption. You can start with specific modules and expand as your needs grow."],
  ],
};

// ---------- Redesign (2026-11-18): copy for the new Home sections. Positioning lines, no figures or claims. ----------
export const PROBLEM = {
  eyebrow: "Why now",
  title: "Cross-border payments still run on patchwork. BlutusCore turns it into one rail.",
  lead: "Every new partner adds another point-to-point link, another format and another reconciliation file. BlutusCore replaces the tangle with one traceable path.",
};

export const BEFORE_AFTER = {
  eyebrow: "Before and after",
  title: "Remittance without the patchwork",
  before: ["A separate build for every partner", "Manual sanctions and AML reviews", "Spreadsheet reconciliation", "No single audit trail"],
  after: ["Integrate once via APIs & webhooks", "Configurable rules, human-in-the-loop escalation", "Double-entry ledger with reconciliation", "Every state change logged"],
};

export const STORY = {
  eyebrow: "How BlutusCore moves money",
  steps: [
    { kind: "route", title: "Quote & route", text: "Intelligent partner selection based on cost, speed, and availability." },
    { kind: "shield", title: "Screen & decide", text: "KYC/AML/sanctions checks with configurable rules and human-in-the-loop escalation." },
    { kind: "chain", title: "Settle & reconcile", text: "Stablecoin and traditional rails, with reconciliation adapters." },
    { kind: "ledger", title: "Record & prove", text: "A double-entry ledger and an audit trail for every state change." },
  ] satisfies { kind: SceneKey; title: string; text: string }[],
};

export const SHOWCASE = {
  eyebrow: "The platform",
  title: "One engine, every step of the transfer",
  tabs: [
    { scene: "route", title: "Quote & route" },
    { scene: "shield", title: "Screening" },
    { scene: "ledger", title: "Ledger" },
    { scene: "chain", title: "Settlement" },
  ] satisfies { scene: SceneKey; title: string }[],
};

export const DEVELOPERS = {
  eyebrow: "For developers",
  title: "One API call starts the whole flow",
  lead: "Standardized REST APIs and event-driven webhooks: send one request, get every lifecycle event back.",
  flow: ["Your app", "BlutusCore", "Compliance", "Payout partner"],
};

export const ORBIT = {
  inner: ["Banks", "Wallets", "Cash networks", "Stablecoin rails"],
  outer: ["KYC providers", "Sanctions screening", "Payout partners", "Core banking"],
};

/** Circuit chips: Home walks the five steps, the BlutusCore page walks a transfer through the modules. */
export const CIRCUIT_STEPS = HOME.steps.map(([t]) => t);
export const CIRCUIT_MODULES = ["Sender", "Quote · FX", "Compliance", "Routing", "Ledger", "Payout"];

/** The four promises in HOME.trust.lead, shown as pillars around the glass shield (design pick TR1). */
export const TRUST_PILLARS: [string, string][] = [
  ["Auditability", "Every transaction and system action is logged with timestamps, actors and state changes."],
  ["Configurable controls", "Corridor-specific risk policies, limits and approval workflows."],
  ["Human-in-the-loop", "Exceptions reach operators when a decision needs oversight."],
  ["Traceability", "One trail for every transfer, across partners and jurisdictions."],
];

/** BlutusCore page: the integrations orbit (design picks OB1 glass-sphere hub, OP1 own section). */
export const PARTNER_NETWORK = {
  eyebrow: "Partner network",
  title: "One hub for every partner",
  lead: "Banks, wallets, cash networks, stablecoin rails and compliance providers connect through one integration layer, which reduces repeated partner builds as you add corridors.",
};
