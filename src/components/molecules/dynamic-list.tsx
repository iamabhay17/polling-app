"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

export const DynamicList = ({ form }: { form: UseFormReturn }) => {
  const {
    fields: options,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "options",
  });

  return (
    <>
      {options.map((option, idx) => (
        <FormField
          key={option.id}
          control={form.control}
          name={`options.${idx}`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    placeholder="Enter option"
                    className="w-[302px]"
                    {...field}
                  />
                </FormControl>
                <Button variant="outline" onClick={() => remove(idx)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => append("")}
        className="w-[302px]"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Option
      </Button>
    </>
  );
};
