import type { ReactNode } from "react";

import { useState } from "react";

import {
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBuilding,
  FaInfoCircle,
  FaEdit,
} from "react-icons/fa";

type Enquiry = {
  companyName: string;
  phoneNumber: string;
  altPhoneNumber?: string;
  whatsapp?: boolean;
  altWhatsapp?: boolean;
  email: string;
  businessType: string;
  source: string;
  location: string;
  budget: string;
  remarks?: string;
  status: string;
  mainCategory: string;
  subCategory: string;
};

const sampleEnquiry: Enquiry = {
  companyName: "Acme Corp",
  phoneNumber: "9876543210",
  altPhoneNumber: "9123456780",
  whatsapp: true,
  altWhatsapp: false,
  email: "contact@acme.com",
  businessType: "IT Services",
  source: "Referral",
  location: "New Delhi",
  budget: "5000-10000",
  remarks: "High priority client",
  status: "Pending",
  mainCategory: "Software",
  subCategory: "Web & Mobile",
};

interface InfoCardProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  badge?: ReactNode;
}

const InfoCard = ({ icon, label, value, badge }: InfoCardProps) => (
  <div className="flex flex-col md:flex-row md:items-center gap-2 p-4 bg-zinc-100 border border-zinc-300 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div className="text-zinc-600 text-xl">{icon}</div>
    <div className="flex-1">
      <p className="text-zinc-700 font-medium">{label}</p>
      <div className="flex items-center gap-2 text-zinc-900">{value}</div>
    </div>
    {badge && <div>{badge}</div>}
  </div>
);

export default function EnquiryViewDetails() {
  const [enquiry] = useState<Enquiry>(sampleEnquiry);

  return (
    <div className="p-6 bg-zinc-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-zinc-200 rounded-2xl shadow-md p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-semibold text-zinc-900">Lead Details</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg shadow transition">
            <FaEdit />
            Edit
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-800 border-b border-zinc-300 pb-2">
            Contact Info
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard
              icon={<FaPhone />}
              label="Phone Number"
              value={
                <>
                  {enquiry.phoneNumber}
                  {enquiry.whatsapp && (
                    <FaWhatsapp className="text-green-500" />
                  )}
                </>
              }
            />
            <InfoCard
              icon={<FaPhone />}
              label="Alternate Phone"
              value={
                <>
                  {enquiry.altPhoneNumber || "-"}
                  {enquiry.altWhatsapp && (
                    <FaWhatsapp className="text-green-500" />
                  )}
                </>
              }
            />
            <InfoCard
              icon={<FaEnvelope />}
              label="Email"
              value={enquiry.email}
            />
            <InfoCard
              icon={<FaMapMarkerAlt />}
              label="Location"
              value={enquiry.location}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-800 border-b border-zinc-300 pb-2">
            Lead Info
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard
              icon={<FaInfoCircle />}
              label="Source"
              value={enquiry.source}
            />
            <InfoCard
              icon={<FaMoneyBillWave />}
              label="Budget"
              value={enquiry.budget}
            />
            <InfoCard
              icon={<FaInfoCircle />}
              label="Remarks"
              value={enquiry.remarks || "-"}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-800 border-b border-zinc-300 pb-2">
            Category & Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard
              icon={<FaBuilding />}
              label="Business Type"
              value={enquiry.businessType}
            />
            <InfoCard
              icon={<FaInfoCircle />}
              label="Status"
              value={enquiry.status}
              badge={
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    enquiry.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : enquiry.status === "Completed"
                      ? "bg-green-200 text-green-800"
                      : "bg-zinc-200 text-zinc-900"
                  }`}
                >
                  {enquiry.status}
                </span>
              }
            />
            <InfoCard
              icon={<FaInfoCircle />}
              label="Main Category"
              value={`${enquiry.mainCategory}`}
              badge={
                <span className="px-3 py-1 rounded-full bg-zinc-300 text-zinc-900 text-sm font-medium">
                  {enquiry.subCategory}
                </span>
              }
            />
            <InfoCard
              icon={<FaInfoCircle />}
              label="Sub Category"
              value={`${enquiry.subCategory}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
