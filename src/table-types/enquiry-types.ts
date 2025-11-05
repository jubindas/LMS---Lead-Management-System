export type Enquiry = {
  id: string;
  company_name: string;
  primary_phone_number: string;
  whatsappPrimary: boolean;
  altNumber: string;
  whatsappAlt: boolean;
  email?: string;
  business_type?: string;
  status?: string;
  stage: string;
  mainCategory?: string;
  subCategory?: string;
  location?: string;
  source?: string;
  budget?: string;
  remarks?: string;
  pdf: null;
};
