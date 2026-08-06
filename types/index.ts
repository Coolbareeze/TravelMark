export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: "UK" | "Africa" | "Middle East" | "Asia" | "Europe" | "Americas" | "Oceania";
  image: string;
  fromPrice: number;
  blurb: string;
  featured?: boolean;
}

export interface HolidayPackage {
  id: string;
  slug: string;
  title: string;
  destination: string;
  category:
    | "holiday-packages"
    | "umrah-hajj"
    | "city-breaks"
    | "beach-holidays"
    | "luxury-holidays"
    | "family-holidays"
    | "special-offers";
  image: string;
  price: number;
  originalPrice?: number;
  duration: string;
  airline: string;
  hotelRating: number;
  hotelName: string;
  transfersIncluded: boolean;
  boardBasis: string;
  highlights: string[];
  description: string;
  featured?: boolean;
  offerEndsAt?: string;
}

export interface Airline {
  id: string;
  name: string;
  logo: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  trip: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  columns?: {
    heading: string;
    links: NavLink[];
  }[];
}
