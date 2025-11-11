/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

import { FaBuilding, FaPhone, FaEnvelope, FaMoneyBill } from "react-icons/fa";

import { MdLocationOn, MdBusiness } from "react-icons/md";

import { BsFillFileEarmarkTextFill } from "react-icons/bs";

import { AiOutlineCheckCircle } from "react-icons/ai";

import { RiUserVoiceFill } from "react-icons/ri";

import EnquiryBussines from "@/components/EnquiryBussines";

import EnquiryLocation from "@/components/EnquiryLocation";

import MainRequirementsForm from "@/components/MainRequirementsForm";

import EnquirySource from "@/components/EnquirySource";

import SubRequirementForm from "@/components/SubRequirementForm.tsx";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getBusiness } from "@/services/apiBusiness";

import { getStatus } from "@/services/apiStatus";

import { getLocation } from "@/services/apiLocation";

import { getSource } from "@/services/apiSource";

import { getMainCategories } from "@/services/apiMainCategories";

import {
  createEnquiry,
  updateEnquiry,
  getEnquiryById,
} from "@/services/apiEnquiries";

import { useNavigate, useParams } from "react-router-dom";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Check, ChevronDown } from "lucide-react";

import { toast } from "sonner";

import StatusForm from "@/components/EnquiryStatus";

const initialFormData = {
  companyName: "",
  phone: "",
  whatsappPrimary: false,
  altNumber: "",
  whatsappAlt: false,
  email: "",
  businessType: "",
  status: "",
  mainCategory: "",
  subCategory: "",
  location: "",
  source: "",
  budget: "",
  remarks: "",
  pdf: undefined,
};

export default function EnquiryForm() {
  const navigate = useNavigate();

  const { id } = useParams();

  const isEditMode = !!id;

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(initialFormData);

  const [openBusiness, setOpenBusiness] = useState(false);

  const [openLocation, setOpenLocation] = useState(false);

  const [openStatus, setOpenStatus] = useState(false);

  const [openSource, setOpenSource] = useState(false);

  const [openMainCategory, setOpenMainCategory] = useState(false);

  const [openSubCategory, setOpenSubCategory] = useState(false);

  const isValidPhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);

  const isValidEmail = (email: string) => {
    if (!email) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const { data: existingEnquiry, isLoading: isLoadingEnquiry } = useQuery({
    queryKey: ["enquiry", id],
    queryFn: () => getEnquiryById(id!),
    enabled: isEditMode,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (existingEnquiry && isEditMode) {
      setFormData({
        companyName: existingEnquiry.company_name || "",
        phone: existingEnquiry.primary_phone_number || "",
        whatsappPrimary:
          existingEnquiry.primary_phone_number_has_whatsapp || false,
        altNumber: existingEnquiry.alternative_phone_number || "",
        whatsappAlt:
          existingEnquiry.alternative_phone_number_has_whatsapp || false,
        email: existingEnquiry.email || "",
        businessType: existingEnquiry.business_type || "",
        status: existingEnquiry.status || "",
        mainCategory: existingEnquiry.main_category || "",
        subCategory: existingEnquiry.sub_category || "",
        location: existingEnquiry.location || "",
        source: existingEnquiry.source || "",
        budget: existingEnquiry.budget ? String(existingEnquiry.budget) : "",
        remarks: existingEnquiry.remarks || "",
        pdf: undefined,
      });
    }
  }, [existingEnquiry, isEditMode]);

  const createEnquiryMutation = useMutation({
    mutationFn: createEnquiry,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      toast.success("Enquiry created successfully!");
      setFormData({ ...initialFormData });
      navigate("/enquiry");
    },

    onError: (error) => {
      console.error("Error creating enquiry:", error);
      toast.error(`Failed to create enquiry ${error.message}. `);
    },
  });

  const updateEnquiryMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateEnquiry(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      queryClient.invalidateQueries({ queryKey: ["enquiry", id] });
      toast.success("Enquiry updated successfully!");
      navigate("/enquiry");
    },
    onError: (error) => {
      console.error("Error updating enquiry:", error);
      toast.error(`Failed to update enquiry ${error.message}. `);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const value =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : target.value;

    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDropdownChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { companyName, phone, altNumber, email } = formData;

    if (!companyName.trim()) {
      toast.error("Company Name is required.");
      return;
    }

    if (!phone.trim()) {
      toast.error("Phone number is required.");
      return;
    }

    if (!isValidPhone(phone.trim())) {
      toast.error("Enter a valid 10-digit phone number starting with 6-9.");
      return;
    }

    if (
      altNumber &&
      altNumber.trim() !== "" &&
      !isValidPhone(altNumber.trim())
    ) {
      toast.error("Enter a valid 10-digit alternative phone number.");
      return;
    }

    if (!isValidEmail(email.trim())) {
      toast.error("Enter a valid email address.");
      return;
    }

    const enquiryData = {
      company_name: formData.companyName.trim(),
      primary_phone_number: formData.phone.trim(),
      primary_phone_number_has_whatsapp: formData.whatsappPrimary,
      alternative_phone_number: formData.altNumber.trim() || null,
      alternative_phone_number_has_whatsapp: formData.whatsappAlt,
      email: formData.email.trim() || null,
      budget: formData.budget ? parseFloat(formData.budget) : null,
      remarks: formData.remarks.trim() || null,
      location: formData.location || null,
      status: formData.status || null,
      source: formData.source || null,
      main_category: formData.mainCategory || null,
      sub_category: formData.subCategory || null,
      business_type: formData.businessType || null,
    };

    if (isEditMode) {
      updateEnquiryMutation.mutate({ id: id!, data: enquiryData });
    } else {
      createEnquiryMutation.mutate(enquiryData);
    }
  };

  const { data: businessTypes, isLoading: isBusinessLoading } = useQuery({
    queryKey: ["businessTypes"],
    queryFn: getBusiness,
    staleTime: 5 * 60 * 1000,
  });

  const { data: statusTypes, isLoading: isStatusLoading } = useQuery({
    queryKey: ["statusTypes"],
    queryFn: getStatus,
    staleTime: 5 * 60 * 1000,
  });

  const { data: locationTypes, isLoading: isLocationLoading } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocation,
    staleTime: 5 * 60 * 1000,
  });

  const { data: sourcesType, isLoading: isSourcesLoading } = useQuery({
    queryKey: ["sources"],
    queryFn: getSource,
    staleTime: 5 * 60 * 1000,
  });

  const { data: mainCategories, isLoading: isMainCategoriesLoading } = useQuery(
    {
      queryKey: ["mainCategories"],
      queryFn: getMainCategories,
      staleTime: 5 * 60 * 1000,
    }
  );

  const filteredSubCategories =
    mainCategories?.find((cat: any) => cat.name === formData.mainCategory)
      ?.sub_categories || [];

  const isSubmitting =
    createEnquiryMutation.isPending || updateEnquiryMutation.isPending;

  if (isEditMode && isLoadingEnquiry) {
    return (
      <div className="p-6 max-w-6xl mt-7 mx-auto bg-zinc-50 rounded-2xl shadow-md">
        <div className="text-center py-12">
          <p className="text-zinc-600">Loading enquiry data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mt-7 mx-auto bg-zinc-50 rounded-2xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-zinc-900 mb-6">
        {isEditMode ? "Edit Entry" : "Add New Entry"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Company Name <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-zinc-300 rounded-lg px-3 bg-zinc-100 focus-within:ring-2 focus-within:ring-zinc-400">
              <FaBuilding className="text-zinc-500 mr-2" />
              <input
                type="text"
                name="companyName"
                placeholder="Enter Company name"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full py-2 text-zinc-800 placeholder-zinc-400 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Phone No. <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <div className="flex items-center border border-zinc-300 rounded-lg px-3 flex-1 bg-zinc-100 focus-within:ring-2 focus-within:ring-zinc-400">
                <FaPhone className="text-zinc-500 mr-2" />
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Phone no"
                  value={formData.phone}
                  onChange={(e) => {
                    if (/^\d*$/.test(e.target.value)) handleChange(e);
                  }}
                  maxLength={10}
                  required
                  className="w-full py-2 text-zinc-800 placeholder-zinc-400 bg-transparent focus:outline-none"
                />
              </div>
              <div className="flex items-center px-3 bg-zinc-100 border border-zinc-300 rounded-lg">
                <input
                  type="checkbox"
                  name="whatsappPrimary"
                  checked={formData.whatsappPrimary}
                  onChange={handleChange}
                  className="rounded border-zinc-400 text-zinc-600 focus:ring-zinc-400"
                />
                <span className="ml-2 text-sm text-zinc-700">WhatsApp</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Alternative Number
            </label>
            <div className="flex gap-3">
              <div className="flex items-center border border-zinc-300 rounded-lg px-3 flex-1 bg-zinc-100 focus-within:ring-2 focus-within:ring-zinc-400">
                <FaPhone className="text-zinc-500 mr-2" />
                <input
                  type="text"
                  name="altNumber"
                  placeholder="Enter Alternative no"
                  value={formData.altNumber}
                  onChange={(e) => {
                    if (/^\d*$/.test(e.target.value)) handleChange(e);
                  }}
                  maxLength={10}
                  className="w-full py-2 text-zinc-800 placeholder-zinc-400 bg-transparent focus:outline-none"
                />
              </div>
              <div className="flex items-center px-3 bg-zinc-100 border border-zinc-300 rounded-lg">
                <input
                  type="checkbox"
                  name="whatsappAlt"
                  checked={formData.whatsappAlt}
                  onChange={handleChange}
                  className="rounded border-zinc-400 text-zinc-600 focus:ring-zinc-400"
                />
                <span className="ml-2 text-sm text-zinc-700">WhatsApp</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Email
            </label>
            <div className="flex items-center border border-zinc-300 rounded-lg px-3 bg-zinc-100 focus-within:ring-2 focus-within:ring-zinc-400">
              <FaEnvelope className="text-zinc-500 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-2 text-zinc-800 placeholder-zinc-400 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Business Type
            </label>
            <div className="flex items-center gap-2">
              <Popover open={openBusiness} onOpenChange={setOpenBusiness}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center justify-between border border-zinc-300 rounded-lg px-3 bg-zinc-100 flex-1 h-12 cursor-pointer"
                  >
                    <div className="flex items-center flex-1">
                      <MdBusiness className="text-zinc-500 mr-2" />
                      <span className="truncate text-zinc-800">
                        {isBusinessLoading
                          ? "Loading..."
                          : formData.businessType || "Select Business Type"}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-zinc-500 ml-2" />
                  </button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                  <div className="max-h-48 overflow-y-auto">
                    {businessTypes?.map((type: any) => (
                      <div
                        key={type.id}
                        className={`flex items-center w-120 px-3 py-2 cursor-pointer hover:bg-zinc-200 ${
                          formData.businessType === type.name
                            ? "bg-zinc-300"
                            : ""
                        }`}
                        onClick={() => {
                          handleDropdownChange("businessType", type.name);
                          setOpenBusiness(false);
                        }}
                      >
                        <span className="flex-1">{type.name}</span>
                        {formData.businessType === type.name && (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <EnquiryBussines mode="create" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Location
            </label>
            <div className="flex items-center gap-2">
              <Popover open={openLocation} onOpenChange={setOpenLocation}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center justify-between border border-zinc-300 rounded-lg px-3 bg-zinc-100 flex-1 h-12 cursor-pointer"
                  >
                    <div className="flex items-center flex-1">
                      <MdLocationOn className="text-zinc-500 mr-2" />
                      <span className="truncate text-zinc-800">
                        {isLocationLoading
                          ? "Loading..."
                          : formData.location || "Select Location"}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-zinc-500 ml-2" />
                  </button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                  <div className="max-h-48 overflow-y-auto">
                    {locationTypes?.map((type: any) => (
                      <div
                        key={type.id}
                        className={`flex items-center w-120  px-3 py-2 cursor-pointer hover:bg-zinc-200 ${
                          formData.location === type.name ? "bg-zinc-300" : ""
                        }`}
                        onClick={() => {
                          handleDropdownChange("location", type.name);
                          setOpenLocation(false);
                        }}
                      >
                        <span className="flex-1">{type.name}</span>
                        {formData.location === type.name && (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <EnquiryLocation mode="create" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Status
            </label>
            <div className="flex items-center gap-2">
              <Popover open={openStatus} onOpenChange={setOpenStatus}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center justify-between border border-zinc-300 rounded-lg px-3 bg-zinc-100 flex-1 h-12 cursor-pointer"
                  >
                    <div className="flex items-center flex-1">
                      <AiOutlineCheckCircle className="text-zinc-500 mr-2" />
                      <span className="truncate text-zinc-800">
                        {isStatusLoading
                          ? "Loading..."
                          : formData.status || "Select Status"}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-zinc-500 ml-2" />
                  </button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                  <div className="max-h-48 overflow-y-auto">
                    {statusTypes?.map((type: any) => (
                      <div
                        key={type.id}
                        className={`flex items-center w-120  px-3 py-2 cursor-pointer hover:bg-zinc-200 ${
                          formData.status === type.name ? "bg-zinc-300" : ""
                        }`}
                        onClick={() => {
                          handleDropdownChange("status", type.name);
                          setOpenStatus(false);
                        }}
                      >
                        <span className="flex-1">{type.name}</span>
                        {formData.status === type.name && (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <StatusForm mode="create" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Source
            </label>
            <div className="flex items-center gap-2">
              <Popover open={openSource} onOpenChange={setOpenSource}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center justify-between border border-zinc-300 rounded-lg px-3 bg-zinc-100 flex-1 h-12 cursor-pointer"
                  >
                    <div className="flex items-center flex-1">
                      <RiUserVoiceFill className="text-zinc-500 mr-2" />
                      <span className="truncate text-zinc-800">
                        {isSourcesLoading
                          ? "Loading..."
                          : formData.source || "Select Source"}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-zinc-500 ml-2" />
                  </button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                  <div className="max-h-48 overflow-y-auto">
                    {sourcesType?.map((type: any) => (
                      <div
                        key={type.id}
                        className={`flex items-center w-120 px-3 py-2 cursor-pointer hover:bg-zinc-200 ${
                          formData.source === type.name ? "bg-zinc-300" : ""
                        }`}
                        onClick={() => {
                          handleDropdownChange("source", type.name);
                          setOpenSource(false);
                        }}
                      >
                        <span className="flex-1">{type.name}</span>
                        {formData.source === type.name && (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <EnquirySource />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Main Category
            </label>
            <div className="flex items-center gap-2">
              <Popover
                open={openMainCategory}
                onOpenChange={setOpenMainCategory}
              >
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center justify-between border border-zinc-300 rounded-lg px-3 bg-zinc-100 flex-1 h-12 cursor-pointer"
                  >
                    <div className="flex items-center flex-1">
                      <BsFillFileEarmarkTextFill className="text-zinc-500 mr-2" />
                      <span className="truncate text-zinc-800">
                        {isMainCategoriesLoading
                          ? "Loading..."
                          : formData.mainCategory || "Select Main Category"}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-zinc-500 ml-2" />
                  </button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                  <div className="max-h-48 overflow-y-auto">
                    {mainCategories?.map((type: any) => (
                      <div
                        key={type.id}
                        className={`flex items-center w-120 px-3 py-2 cursor-pointer hover:bg-zinc-200 ${
                          formData.mainCategory === type.name
                            ? "bg-zinc-300"
                            : ""
                        }`}
                        onClick={() => {
                          handleDropdownChange("mainCategory", type.name);
                          setOpenMainCategory(false);
                        }}
                      >
                        <span className="flex-1">{type.name}</span>
                        {formData.mainCategory === type.name && (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <MainRequirementsForm />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Sub Category
            </label>

            <div className="flex items-center gap-2">
              <Popover open={openSubCategory} onOpenChange={setOpenSubCategory}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center justify-between border border-zinc-300 
          rounded-lg px-3 bg-zinc-100 flex-1 h-12 cursor-pointer"
                  >
                    <div className="flex items-center flex-1">
                      <BsFillFileEarmarkTextFill className="text-zinc-500 mr-2" />
                      <span className="truncate text-zinc-800">
                        {formData.subCategory || "Select Sub Category"}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-zinc-500 ml-2" />
                  </button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                  <div className="max-h-48 overflow-y-auto">
                    {filteredSubCategories.map((sub: any) => (
                      <div
                        key={sub.id}
                        className={`flex items-center w-120 px-3 py-2 cursor-pointer hover:bg-zinc-200 ${
                          formData.subCategory === sub.name ? "bg-zinc-300" : ""
                        }`}
                        onClick={() => {
                          handleDropdownChange("subCategory", sub.name);
                          setOpenSubCategory(false);
                        }}
                      >
                        <span className="flex-1">{sub.name}</span>
                        {formData.subCategory === sub.name && (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <SubRequirementForm />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Budget
            </label>
            <div className="flex items-center border border-zinc-300 rounded-lg px-3 bg-zinc-100">
              <FaMoneyBill className="text-zinc-500 mr-2" />
              <input
                type="number"
                name="budget"
                placeholder="Enter Budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full py-2 text-zinc-800 placeholder-zinc-400 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Quotation
            </label>

            <div className="flex items-center border border-zinc-300 rounded-lg px-3 bg-zinc-100 h-12">
              <BsFillFileEarmarkTextFill className="text-zinc-500 mr-2" />

              <input
                type="file"
                accept="application/pdf"
                name="pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && file.type !== "application/pdf") {
                    alert("Only PDF files allowed!");
                    return;
                  }
                  setFormData({
                    ...formData,
                    pdf: undefined,
                  });
                }}
                className="w-full text-zinc-800 bg-transparent focus:outline-none"
              />
            </div>

            {formData.pdf && (
              <p className="text-sm text-green-600 mt-1">
                Selected: {formData.pdf}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1.5">
            Remarks
          </label>
          <textarea
            name="remarks"
            placeholder="Enter remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows={3}
            className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 bg-zinc-100"
          ></textarea>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            onClick={() => navigate("/enquiry")}
            variant="outline"
            className="px-6 py-2 rounded-lg"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-zinc-500 hover:bg-zinc-600 text-white px-6 py-2 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? isEditMode
                ? "Updating..."
                : "Saving..."
              : isEditMode
              ? "Update & Exit"
              : "Save & Exit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
