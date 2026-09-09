export default function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Narvent",
    url: "https://narvent.in",
    logo: "https://www.narvent.in/NarventSVG.svg",
    description:
      "AI-powered workforce and gig staffing platform connecting businesses with verified workers across India.",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Narvent",
    url: "https://narvent.in",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(website),
        }}
      />
    </>
  );
}
