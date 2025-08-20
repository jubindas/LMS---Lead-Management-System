import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";

import { FiEdit, FiMoreVertical } from "react-icons/fi";

interface PopoverActionProps {
  onEdit?: () => void;
  onDisable?: () => void;
}

export default function PopoverAction({
  onEdit,
  onDisable,
}: PopoverActionProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <FiMoreVertical className="h-5 w-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-40 p-2 space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={onEdit}
        >
          <FiEdit className="mr-2" /> Edit
        </Button>
        <Button
          variant="destructive"
          className="w-full justify-start"
          onClick={onDisable}
        >
          Disable
        </Button>
      </PopoverContent>
    </Popover>
  );
}
