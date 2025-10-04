"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface DatePickerProps {
  selected?: Date | null;
  onSelect: (date: Date | undefined) => void;
}

export function DatePicker({ selected, onSelect }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] justify-start text-left font-normal rounded-xl"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected
            ? format(selected, "dd MMM yyyy", { locale: fr })
            : "Choisir une date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-auto" align="start">
        <DayPicker
          mode="single"
          selected={selected ?? undefined}
          onSelect={onSelect}
          locale={fr}
        />
      </PopoverContent>
    </Popover>
  );
}
