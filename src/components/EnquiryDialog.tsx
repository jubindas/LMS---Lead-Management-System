import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useState } from "react";

import { FaBuilding, FaPhone, FaEnvelope, FaMoneyBill } from "react-icons/fa";

import { MdLocationOn, MdBusiness } from "react-icons/md";

import { BsFillFileEarmarkTextFill } from "react-icons/bs";

import { RiUserVoiceFill } from "react-icons/ri";

export default function AddEnquiryDialog() {
  const [formData, setFormData] = useState({
    companyName: "",
    phone: "",
    whatsappPrimary: false,
    altNumber: "",
    whatsappAlt: false, 
    businessType: "",
    source: "",
    requirement: "",
    location: "",
    email: "",
    budget: "",
    remarks: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2 rounded-lg shadow-md transition duration-200">
          Add Enquiry
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[60rem] max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl border border-zinc-700 p-6 bg-zinc-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white tracking-wide">
            ADD NEW ENTRY
          </DialogTitle>
          <DialogDescription className="text-zinc-400 mt-1">
            Fill in the details for the new enquiry.
          </DialogDescription>
        </DialogHeader>

        <form className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">    


            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Company Name
              </label>
              <div className="flex items-center border border-zinc-700 rounded-lg px-3 focus-within:ring-2 focus-within:ring-purple-500 bg-zinc-800">
                <FaBuilding className="text-zinc-400 mr-2" />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Enter Company name"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full py-2 text-white placeholder-zinc-500 bg-transparent focus:outline-none"
                />
              </div>
            </div>


            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Phone No.
              </label>
              <div className="flex gap-3">
                <div className="flex items-center border border-zinc-700 rounded-lg px-3 flex-1 focus-within:ring-2 focus-within:ring-purple-500 bg-zinc-800">
                  <FaPhone className="text-zinc-400 mr-2" />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter Phone no"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full py-2 text-white placeholder-zinc-500 bg-transparent focus:outline-none"
                  />
                </div>
                <div className="flex items-center px-3 bg-zinc-700 border border-zinc-700 rounded-lg">
                  <input
                    type="checkbox"
                    name="whatsappPrimary"
                    checked={formData.whatsappPrimary}
                    onChange={handleChange}
                    className="rounded border-zinc-500 text-purple-500 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-zinc-300">WhatsApp</span>
                </div>
              </div>
            </div>


            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Alternative Number
              </label>
              <div className="flex gap-3">
                <div className="flex items-center border border-zinc-700 rounded-lg px-3 flex-1 focus-within:ring-2 focus-within:ring-purple-500 bg-zinc-800">
                  <FaPhone className="text-zinc-400 mr-2" />
                  <input
                    type="text"
                    name="altNumber"
                    placeholder="Enter Alternative no"
                    value={formData.altNumber}
                    onChange={handleChange}
                    className="w-full py-2 text-white placeholder-zinc-500 bg-transparent focus:outline-none"
                  />
                </div>
                <div className="flex items-center px-3 bg-zinc-700 border border-zinc-700 rounded-lg">
                  <input
                    type="checkbox"
                    name="whatsappAlt"
                    checked={formData.whatsappAlt}
                    onChange={handleChange}
                    className="rounded border-zinc-500 text-purple-500 focus:ring-purple-500"
                  />

                  <span className="ml-2 text-sm text-zinc-300">WhatsApp</span>
                </div>
              </div>
            </div>

            
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Email
              </label>
              <div className="flex items-center border border-zinc-700 rounded-lg px-3 focus-within:ring-2 focus-within:ring-purple-500 bg-zinc-800">
                <FaEnvelope className="text-zinc-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-2 text-white placeholder-zinc-500 bg-transparent focus:outline-none"
                />
              </div>
            </div>

           
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Business Type
              </label>
              <div className="flex items-center border border-zinc-700 rounded-lg px-3 bg-zinc-800">
                <MdBusiness className="text-zinc-400 mr-2" />
                <input
                  type="text"
                  name="businessType"
                  list="businessTypeOptions"
                  placeholder="Enter or choose Business Type"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full py-2 text-white placeholder-zinc-500 bg-transparent focus:outline-none"
                />
                <datalist id="businessTypeOptions">
                  <option value="Manufacturer" />
                  <option value="Service" />
                  <option value="Other" />
                </datalist>
              </div>
            </div>

          
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Requirement
              </label>
              <div className="flex items-center border border-zinc-700 rounded-lg px-3 bg-zinc-800">
                <BsFillFileEarmarkTextFill className="text-zinc-400 mr-2" />
                <input
                  type="text"
                  name="requirement"
                  list="requirementOptions"
                  placeholder="Enter or choose Requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                  className="w-full py-2 text-white placeholder-zinc-500 bg-transparent focus:outline-none"
                />
                <datalist id="requirementOptions">
                  <option value="Product" />
                  <option value="Consulting" />
                </datalist>
              </div>
            </div>

            
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Source
              </label>
              <div className="flex items-center border border-zinc-700 rounded-lg px-3 bg-zinc-800">
                <RiUserVoiceFill className="text-zinc-400 mr-2" />
                <input
                  type="text"
                  name="source"
                  list="sourceOptions"
                  placeholder="Enter or choose Source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full py-2 text-white placeholder-zinc-500 bg-transparent focus:outline-none"
                />
                <datalist id="sourceOptions">
                  <option value="Cold Calling" />
                  <option value="Social Media" />
                </datalist>
              </div>
            </div>

          
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Location
              </label>
              <div className="flex items-center border border-zinc-700 rounded-lg px-3 bg-zinc-800">
                <MdLocationOn className="text-zinc-400 mr-2" />
                <input
                  type="text"
                  name="location"
                  placeholder="Enter Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full py-2 text-white placeholder-zinc-500 bg-transparent focus:outline-none"
                />
              </div>
            </div>

           
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Budget
              </label>
              <div className="flex items-center border border-zinc-700 rounded-lg px-3 bg-zinc-800">
                <FaMoneyBill className="text-zinc-400 mr-2" />
                <input
                  type="text"
                  name="budget"
                  placeholder="Enter Budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full py-2 text-white placeholder-zinc-500 bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </div>

         
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Remarks
            </label>
            <textarea
              name="remarks"
              placeholder="Enter remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows={3}
              className="w-full border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-zinc-800"
            ></textarea>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-zinc-700">
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-200"
            >
              Save & Exit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
