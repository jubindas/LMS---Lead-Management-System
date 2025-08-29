export type Enquiry = {
  id: string;
  name: string;
  phone: string;
  whatsappPrimary: boolean;
  altNumber: string;
  whatsappAlt: boolean;
  email?: string;
  businessType?: string;
  status?: string;
  stage: string;
  mainCategory?: string;
  subCategory?: string;
  location?: string;
  source?: string;
  budget?: string;
  remarks?: string;
};
