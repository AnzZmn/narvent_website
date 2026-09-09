import type { IconName } from "./OfferingIcon";

export type Offering = {
  icon: IconName;
  title: string;
  blurb: string;
  points: string[];
};

export type CollarTab = {
  label: string;
  subtitle: string;
  cards: Offering[];
};

export const OFFERINGS: CollarTab[] = [
  {
    label: "White Collar",
    subtitle: "Cognitive, Desk-based, Tech-centric",
    cards: [
      {
        icon: "robot",
        title: "Egocentric Video Data for Robotics",
        blurb: "High-Quality human POV datasets for imitation learning & embodied AI",
        points: [
          "4K first-person video capture at massive scale",
          "1000+ hours of egocentric video per day",
          "98%+ robotics-grade annotation accuracy",
        ],
      },
      {
        icon: "doc",
        title: "Data Annotation",
        blurb: "AI/ML-ready data annotation, tech-scaled for accuracy.",
        points: [
          "10Mn+ data points labeled monthly",
          "99%+ accuracy via quality checks",
          "Supports images, text, speech & videos",
          "Industry-specific annotation solutions",
        ],
      },
      {
        icon: "org",
        title: "AI-First Tech Capability Centers",
        blurb: "Build AI-First On-site Teams",
        points: [
          "On-site, time-zone aligned developers",
          "AI-tracked productivity & Integration Manager oversight",
          "Secure offices, enterprise-ready compliance",
          "Go live in ~2 weeks with 5-10 engineers",
        ],
      },
      {
        icon: "flag",
        title: "Promoter Deployment",
        blurb: "Convert prospects to customers across sectors (e.g., retail, healthcare, telecom).",
        points: [
          "Enhancing brand value through strategic up-selling and cross-selling.",
          "Target the right audience for high quality lead generation.",
          "In store promotion, outstore promotion, BTL activities, and more!",
        ],
      },
      {
        icon: "clipboard",
        title: "Audit",
        blurb: "Full audits: stocks, compliance, fraud, competition via mystery/non-mystery audits.",
        points: [
          "4000+ audit parameters",
          "3500+ retailers & 1.5M shipments audited",
          "50% reduction in seller claims after audit completion",
          "25+ data points captured against each shipment",
          "25% average cost saved for businesses",
        ],
      },
    ],
  },
  {
    label: "Grey Collar",
    subtitle: "Hybrid roles, Tech-assisted but operational",
    cards: [
      {
        icon: "phone",
        title: "Telecalling",
        blurb: "Flexible inbound/outbound telecalling via virtual call centers & configurable modules.",
        points: [
          "1,00,000+ daily telecalling capacity",
          "1,80,000+ registered and trained telecallers",
          "15+ languages vernacular support",
          "Secured number masking, call recording, dynamic call distribution, and more!",
        ],
      },
      {
        icon: "list",
        title: "Content Moderation and Catalog Operations",
        blurb: "Compliance-focused cataloging & video moderation, scalable & cost-effective.",
        points: [
          "98%+ SLA adherence",
          "Full Stack Service - Editing of catalog, Listing of Catalog, Verification and many more.",
          "3Mn+ content moderated on a monthly basis",
        ],
      },
      {
        icon: "badge",
        title: "Merchant/Seller Onboarding",
        blurb: "Streamlined merchant/customer onboarding across tier 1-3 cities.",
        points: [
          "5,00,000+ merchants/sellers onboarded",
          "Streamlined onboarding for faster account set-up and verification",
        ],
      },
      {
        icon: "gift",
        title: "Loyalty and Rewards",
        blurb: "Boost engagement with tailored loyalty programs that enhance retention.",
        points: [
          "Boost in Customer Retention",
          "Increase in Repeat Purchases",
          "PAN India Coverage",
          "On-Ground Adoption",
        ],
      },
      {
        icon: "users",
        title: "Omni-staffing",
        blurb: "Skilled PAN India merchandising & loyalty program execution.",
        points: [
          "Managed or Unmanaged staffing options",
          "Fixed and variable Payment models",
          "1.5 million+ skilled professionals PAN India",
        ],
      },
    ],
  },
  {
    label: "Blue Collar",
    subtitle: "Manual, Field-intensive roles",
    cards: [
      {
        icon: "users",
        title: "Omni-staffing",
        blurb: "Skilled PAN India merchandising & loyalty program execution.",
        points: [
          "Managed or Unmanaged staffing options",
          "Fixed and variable Payment models",
          "1.5 million+ skilled professionals PAN India",
        ],
      },
      {
        icon: "bag",
        title: "Visual Merchandising and Branding",
        blurb: "Optimize merchandising & branding with Awign's comprehensive solutions",
        points: ["PAN India Execution", "Industry Agnostic Expertise", "Value-driven Approach"],
      },
      {
        icon: "chart",
        title: "Market & Employee Survey",
        blurb: "Insight-driven market/employee surveys for strategic decisions.",
        points: [
          "50K+ outlets & workplaces surveyed nationwide",
          "35% faster data collection",
          "Geo-tagged, image & voice proof",
        ],
      },
    ],
  },
];
