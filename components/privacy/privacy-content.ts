export type Block =
  | { isText: true; text: string }
  | { isHead: true; text: string }
  | { isList: true; items: string[] };

export type Section = { title: string; blocks: Block[] };

const P = (text: string): Block => ({ isText: true, text });
const H = (text: string): Block => ({ isHead: true, text });
const L = (...items: string[]): Block => ({ isList: true, items });

export const LAST_UPDATED = "August 29, 2026";

export const INTRO: string[] = [
  'Narvent ("Narvent", "we", "us", or "our") respects your privacy and is committed to protecting the personal information you provide when using our website, platform, products, and services.',
  "This Privacy Policy explains what information we collect, how we use it, how we protect it, and the choices available to you.",
  "By accessing or using Narvent, you acknowledge that you have read and understood this Privacy Policy.",
];

export const CLOSING =
  "By using Narvent, you acknowledge that you have read and understood this Privacy Policy.";

export const slugify = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const sectionNumber = (i: number) => String(i + 1).padStart(2, "0");

export const SECTIONS: Section[] = [
  { title: "About Narvent", blocks: [
    P("Narvent is a workforce and gig-work platform that connects businesses with workers and enables organizations to manage distributed workforces for real-world operations, data collection, auditing, annotation, field operations, and related services."),
    P("Depending on how you interact with Narvent, we may process information relating to workers, business customers, visitors, applicants, contractors, and other users of our platform.")
  ]},
  { title: "Information We Collect", blocks: [
    P("We collect information that you provide directly, information generated through your use of our services, and information provided by authorized third parties."),
    H("Information you provide"),
    P("Depending on the services you use, this may include:"),
    L("Name", "Email address", "Phone number", "Date of birth or age-related information where required", "Profile information", "Location or service area", "Employment or professional information", "Skills, qualifications, and experience", "Work preferences and availability", "Bank or payment information where required for payments", "Identification and verification information", "Documents submitted for verification", "Information provided when contacting our support team", "Information submitted through forms, applications, surveys, or other interactions with Narvent"),
    P("We only request information that is reasonably necessary for the relevant purpose."),
    H("Information collected automatically"),
    P("When you use our website or platform, we may automatically collect:"),
    L("IP address", "Browser type and version", "Device type", "Operating system", "Approximate location derived from technical information", "Pages visited", "Referring and exit pages", "Session information", "Usage and interaction data", "Crash and diagnostic information"),
    P("We may use cookies, local storage, pixels, and similar technologies to provide and improve our services.")
  ]},
  { title: "Worker Information", blocks: [
    P("If you register or work through Narvent as a worker, we may process additional information necessary to operate the workforce platform."),
    P("This may include:"),
    L("Worker profile information", "Skills and qualifications", "Availability", "Work history and completed assignments", "Task and project activity", "Verification status", "Attendance or participation information", "Location information where required for a specific assignment", "Performance and quality-related information", "Payment and transaction information"),
    P("This information may be used to match workers with suitable projects, verify eligibility, administer assignments, process payments, maintain platform integrity, and improve workforce operations.")
  ]},
  { title: "Business Customer Information", blocks: [
    P("If you use Narvent as a business or organization, we may collect information such as:"),
    L("Name and job title", "Business email address", "Phone number", "Company name", "Organization information", "Billing and payment information", "Project requirements", "Workforce requirements", "Communications with Narvent", "Account and platform activity"),
    P("We use this information to provide workforce services, manage projects, communicate with customers, process payments, and provide customer support.")
  ]},
  { title: "How We Use Information", blocks: [
    P("We may use personal information to:"),
    L("Create and manage accounts", "Provide and operate Narvent services", "Match workers with relevant projects", "Facilitate workforce deployment", "Verify workers and businesses", "Process payments and transactions", "Communicate with users", "Respond to enquiries and support requests", "Manage projects and assignments", "Monitor service quality", "Prevent fraud, abuse, and unauthorized activity", "Maintain platform security", "Analyze usage and improve our products", "Develop new features and services", "Comply with applicable laws and legal obligations", "Protect the rights, safety, and property of Narvent and its users"),
    P("We may also use aggregated or de-identified information for analytics, research, and service improvement where such information cannot reasonably be used to identify an individual.")
  ]},
  { title: "Artificial Intelligence and Automated Systems", blocks: [
    P("Narvent may use artificial intelligence, machine learning, and automated systems to support certain aspects of its services."),
    P("These systems may assist with activities such as:"),
    L("Workforce matching", "Project recommendations", "Task allocation", "Quality analysis", "Operational analytics", "Customer support", "Fraud and abuse detection", "Service optimization"),
    P("Where automated systems are used, we take reasonable measures to ensure that their use is appropriate for the relevant purpose."),
    P("Where required by applicable law, you may have rights relating to significant decisions made solely through automated processing.")
  ]},
  { title: "Location Information", blocks: [
    P("Certain Narvent projects may require location-related information to perform or verify real-world assignments."),
    P("Where location information is required, we will explain the relevant purpose where appropriate."),
    P("Depending on the service or assignment, location information may be used for:"),
    L("Assigning nearby work", "Verifying participation at a project location", "Supporting field operations", "Validating task completion", "Improving operational logistics", "Preventing fraud or misuse"),
    P("You may be unable to participate in assignments that require location information if you choose not to provide the information necessary for that assignment.")
  ]},
  { title: "How We Share Information", blocks: [
    P("We do not sell your personal information as a commodity."),
    P("We may share information with trusted parties where reasonably necessary to operate our services, including:"),
    H("Business customers"),
    P("Where appropriate and necessary for a project, relevant worker information may be shared with the business or organization responsible for the assignment."),
    P("The information shared will depend on the nature of the project."),
    H("Service providers"),
    P("We may use third-party providers for services such as:"),
    L("Cloud hosting", "Payment processing", "Communications", "Identity or worker verification", "Analytics", "Security", "Customer support", "Infrastructure and software services"),
    P("These providers may process information on our behalf and are expected to handle information in accordance with applicable contractual and legal requirements."),
    H("Legal and safety purposes"),
    P("We may disclose information where reasonably necessary to:"),
    L("Comply with applicable law", "Respond to lawful requests", "Enforce our terms and policies", "Detect or investigate fraud or abuse", "Protect the security of our platform", "Protect users or the public", "Protect Narvent's legal rights"),
    H("Business transfers"),
    P("If Narvent is involved in a merger, acquisition, restructuring, financing, sale of assets, or similar transaction, personal information may be transferred as part of that transaction, subject to applicable law.")
  ]},
  { title: "Payments", blocks: [
    P("Payments may be processed through third-party payment providers."),
    P("Narvent may receive transaction-related information necessary to confirm and administer payments, but payment card or banking credentials may be processed directly by the relevant payment provider."),
    P("Third-party payment providers may have their own privacy policies and terms.")
  ]},
  { title: "Cookies and Similar Technologies", blocks: [
    P("Narvent may use cookies and similar technologies to:"),
    L("Keep users signed in", "Remember preferences", "Understand website usage", "Improve performance", "Measure traffic", "Maintain security", "Improve user experience"),
    P("You may be able to control cookies through your browser settings."),
    P("Disabling certain cookies may affect the functionality of parts of our website or platform.")
  ]},
  { title: "Data Retention", blocks: [
    P("We retain personal information only for as long as reasonably necessary for the purposes described in this Privacy Policy, including to:"),
    L("Provide our services", "Maintain business and financial records", "Resolve disputes", "Prevent fraud and abuse", "Meet contractual obligations", "Comply with legal requirements", "Enforce our agreements"),
    P("Retention periods may vary depending on the type of information and the purpose for which it was collected."),
    P("When information is no longer required, we may delete, anonymize, or securely dispose of it, subject to applicable legal requirements.")
  ]},
  { title: "Data Security", blocks: [
    P("We take reasonable technical and organizational measures designed to protect personal information against unauthorized access, alteration, disclosure, loss, or destruction."),
    P("Security measures may include:"),
    L("Access controls", "Authentication mechanisms", "Encryption where appropriate", "Secure infrastructure", "Monitoring and logging", "Internal access restrictions", "Security procedures and policies"),
    P("However, no internet transmission or storage system can be guaranteed to be completely secure.")
  ]},
  { title: "Your Privacy Rights", blocks: [
    P("Depending on where you live and applicable law, you may have rights concerning your personal information, including the right to:"),
    L("Request access to personal information we hold about you", "Request correction of inaccurate information", "Request deletion of certain information", "Request restriction of certain processing", "Object to certain processing", "Request a copy of certain information", "Withdraw consent where processing is based on consent", "Complain to a relevant data protection authority"),
    P("Some rights may be subject to legal limitations or exceptions."),
    P("To exercise a privacy right, contact us using the details provided below."),
    P("We may need to verify your identity before fulfilling certain requests.")
  ]},
  { title: "Children's Privacy", blocks: [
    P("Narvent's services are not intended for children who are below the minimum age required to use the relevant service under applicable law."),
    P("We do not knowingly collect personal information from children in violation of applicable law."),
    P("If you believe that a child has provided personal information to us improperly, please contact us so that we can investigate and take appropriate action.")
  ]},
  { title: "Third-Party Services and Links", blocks: [
    P("Our website or platform may contain links to third-party websites, applications, or services."),
    P("We are not responsible for the privacy practices, security, or content of third-party services."),
    P("We encourage you to review the privacy policies of third parties before providing them with personal information.")
  ]},
  { title: "International Data Transfers", blocks: [
    P("Depending on where our users, service providers, and infrastructure are located, personal information may be processed or stored in countries other than the country in which you live."),
    P("Where required by applicable law, we will take appropriate measures for international transfers of personal information.")
  ]},
  { title: "Changes to This Privacy Policy", blocks: [
    P("We may update this Privacy Policy from time to time to reflect changes in our services, technology, legal requirements, or business practices."),
    P("When we make material changes, we may provide additional notice where required by applicable law."),
    P("The \"Last Updated\" date at the top of this policy indicates when it was most recently revised.")
  ]},
  { title: "Contact Us", blocks: [
    P("If you have questions about this Privacy Policy, want to exercise your privacy rights, or have concerns about how your information is handled, please contact Narvent through the contact information provided on our website.")
  ]},
  { title: "Governing Law", blocks: [
    P("This Privacy Policy shall be interpreted in accordance with applicable laws and regulations governing the processing of personal information in the jurisdictions in which Narvent operates."),
    P("Where applicable, nothing in this Privacy Policy limits any rights you may have under mandatory data protection laws.")
  ]}
];
