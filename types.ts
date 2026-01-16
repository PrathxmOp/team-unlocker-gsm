export enum ServiceStatus {
  ONLINE = 'ON',
  OFFLINE = 'OFF'
}

export interface GSMService {
  id: string;
  name: string;
  status: ServiceStatus;
  description: string;
  supportedBrands: string[];
  icon: string;
  hidden?: boolean;
}

export type FileType = 'ROM' | 'Tool' | 'Utility' | 'Driver';

export interface GSMFile {
  id: string;
  name: string;
  brand: string;
  model: string;
  type: FileType;
  version: string;
  size: string;
  downloadUrl: string;
  updatedAt: string;
}

export interface PaymentMethod {
  name: string;
  icon: string;
}

export interface PaymentSection {
  title: string;
  methods: PaymentMethod[];
}

export interface PaymentsData {
  global: PaymentSection;
  india: PaymentSection;
}

export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  siteTaglineHighlight: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  telegramUsername: string;
  telegramChannel: string;
  securityWarningTitle: string;
  securityWarningText: string;
  disclaimerTitle: string;
  disclaimerText: string;
  footerDescription: string;
  systemsOnlineText: string;
  servicesSectionTitle: string;
  servicesSectionSubtitle: string;
  filesSectionTitle: string;
  filesSectionSubtitle: string;
  paymentSectionTitle: string;
  paymentSectionSubtitle: string;
}

export interface NavLink {
  label: string;
  path: string;
}

export interface Feature {
  icon: string;
  title: string;
  desc: string;
}

export interface LegalContent {
  title: string;
  content: string;
}

export interface LegalData {
  privacyPolicy: LegalContent;
  termsAndConditions: LegalContent;
  refundPolicy: LegalContent;
}

export interface Database {
  settings: SiteSettings;
  navigation: NavLink[];
  features: Feature[];
  brands: string[];
  services: GSMService[];
  files: GSMFile[];
}