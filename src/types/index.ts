export interface Initiative {
  slug: string;
  type: 'project' | 'event' | 'news' | 'awards';
  title: string;
  date: string;
  image: string[] | string | null;
  content: string | null;
  investment: string | null;
  project: string;
  link: string | null;
  related_sdgs: number[];
  related_sdg_targets: string[];
  vtools_id?: string | null;
  vtools_event_title?: string | null;
  vtools_event_location?: string | null;
  vtools_event_date?: string | null;
  vtools_number_of_attendance?: number | null;
  vtools_event_category?: string | null;
  vtools_event_sub_category?: string | null;
  vtools_spoid?: string | null;
  vtools_organizational_unit?: string | null;
  vtools_hosts?: string | null;
  vtools_cosponsor_name?: string[] | null;
  vtools_tags?: string | null;
  vtools_virtual?: string | null;
  vtools_number_of_ieee_member_attendees?: number | null;
  vtools_number_of_non_member_attendees?: number | null;
  vtools_event_url?: string | null;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  short_description?: string;
  sdgs: number[];
  started: string;
  cover_image: string;
  logo: string;
  related_initiatives: string[];
}

export interface OrganizingUnit {
  id: string;
  name: string;
  type: string;
}

export interface Need {
  slug: string;
  title?: string;
  problem?: string;
  suggested_solution?: string;
  estimated_cost_usd?: number;
  location?: {
    district: string;
    place?: string;
  };
  sdgs?: number[];
  contacts?: Array<{
    name: string;
    email: string;
  }>;
}

export interface Volunteer {
  name: string;
  role: string;
  affiliation: string;
  linkedin: string;
  image?: string;
}

export interface VolunteerData {
  year: number;
  executive: Volunteer[];
  committee: Volunteer[];
  project_volunteers?: Volunteer[];
}

export interface SiteStats {
  initiatives: number;
  lives_impacted: number;
  funds_mobilized_usd: number;
  districts: number;
}

export interface Award {
  title: string;
  organization: string;
  description: string;
  link: string;
  icon: string;
  image?: string;
  color: string;
  bgColor: string;
}

export interface Cause {
  id: number;
  title: string;
  description: string;
  iconName: string;
  color: string;
  hoverColor: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface Resource {
  name: string;
  href: string;
}

export interface SDGMetadata {
  code: string;
  title: string;
  short_name: string;
  description?: string;
  targets: Array<{
    code: string;
    description: string;
    indicators: Array<{
      code: string;
      description: string;
    }>;
  }>;
}

export interface Partner {
  slug: string;
  name: string;
  type: 'partnership' | 'ieee' | 'supporter';
  logo: string | null;
  url: string | null;
  description: string;
  since: string | null;
  status: 'active' | 'past';
  tags: string[];
}