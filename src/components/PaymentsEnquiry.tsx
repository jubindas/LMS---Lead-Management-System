import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { createPayments, updatePayment } from "@/services/apiPayments";

type PaymentsEnquiryProps = {
  paymentToEdit?: {
    id: string;
    name: string;
    amount: number;
    remarks: string;
  };
  isEdit?: boolean;
  onEditComplete?: () => void;
};

export default function PaymentsEnquiry({
  paymentToEdit,
  isEdit = false,
  onEditComplete,
}: PaymentsEnquiryProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(isEdit);

  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    remarks: "",
  });

  useEffect(() => {
    if (paymentToEdit) {
      setFormData({
        name: paymentToEdit.name,
        amount: String(paymentToEdit.amount),
        remarks: paymentToEdit.remarks,
      });
    }
  }, [paymentToEdit]);

  useEffect(() => {
    setOpen(isEdit);
  }, [isEdit]);

  const createPaymentMutation = useMutation({
    mutationFn: (newPayment: {
      name: string;
      amount: number;
      remarks: string;
    }) => createPayments(newPayment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      toast.success("Payment enquiry added successfully");
      setFormData({ name: "", amount: "", remarks: "" });
      setOpen(false);
    },
  });

  const updatePaymentMutation = useMutation({
    mutationFn: (updatedPayment: {
      id: string;
      name: string;
      amount: number;
      remarks: string;
    }) =>
      updatePayment(updatedPayment.id, {
        name: updatedPayment.name,
        amount: updatedPayment.amount,
        remarks: updatedPayment.remarks,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      toast.success("Payment updated successfully");
      setOpen(false);
      onEditComplete?.();
    },
    onError: () => {
      toast.error("Failed to update payment");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: formData.name.trim(),
      amount: Number(formData.amount),
      remarks: formData.remarks.trim(),
    };

    if (paymentToEdit) {
      updatePaymentMutation.mutate({ id: paymentToEdit.id, ...payload });
    } else {
      createPaymentMutation.mutate(payload);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen && onEditComplete) {
      onEditComplete();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {!isEdit && (
        <DialogTrigger asChild>
          <Button className="bg-zinc-500 hover:bg-zinc-600 text-white font-medium px-4 py-2 rounded-md shadow-md transition-transform transform hover:-translate-y-0.5 hover:shadow-lg">
            Add Payment Enquiry
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="w-[95%] max-w-md md:max-w-lg lg:max-w-xl max-h-[85vh] overflow-y-auto bg-zinc-100 rounded-lg shadow-2xl border border-zinc-300 p-4 md:p-6">
        <DialogHeader className="pb-4 border-b border-zinc-300">
          <DialogTitle className="text-lg md:text-2xl font-bold text-zinc-800">
            {paymentToEdit ? "EDIT PAYMENT ENQUIRY" : "ADD PAYMENT ENQUIRY"}
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base text-zinc-600">
            Fill in the details for the payment enquiry.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-zinc-300 rounded-md px-3 py-2 bg-white text-zinc-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full border border-zinc-300 rounded-md px-3 py-2 bg-white text-zinc-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Mobile Number
            </label>
            <input
              name="mobile"
              placeholder="Enter Mobile"
              onChange={handleChange}
              className="w-full border border-zinc-300 rounded-md px-3 py-2 bg-white text-zinc-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 transition resize-none"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
              Date of birth
            </Label>
            <Popover open={openDate} onOpenChange={setOpenDate}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-48 justify-between font-normal"
                >
                  {date ? date.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDate(date);
                    setOpenDate(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Remarks
            </label>
            <textarea
              name="remarks"
              placeholder="Enter remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows={3}
              className="w-full border border-zinc-300 rounded-md px-3 py-2 bg-white text-zinc-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 transition resize-none"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-zinc-300">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="w-full md:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full md:w-auto bg-zinc-500 hover:bg-zinc-600 text-white font-medium px-6 py-2 rounded-md shadow-md transition-transform transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              {paymentToEdit
                ? updatePaymentMutation.isPending
                  ? "Updating..."
                  : "Update"
                : createPaymentMutation.isPending
                ? "Saving..."
                : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
