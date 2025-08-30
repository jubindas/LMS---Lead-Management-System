import { useState } from "react";
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
import EnquiryStatus from "@/components/EnquiryStatus";
import SubRequirementForm from "@/components/SubRequirementForm.tsx";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBusiness } from "@/services/apiBusiness";
import { getStatus } from "@/services/apiStatus";
import { getLocation } from "@/services/apiLocation";
import { getSource } from "@/services/apiSource";
import { getMainCategories } from "@/services/apiMainCategories";
import { createEnquiry } from "@/services/apiEnquiries";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";



export default function EnquiryForm() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
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
  });

  const createEnquiryMutation = useMutation({
    mutationFn: createEnquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      toast("Enquiry created successfully!");
      setFormData({
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
      });
    },
    onError: (error) => {
      console.error("Error creating enquiry:", error);
      toast("Failed to create enquiry. Please try again.");
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.companyName.trim() || !formData.phone.trim()) {
      alert("Company Name and Phone are required fields.");
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

    createEnquiryMutation.mutate(enquiryData);
  };

  const { data: businessTypes, isLoading: isBusinessLoading } = useQuery({
    queryKey: ["businessTypes"],
    queryFn: getBusiness,
  });

  const { data: statusTypes, isLoading: isStatusLoading } = useQuery({
    queryKey: ["statusTypes"],
    queryFn: getStatus,
  });

  const { data: locationTypes, isLoading: isLocationLoading } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocation,
  });

  const { data: sourcesType, isLoading: isSourcesLoading } = useQuery({
    queryKey: ["sources"],
    queryFn: getSource,
  });

  const { data: mainCategories, isLoading: isMainCategoriesLoading } = useQuery(
    {
      queryKey: ["mainCategories"],
      queryFn: getMainCategories,
    }
  );

  const allSubCategories =
    mainCategories &&
    mainCategories.flatMap(
      (mainCat: { sub_categories: unknown[] }) => mainCat.sub_categories
    );

  return (
    <div className="p-6 max-w-6xl mt-7 mx-auto bg-zinc-50 rounded-2xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-zinc-900 mb-6"> Add New Entry</h2>

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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center justify-between border border-zinc-300 rounded-lg px-3 bg-zinc-100 flex-1 h-12 cursor-pointer">
                    <div className="flex items-center flex-1">
                      <MdBusiness className="text-zinc-500 mr-2" />
                      <span className="truncate text-zinc-800">
                        {isBusinessLoading
                          ? "Loading..."
                          : formData.businessType || "Select Business Type"}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-zinc-500 ml-2" />
                  </div>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                  <div className="max-h-48 overflow-y-auto">
                    {businessTypes?.map(
                      (type: { id: number; name: string }) => (
                        <div
                          key={type.id}
                          className={`flex items-center w-120 px-3 py-2 bg-zinc-100 cursor-pointer hover:bg-zinc-200 ${
                            formData.businessType === type.name
                              ? "bg-zinc-300"
                              : ""
                          }`}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              businessType: type.name,
                            }))
                          }
                        >
                          <span className="flex-1">{type.name}</span>
                          {formData.businessType === type.name && (
                            <Check className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      )
                    )}

                    {!isBusinessLoading && businessTypes?.length === 0 && (
                      <div className="px-3 py-2 text-sm text-zinc-500">
                        No business types available
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              <EnquiryBussines />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Location
            </label>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center justify-between border border-zinc-300 rounded-lg px-3 bg-zinc-100 flex-1 h-12 cursor-pointer">
                    <div className="flex items-center flex-1">
                      <MdLocationOn className="text-zinc-500 mr-2" />
                      <span className="truncate text-zinc-800">
                        {isLocationLoading
                          ? "Loading..."
                          : formData.location || "Select Location"}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-zinc-500 ml-2" />
                  </div>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                  <div className="max-h-48 overflow-y-auto">
                    {locationTypes?.map(
                      (type: { id: number; name: string }) => (
                        <div
                          key={type.id}
                          className={`flex items-center w-120 px-3 py-2 bg-zinc-100 cursor-pointer hover:bg-zinc-200 ${
                            formData.location === type.name ? "bg-zinc-300" : ""
                          }`}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              location: type.name,
                            }))
                          }
                        >
                          <span className="flex-1">{type.name}</span>
                          {formData.location === type.name && (
                            <Check className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      )
                    )}

                    {!isLocationLoading && locationTypes?.length === 0 && (
                      <div className="px-3 py-2 text-sm text-zinc-500">
                        No locations available
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              <EnquiryLocation />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Status
            </label>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center justify-between border border-zinc-300 rounded-lg px-3 bg-zinc-100 flex-1 h-12 cursor-pointer">
                    <div className="flex items-center flex-1">
                      <AiOutlineCheckCircle className="text-zinc-500 mr-2" />
                      <span className="truncate text-zinc-800">
                        {isStatusLoading
                          ? "Loading..."
                          : formData.status || "Select Status"}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-zinc-500 ml-2" />
                  </div>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                  <div className="max-h-48 overflow-y-auto">
                    {statusTypes?.map((type: { id: number; name: string }) => (
                      <div
                        key={type.id}
                        className={`flex items-center w-120 px-3 py-2 bg-zinc-100 cursor-pointer hover:bg-zinc-200 ${
                          formData.status === type.name ? "bg-zinc-300" : ""
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            status: type.name,
                          }))
                        }
                      >
                        <span className="flex-1">{type.name}</span>
                        {formData.status === type.name && (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    ))}

                    {!isStatusLoading && statusTypes?.length === 0 && (
                      <div className="px-3 py-2 text-sm text-zinc-500">
                        No statuses available
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              <EnquiryStatus />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Source
            </label>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center justify-between border border-zinc-300 rounded-lg px-3 bg-zinc-100 flex-1 h-12 cursor-pointer">
                    <div className="flex items-center flex-1">
                      <RiUserVoiceFill className="text-zinc-500 mr-2" />
                      <span className="truncate text-zinc-800">
                        {isSourcesLoading
                          ? "Loading..."
                          : formData.source || "Select Source"}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-zinc-500 ml-2" />
                  </div>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                  <div className="max-h-48 overflow-y-auto">
                    {sourcesType?.map((type: { id: number; name: string }) => (
                      <div
                        key={type.id}
                        className={`flex items-center w-120 px-3 py-2 bg-zinc-100 cursor-pointer hover:bg-zinc-200 ${
                          formData.source === type.name ? "bg-zinc-300" : ""
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            source: type.name,
                          }))
                        }
                      >
                        <span className="flex-1">{type.name}</span>
                        {formData.source === type.name && (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    ))}

                    {!isSourcesLoading && sourcesType?.length === 0 && (
                      <div className="px-3 py-2 text-sm text-zinc-500">
                        No sources available
                      </div>
                    )}
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
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center justify-between border border-zinc-300 rounded-lg px-3 bg-zinc-100 flex-1 h-12 cursor-pointer">
                    <div className="flex items-center flex-1">
                      <BsFillFileEarmarkTextFill className="text-zinc-500 mr-2" />
                      <span className="truncate text-zinc-800">
                        {isMainCategoriesLoading
                          ? "Loading..."
                          : formData.mainCategory || "Select Main Category"}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-zinc-500 ml-2" />
                  </div>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                  <div className="max-h-48 overflow-y-auto">
                    {mainCategories?.map(
                      (type: { id: number; name: string }) => (
                        <div
                          key={type.id}
                          className={`flex items-center w-120 px-3 py-2 bg-zinc-100 cursor-pointer hover:bg-zinc-200 ${
                            formData.mainCategory === type.name
                              ? "bg-zinc-300"
                              : ""
                          }`}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              mainCategory: type.name,
                            }))
                          }
                        >
                          <span className="flex-1">{type.name}</span>
                          {formData.mainCategory === type.name && (
                            <Check className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      )
                    )}

                    {!isMainCategoriesLoading &&
                      mainCategories?.length === 0 && (
                        <div className="px-3 py-2 text-sm text-zinc-500">
                          No categories available
                        </div>
                      )}
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
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center justify-between border border-zinc-300 rounded-lg px-3 bg-zinc-100 flex-1 h-12 cursor-pointer">
                    <div className="flex items-center flex-1">
                      <BsFillFileEarmarkTextFill className="text-zinc-500 mr-2" />
                      <span className="truncate text-zinc-800">
                        {isMainCategoriesLoading
                          ? "Loading..."
                          : formData.subCategory || "Select Sub Category"}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-zinc-500 ml-2" />
                  </div>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                  <div className="max-h-48 overflow-y-auto">
                    {allSubCategories && allSubCategories.length > 0 ? (
                      allSubCategories.map(
                        (sub: { id: number; name: string }) => (
                          <div
                            key={sub.id}
                            className={`flex items-center w-120 px-3 py-2 bg-zinc-100 cursor-pointer hover:bg-zinc-200 ${
                              formData.subCategory === sub.name
                                ? "bg-zinc-300"
                                : ""
                            }`}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                subCategory: sub.name,
                              }))
                            }
                          >
                            <span className="flex-1">{sub.name}</span>
                            {formData.subCategory === sub.name && (
                              <Check className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                        )
                      )
                    ) : (
                      <div className="px-3 py-2 text-sm text-zinc-500">
                        {isMainCategoriesLoading
                          ? "Loading..."
                          : "No sub categories available"}
                      </div>
                    )}
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
            type="submit"
            disabled={createEnquiryMutation.isPending}
            className="bg-zinc-500 hover:bg-zinc-600 text-white px-6 py-2 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createEnquiryMutation.isPending ? "Saving..." : "Save & Exit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
