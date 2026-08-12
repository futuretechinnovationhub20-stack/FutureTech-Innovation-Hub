export interface AuthorPositionPricing {
  position: string;
  bdtPrice: string;
  intlPrice: string;
}

export interface ResearchProjectPlan {
  id: string;
  title: string;
  subtitle: string;
  duration?: string;
  teamMembers: string;
  totalCost?: { bdt: string; intl: string };
  advance: { bdt: string; intl: string };
  refundPolicy?: string;
  paymentNote: string;
  isFeatured?: boolean;
  authorPositions: AuthorPositionPricing[];
}

export const RESEARCH_PROJECT_PLANS: ResearchProjectPlan[] = [
  {
    id: "q1-project",
    title: "Q1 RESEARCH PROJECT",
    subtitle: "Research Work + Publication Support",
    duration: "Approximately 1 Month",
    teamMembers: "8 Members",
    advance: { bdt: "৳2,000", intl: "$16" },
    paymentNote: "Remaining balance payable after paper acceptance.",
    isFeatured: true,
    authorPositions: [
      { position: "Main Author", bdtPrice: "৳40,000", intlPrice: "$325" },
      { position: "1st Co-author", bdtPrice: "৳20,000", intlPrice: "$165" },
      { position: "2nd Co-author", bdtPrice: "৳18,000", intlPrice: "$150" },
      { position: "3rd Co-author", bdtPrice: "৳16,000", intlPrice: "$135" },
      { position: "4th Co-author", bdtPrice: "৳14,000", intlPrice: "$120" },
      { position: "5th Co-author", bdtPrice: "৳12,500", intlPrice: "$105" },
      { position: "6th Co-author", bdtPrice: "৳10,500", intlPrice: "$90" },
      { position: "7th Co-author", bdtPrice: "৳9,000", intlPrice: "$75" },
    ],
  },
  {
    id: "q2-project",
    title: "Q2 RESEARCH PROJECT",
    subtitle: "Research Work + Publication Support",
    duration: "Approximately 1 Month",
    teamMembers: "8 Members",
    advance: { bdt: "৳1,500", intl: "$12" },
    paymentNote: "Remaining balance payable after paper acceptance.",
    isFeatured: false,
    authorPositions: [
      { position: "Main Author", bdtPrice: "৳30,000", intlPrice: "$250" },
      { position: "1st Co-author", bdtPrice: "৳15,000", intlPrice: "$125" },
      { position: "2nd Co-author", bdtPrice: "৳13,000", intlPrice: "$110" },
      { position: "3rd Co-author", bdtPrice: "৳11,500", intlPrice: "$100" },
      { position: "4th Co-author", bdtPrice: "৳10,000", intlPrice: "$85" },
      { position: "5th Co-author", bdtPrice: "৳9,000", intlPrice: "$75" },
      { position: "6th Co-author", bdtPrice: "৳8,000", intlPrice: "$70" },
      { position: "7th Co-author", bdtPrice: "৳7,000", intlPrice: "$60" },
    ],
  },
  {
    id: "q3-q4-project",
    title: "Q3/Q4 RESEARCH PROJECT",
    subtitle: "Research Work + Publication Support",
    duration: "Approximately 1 Month",
    teamMembers: "8 Members",
    totalCost: { bdt: "৳70,000", intl: "$565" },
    advance: { bdt: "৳2,000", intl: "$16" },
    paymentNote: "Remaining balance payable after paper acceptance.",
    isFeatured: false,
    authorPositions: [
      { position: "Main Author", bdtPrice: "৳12,000", intlPrice: "$100" },
      { position: "1st Co-author", bdtPrice: "৳11,000", intlPrice: "$90" },
      { position: "2nd Co-author", bdtPrice: "৳10,000", intlPrice: "$85" },
      { position: "3rd Co-author", bdtPrice: "৳9,000", intlPrice: "$75" },
      { position: "4th Co-author", bdtPrice: "৳8,000", intlPrice: "$70" },
      { position: "5th Co-author", bdtPrice: "৳7,000", intlPrice: "$60" },
      { position: "6th Co-author", bdtPrice: "৳6,000", intlPrice: "$50" },
      { position: "7th Co-author", bdtPrice: "৳5,000", intlPrice: "$45" },
    ],
  },
  {
    id: "ieee-conference",
    title: "IEEE CONFERENCE PAPER",
    subtitle: "Research Work + Publication Support",
    teamMembers: "7 Members",
    advance: { bdt: "৳1,000", intl: "$8" },
    refundPolicy: "If the paper is rejected, the advance payment is refundable.",
    paymentNote: "Remaining balance payable after paper acceptance.",
    isFeatured: false,
    authorPositions: [
      { position: "Main Author", bdtPrice: "৳6,000", intlPrice: "$50" },
      { position: "1st Co-author", bdtPrice: "৳5,000", intlPrice: "$45" },
      { position: "2nd Co-author", bdtPrice: "৳4,500", intlPrice: "$40" },
      { position: "3rd Co-author", bdtPrice: "৳4,000", intlPrice: "$35" },
      { position: "4th Co-author", bdtPrice: "৳3,500", intlPrice: "$30" },
      { position: "5th Co-author", bdtPrice: "৳3,000", intlPrice: "$25" },
      { position: "6th Co-author", bdtPrice: "৳2,500", intlPrice: "$22" },
    ],
  },
];
