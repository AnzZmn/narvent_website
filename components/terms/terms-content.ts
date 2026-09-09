export type Block =
  | { isText: true; text: string }
  | { isList: true; items: string[] };

export type Section = { title: string; blocks: Block[] };

const P = (text: string): Block => ({ isText: true, text });
const L = (...items: string[]): Block => ({ isList: true, items });

export const LAST_UPDATED = "August 29, 2026";

export const INTRO: string[] = [
  "Welcome to Narvent.",
  'These Terms & Conditions ("Terms") govern your access to and use of the Narvent website, platform, applications, products, and services (collectively, the "Platform").',
  "By accessing or using Narvent, you agree to be bound by these Terms. If you do not agree with these Terms, you should not use the Platform.",
  'In these Terms, "Narvent", "we", "us", and "our" refer to Narvent. "You" or "User" refers to any person or organization accessing or using the Platform, including workers, businesses, clients, contractors, and visitors.',
];

export const CLOSING =
  "By accessing or using Narvent, you acknowledge that you have read, understood, and agree to these Terms & Conditions.";

export const slugify = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const sectionNumber = (i: number) => String(i + 1).padStart(2, "0");

export const SECTIONS: Section[] = [
  { title: "About Narvent", blocks: [
    P("Narvent is a workforce and gig-work platform that enables businesses to access and manage distributed workers for real-world operational projects."),
    P("Depending on the service, Narvent may facilitate:"),
    L("Workforce sourcing", "Worker registration and verification", "Project-based gig work", "Field operations", "Auditing and asset verification", "Data collection", "Data annotation", "Workforce deployment", "Task management", "Worker and project coordination", "Payment administration", "Workforce analytics and reporting"),
    P("Narvent may act as a platform, workforce service provider, project coordinator, or intermediary depending on the specific engagement.")
  ]},
  { title: "Eligibility", blocks: [
    P("To use Narvent, you must:"),
    L("Provide accurate and complete information", "Meet the minimum age and eligibility requirements applicable to the relevant service", "Have the legal capacity to enter into an agreement", "Comply with applicable laws and regulations", "Maintain the security of your account credentials"),
    P("Businesses and organizations must ensure that individuals using the Platform on their behalf are authorized to do so."),
    P("Narvent may restrict or refuse access to any person who does not meet applicable eligibility requirements.")
  ]},
  { title: "Account Registration", blocks: [
    P("Certain features require you to create an account."),
    P("You agree to:"),
    L("Provide accurate information", "Keep your information up to date", "Maintain the confidentiality of your login credentials", "Not share your account with unauthorized individuals", "Notify Narvent if you suspect unauthorized access", "Accept responsibility for activity conducted through your account"),
    P("You must not create an account using false information or impersonate another person or organization."),
    P("Narvent may suspend or terminate accounts that contain inaccurate, misleading, fraudulent, or unauthorized information.")
  ]},
  { title: "Worker Registration", blocks: [
    P("Individuals registering as workers may be required to provide information necessary to assess eligibility and facilitate project assignments."),
    P("This may include:"),
    L("Identity information", "Contact information", "Skills", "Experience", "Qualifications", "Location or service area", "Availability", "Documents required for verification", "Payment information"),
    P("You agree that information submitted during registration must be truthful and current."),
    P("Submitting false documents, impersonating another person, manipulating verification processes, or providing fraudulent information may result in immediate suspension or termination.")
  ]},
  { title: "Worker Verification", blocks: [
    P("Narvent may verify workers using information or documents submitted by the worker or obtained through authorized verification providers."),
    P("Verification may be required for certain projects."),
    P("Verification does not guarantee that:"),
    L("You will receive work", "You will be accepted for every project", "You will earn a particular amount", "You will remain eligible for future assignments"),
    P("Narvent may periodically request additional verification where reasonably necessary.")
  ]},
  { title: "Projects and Assignments", blocks: [
    P("Projects may be offered to eligible workers based on factors including:"),
    L("Skills", "Location", "Availability", "Project requirements", "Verification status", "Previous task performance", "Quality requirements", "Other operational criteria"),
    P("Availability of projects is not guaranteed."),
    P("Narvent does not guarantee any minimum number of assignments, working hours, income, or earnings unless expressly agreed to in writing."),
    P("A worker may accept or decline an assignment where the applicable project terms permit."),
    P("Once an assignment has been accepted, the worker is expected to comply with the applicable project requirements, deadlines, instructions, and quality standards.")
  ]},
  { title: "Worker Responsibilities", blocks: [
    P("Workers using Narvent agree to:"),
    L("Complete accepted assignments honestly and accurately", "Follow project instructions", "Meet applicable deadlines", "Maintain professional conduct", "Protect confidential information", "Submit genuine work", "Avoid fraudulent activity", "Use their own authorized account", "Provide accurate task information", "Follow applicable safety requirements", "Respect client property and personnel", "Report problems affecting task completion"),
    P("Workers must not:"),
    L("Submit fabricated work", "Falsify attendance or location", "Complete tasks using unauthorized individuals", "Create multiple accounts to manipulate assignments", "Manipulate task results", "Misrepresent qualifications", "Circumvent verification procedures", "Attempt to manipulate payment systems", "Misuse client information", "Engage in harassment, threats, discrimination, or abusive behavior", "Use automated systems to perform tasks where prohibited by project requirements")
  ]},
  { title: "Business and Client Responsibilities", blocks: [
    P("Businesses using Narvent agree to:"),
    L("Provide accurate project requirements", "Provide lawful instructions", "Provide accurate payment information", "Treat workers professionally and lawfully", "Provide reasonable information necessary to complete assignments", "Respect worker privacy", "Use worker information only for legitimate purposes", "Comply with applicable employment, labor, tax, safety, privacy, and other laws"),
    P("Businesses must not use Narvent to request unlawful, unsafe, discriminatory, fraudulent, or abusive activities.")
  ]},
  { title: "Project Instructions", blocks: [
    P("Each project may have additional requirements, instructions, deadlines, quality standards, payment rates, eligibility requirements, or restrictions."),
    P("Project-specific terms communicated through Narvent may supplement these Terms."),
    P("Where a project-specific requirement conflicts with these Terms, the project-specific requirement will apply only to the extent that it is consistent with applicable law and these Terms.")
  ]},
  { title: "Payments to Workers", blocks: [
    P("Where Narvent facilitates worker payments, the applicable project or assignment will specify the relevant payment structure where appropriate."),
    P("Payment may depend on:"),
    L("Completed work", "Accepted work", "Verified task completion", "Quality requirements", "Project-specific conditions", "Applicable deductions or adjustments"),
    P("Payments may be subject to applicable taxes, fees, withholding requirements, or other legal obligations."),
    P("Narvent does not guarantee a particular level of income unless expressly agreed.")
  ]},
  { title: "Payment Disputes", blocks: [
    P("If you believe that a payment is incorrect, you should notify Narvent through the designated support channel within a reasonable period."),
    P("Narvent may review relevant:"),
    L("Task records", "Submission data", "Verification records", "Project instructions", "Attendance information", "Communication records", "Other relevant operational data"),
    P("Following review, Narvent may correct confirmed payment errors where appropriate.")
  ]},
  { title: "Business Payments and Fees", blocks: [
    P("Businesses may be charged fees for workforce services, project management, staffing, platform access, or other services."),
    P("Applicable pricing, payment terms, and fees may be communicated through proposals, orders, invoices, contracts, or the Platform."),
    P("Unless otherwise agreed, invoices must be paid according to the payment terms specified by Narvent."),
    P("Narvent may suspend services for overdue payments where permitted by the applicable agreement and law.")
  ]},
  { title: "Cancellations and Project Changes", blocks: [
    P("Projects may be modified, postponed, or cancelled due to operational, client, technical, legal, or other circumstances."),
    P("Narvent will make reasonable efforts to communicate material changes where appropriate."),
    P("Cancellation of a project does not automatically create an entitlement to future work or compensation unless required by applicable law or expressly agreed in the relevant project terms.")
  ]},
  { title: "Worker Status", blocks: [
    P("Unless expressly agreed otherwise in a separate written agreement, participation in Narvent projects does not by itself create an employer-employee relationship between Narvent and a worker."),
    P("The legal classification of a worker or service provider will depend on the actual relationship and applicable law."),
    P("Nothing in these Terms is intended to waive or limit rights that cannot legally be waived.")
  ]},
  { title: "Intellectual Property", blocks: [
    P("The Narvent Platform, including its software, website, branding, logos, design, graphics, content, interfaces, and underlying technology, is owned by or licensed to Narvent and is protected by applicable intellectual property laws."),
    P("You may not:"),
    L("Copy or reproduce the Platform without permission", "Modify or create derivative works from Narvent's software", "Reverse engineer or attempt to extract source code", "Scrape or systematically collect Platform data", "Use Narvent branding without authorization", "Sell, sublicense, or commercially exploit the Platform without permission")
  ]},
  { title: "Worker-Created Content and Deliverables", blocks: [
    P("Project-specific agreements may determine ownership of work, deliverables, datasets, annotations, reports, photographs, recordings, documents, or other materials created during an assignment."),
    P("Workers agree to comply with the intellectual-property and confidentiality requirements applicable to the relevant project."),
    P("Where a project requires assignment or licensing of rights, the applicable project terms will specify those requirements.")
  ]},
  { title: "Confidentiality", blocks: [
    P("Users may receive confidential information belonging to Narvent, clients, workers, businesses, or other parties."),
    P("You agree not to:"),
    L("Disclose confidential information without authorization", "Use confidential information for unrelated purposes", "Copy confidential materials unnecessarily", "Share project data with unauthorized individuals", "Retain confidential information after being instructed to delete or return it"),
    P("Confidential information may include project instructions, business information, datasets, customer information, worker information, pricing, technical information, and non-public Platform information.")
  ]},
  { title: "Personal Data and Privacy", blocks: [
    P("Your use of Narvent is also governed by our Privacy Policy."),
    P("We may collect and process personal information as described in the Privacy Policy, including information necessary for account management, verification, workforce operations, payments, security, and project execution."),
    P("You agree to provide information necessary to use services that require such information, subject to applicable law.")
  ]},
  { title: "Location-Based Assignments", blocks: [
    P("Some assignments may require location information to verify or facilitate work."),
    P("Workers participating in such assignments agree to provide accurate information where required by the project."),
    P("Attempting to falsify, manipulate, or spoof required location information may result in rejection of work, payment adjustments where permitted, suspension, or termination.")
  ]},
  { title: "Artificial Intelligence and Automated Systems", blocks: [
    P("Narvent may use automated systems and artificial intelligence to support workforce matching, recommendations, quality control, fraud detection, customer support, analytics, and other operational functions."),
    P("Automated systems may use information associated with your account, activities, skills, assignments, and interactions where permitted by applicable law."),
    P("AI-assisted or automated processes do not guarantee a particular assignment, outcome, ranking, payment, or business decision."),
    P("Where applicable law provides rights concerning automated decision-making, those rights remain unaffected by these Terms.")
  ]},
  { title: "Prohibited Activities", blocks: [
    P("You may not use Narvent to:"),
    L("Violate any applicable law", "Commit fraud", "Impersonate another person", "Provide false identity information", "Manipulate verification", "Manipulate task results", "Circumvent Platform security", "Access another user's account", "Introduce malware or malicious code", "Attempt unauthorized access to Narvent systems", "Scrape or harvest information without authorization", "Interfere with Platform operation", "Abuse workers, clients, or Narvent personnel", "Engage in harassment or threats", "Conduct discriminatory or unlawful activities", "Use Narvent for unauthorized commercial purposes", "Circumvent payment or Platform mechanisms"),
    P("Narvent may take appropriate action when prohibited activity is detected.")
  ]},
  { title: "Account Suspension and Termination", blocks: [
    P("Narvent may suspend, restrict, or terminate access where reasonably necessary, including when:"),
    L("These Terms are violated", "False information is provided", "Fraud is suspected", "Platform security is compromised", "A user engages in abusive conduct", "A user repeatedly fails project requirements", "Payment obligations are not met", "Required verification cannot be completed", "Continued access creates legal, security, or operational risk"),
    P("Where appropriate and legally required, Narvent may provide notice or an opportunity to resolve the issue."),
    P("Termination does not eliminate obligations that are intended to survive termination, including confidentiality, intellectual property, payment obligations, and applicable dispute provisions.")
  ]},
  { title: "Platform Availability", blocks: [
    P("We aim to keep Narvent available and reliable but do not guarantee uninterrupted access."),
    P("The Platform may occasionally be unavailable due to:"),
    L("Maintenance", "Updates", "Technical failures", "Security incidents", "Network failures", "Third-party service interruptions", "Events beyond our reasonable control"),
    P("We may modify, suspend, or discontinue features of the Platform where reasonably necessary.")
  ]},
  { title: "Third-Party Services", blocks: [
    P("Narvent may rely on third-party services for functions such as:"),
    L("Payments", "Cloud infrastructure", "Communications", "Identity verification", "Analytics", "Authentication", "Hosting", "Security", "Maps and location services"),
    P("Third-party services may have separate terms and privacy policies."),
    P("Narvent is not responsible for failures or policies of third-party services beyond our reasonable control.")
  ]},
  { title: "Disclaimers", blocks: [
    P("To the maximum extent permitted by applicable law, Narvent provides the Platform and its services on an \"as available\" basis."),
    P("We do not guarantee that:"),
    L("The Platform will always be available", "Every project will be suitable for every worker", "Workers will receive a particular number of assignments", "Businesses will receive a particular workforce size", "A worker will earn a particular amount", "Project outcomes will always meet a particular expectation", "Information provided by other users will always be accurate"),
    P("Nothing in these Terms excludes any warranty, right, or protection that cannot legally be excluded.")
  ]},
  { title: "Limitation of Liability", blocks: [
    P("To the maximum extent permitted by applicable law, Narvent will not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform."),
    P("This may include loss of profits, revenue, business opportunities, data, or goodwill."),
    P("Nothing in these Terms limits liability where such limitation is prohibited by applicable law, including liability that cannot legally be excluded or limited.")
  ]},
  { title: "Indemnification", blocks: [
    P("To the extent permitted by applicable law, you agree to indemnify and hold Narvent and its directors, officers, employees, contractors, and affiliates harmless from claims, losses, liabilities, damages, and expenses arising from:"),
    L("Your violation of these Terms", "Your unlawful conduct", "Fraudulent activity", "Unauthorized use of the Platform", "Your violation of another person's rights", "Your breach of confidentiality obligations", "Your misuse of Platform or project information"),
    P("This provision applies only to the extent permitted by applicable law.")
  ]},
  { title: "Changes to These Terms", blocks: [
    P("Narvent may update these Terms from time to time."),
    P("When material changes are made, we may provide reasonable notice through the Platform, website, email, or another appropriate method where required."),
    P("Your continued use of Narvent after updated Terms become effective constitutes acceptance of the revised Terms, to the extent permitted by law.")
  ]},
  { title: "Governing Law", blocks: [
    P("These Terms shall be governed by the applicable laws of India, subject to any mandatory rights or protections applicable to you under the laws of your jurisdiction."),
    P("Any dispute will be subject to the jurisdiction of the courts or dispute-resolution mechanism specified in the applicable agreement with Narvent, where applicable.")
  ]},
  { title: "Severability", blocks: [
    P("If any provision of these Terms is determined to be invalid or unenforceable, the remaining provisions will continue to apply to the extent permitted by law.")
  ]},
  { title: "Entire Agreement", blocks: [
    P("These Terms, together with any applicable project terms, agreements, policies, and the Narvent Privacy Policy, constitute the applicable agreement governing your use of the Platform, unless a separate written agreement expressly supersedes them.")
  ]},
  { title: "Contact Us", blocks: [
    P("If you have questions regarding these Terms, please contact Narvent through the contact information provided on our website.")
  ]}
];
