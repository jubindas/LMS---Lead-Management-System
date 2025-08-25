import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";

export default function EnquiryBussines() {
  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button className="bg-zinc-500 hover:bg-zinc-600 text-white font-medium px-3 py-1.5 text-sm rounded-md shadow-md transition-transform transform hover:-translate-y-0.5 hover:shadow-lg">
          <FaPlus />
        </Button>
      </DialogTrigger>

      {/* Responsive Dialog Content */}
      <DialogContent
        className="
          w-[90%] max-w-md md:max-w-xl lg:max-w-3xl 
          max-h-[80vh] overflow-y-auto 
          bg-zinc-100 rounded-lg shadow-2xl border border-zinc-300 
          p-4 md:p-6
        "
      >
        {/* Header */}
        <DialogHeader className="pb-4 border-b border-zinc-300">
          <DialogTitle className="text-lg md:text-2xl font-bold text-zinc-800">
            ADD NEW ENTRY
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base text-zinc-600">
            Fill in the details for the new enquiry.
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <form className="mt-6 space-y-6">
          {/* Business Name */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Business Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="
                w-full border border-zinc-300 rounded-md px-3 py-2 
                bg-white text-zinc-800 shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-zinc-500 
                transition
              "
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter description"
              className="
                w-full border border-zinc-300 rounded-md px-3 py-2 
                bg-white text-zinc-800 shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-zinc-500 
                transition resize-none
              "
              rows={4}
            />
          </div>

          {/* Save Button */}
          <div className="flex flex-col md:flex-row justify-end gap-3 pt-4 border-t border-zinc-300">
            <Button
              type="submit"
              className="
                w-full md:w-auto 
                bg-zinc-500 hover:bg-zinc-600 text-white font-medium px-6 py-2 
                rounded-md shadow-lg 
                transition-transform transform hover:-translate-y-1
              "
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
