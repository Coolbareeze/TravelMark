import type { NavGroup } from "@/types";

export const COMPANY = {
  name: "Travel Mark Ltd",
  legalName: "Travel Mark Ltd",
  domain: "travelmark.co.uk",
  url: "https://travelmark.co.uk",
  phone: "+44 121 771 2371",
  phoneHref: "tel:+441217712371",
  whatsapp: "441217712371",
  whatsappHref: "https://wa.me/441217712371",
  email: "info@travelmark.co.uk",
  address: {
    line1: "411-421 Coventry Rd",
    city: "Birmingham",
    postcode: "B10 0TH",
    country: "United Kingdom",
    full: "411-421 Coventry Rd, Birmingham B10 0TH, United Kingdom",
  },
  hours: [
    { day: "Monday – Friday", time: "09:00 – 19:00" },
    { day: "Saturday", time: "10:00 – 17:00" },
    { day: "Sunday", time: "Closed (WhatsApp support only)" },
  ],
  social: {
    facebook: "https://facebook.com/travelmarkuk",
    instagram: "https://instagram.com/travelmarkuk",
    twitter: "https://twitter.com/travelmarkuk",
    linkedin: "https://linkedin.com/company/travelmarkuk",
    youtube: "https://youtube.com/@travelmarkuk",
    tiktok: "https://tiktok.com/@travelmarkuk",
  },
  trust: {
    atolNumber: "ATOL 12345",
    googleRating: 4.9,
    googleReviewCount: 2140,
  },
} as const;

export const NAV: NavGroup[] = [
  {
    label: "Flights",
    href: "/flights",
  },
  {
    label: "Holidays",
    columns: [
      {
        heading: "Holiday Types",
        links: [
          { label: "Holiday Packages", href: "/holiday-packages" },
          { label: "City Breaks", href: "/city-breaks" },
          { label: "Beach Holidays", href: "/beach-holidays" },
          { label: "Luxury Holidays", href: "/luxury-holidays" },
          { label: "Family Holidays", href: "/family-holidays" },
        ],
      },
      {
        heading: "Popular",
        links: [
          { label: "Umrah & Hajj Packages", href: "/umrah-hajj" },
          { label: "Special Offers", href: "/special-offers" },
          { label: "Dubai Holidays", href: "/holiday-packages?destination=dubai" },
          { label: "Maldives Holidays", href: "/holiday-packages?destination=maldives" },
        ],
      },
    ],
  },
  {
    label: "Services",
    columns: [
      {
        heading: "For You",
        links: [
          { label: "Business Travel", href: "/business-travel" },
          { label: "Visa Services", href: "/visa-services" },
          { label: "Travel Insurance", href: "/travel-insurance" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "Why Choose Us", href: "/why-choose-us" },
          { label: "About Us", href: "/about" },
          { label: "Blog", href: "/blog" },
        ],
      },
    ],
  },
  { label: "Special Offers", href: "/special-offers" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_ROUTES = [
  { label: "Flights", href: "/flights" },
  { label: "Holiday Packages", href: "/holiday-packages" },
  { label: "Umrah & Hajj", href: "/umrah-hajj" },
  { label: "City Breaks", href: "/city-breaks" },
  { label: "Beach Holidays", href: "/beach-holidays" },
  { label: "Luxury Holidays", href: "/luxury-holidays" },
  { label: "Family Holidays", href: "/family-holidays" },
];

export const FOOTER_SERVICES = [
  { label: "Business Travel", href: "/business-travel" },
  { label: "Visa Services", href: "/visa-services" },
  { label: "Travel Insurance", href: "/travel-insurance" },
  { label: "Special Offers", href: "/special-offers" },
  { label: "Why Choose Us", href: "/why-choose-us" },
];

export const FOOTER_COMPANY = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Sitemap", href: "/sitemap" },
];

export const FOOTER_LEGAL = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export const POPULAR_ROUTES = [
  { label: "London → Dubai", href: "/flights?from=LON&to=DXB" },
  { label: "London → Nairobi", href: "/flights?from=LON&to=NBO" },
  { label: "London → Mogadishu", href: "/flights?from=LON&to=MGQ" },
  { label: "London → Istanbul", href: "/flights?from=LON&to=IST" },
  { label: "Birmingham → Addis Ababa", href: "/flights?from=BHX&to=ADD" },
  { label: "London → Bangkok", href: "/flights?from=LON&to=BKK" },
];

export const AIRPORTS = [
  { code: "LON", city: "London (All Airports)" },
  { code: "LHR", city: "London Heathrow" },
  { code: "LGW", city: "London Gatwick" },
  { code: "BHX", city: "Birmingham" },
  { code: "MAN", city: "Manchester" },
  { code: "DXB", city: "Dubai" },
  { code: "NBO", city: "Nairobi" },
  { code: "MGQ", city: "Mogadishu" },
  { code: "HGA", city: "Hargeisa" },
  { code: "ADD", city: "Addis Ababa" },
  { code: "JIJ", city: "Jigjiga" },
  { code: "JIB", city: "Djibouti" },
  { code: "IST", city: "Istanbul" },
  { code: "CDG", city: "Paris" },
  { code: "FCO", city: "Rome" },
  { code: "BKK", city: "Bangkok" },
  { code: "JFK", city: "New York" },
  { code: "YYZ", city: "Toronto" },
];

export const TRUST_BADGES = [
  { title: "ATOL Protected", description: "Your money and holiday are fully protected." },
  { title: "24/7 Support", description: "Real consultants, day or night." },
  { title: "Best Price Guarantee", description: "We won't be beaten on price." },
  { title: "Secure Payment", description: "Bank-grade encrypted checkout." },
] as const;
