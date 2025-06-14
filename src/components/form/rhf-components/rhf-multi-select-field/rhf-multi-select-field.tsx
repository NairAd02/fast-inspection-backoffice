"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";
import { AlertCircleIcon, X } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  name: string;
  label?: string;
  description?: string;
  options: SelectOption[];
  maxHeight?: string;
  loading?: boolean;
  emptyText?: string;
  showSelected?: boolean;
  cardTitle?: string;
}

export function RHFMultiSelectField({
  name,
  label = "Seleccione los elementos",
  description,
  options,
  maxHeight = "max-h-32",
  loading = false,
  emptyText = "No hay datos",
  showSelected = true,
  cardTitle = "Elementos",
}: Props) {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        const selectedValues = field.value || [];

        const handleCheckboxChange = (checked: boolean, value: string) => {
          const current = new Set(selectedValues);
          if (checked) {
            current.add(value);
          } else {
            current.delete(value);
          }
          field.onChange(Array.from(current));
        };

        const removeSelected = (value: string) => {
          const current = new Set(selectedValues);
          current.delete(value);
          field.onChange(Array.from(current));
        };

        return (
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">{cardTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <FormItem>
                <div className="space-y-3">
                  {label && <Label>{label}</Label>}
                  <FormControl>
                    {!loading ? (
                      options.length > 0 ? (
                        <div
                          className={`border rounded-lg p-4 ${maxHeight} overflow-y-auto`}
                        >
                          <div className="space-y-2">
                            {options.map((option) => (
                              <label
                                key={option.value}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <Checkbox
                                  checked={selectedValues.includes(
                                    option.value
                                  )}
                                  onCheckedChange={(checked) =>
                                    handleCheckboxChange(
                                      !!checked,
                                      option.value
                                    )
                                  }
                                  className="rounded border-gray-300"
                                />
                                <span className="text-sm">{option.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-full gap-2 p-2">
                          <AlertCircleIcon />
                          {emptyText}
                        </div>
                      )
                    ) : (
                      <div className="mx-auto">
                        <LoadingSpinner />
                      </div>
                    )}
                  </FormControl>

                  {showSelected && selectedValues.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedValues.map((value: string) => {
                        const option = options.find(
                          (opt) => opt.value === value
                        );
                        return option ? (
                          <Badge key={value} variant="secondary">
                            {option.label}
                            <Button
                              className="size-4 cursor-pointer"
                              size={"icon"}
                              variant={"destructive"}
                              onClick={() => {
                                removeSelected(value);
                              }}
                            >
                              <X className="size-3" />
                            </Button>
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  )}

                  {description && options.length > 0 && (
                    <FormDescription>{description}</FormDescription>
                  )}
                  <FormMessage />
                </div>
              </FormItem>
            </CardContent>
          </Card>
        );
      }}
    />
  );
}
