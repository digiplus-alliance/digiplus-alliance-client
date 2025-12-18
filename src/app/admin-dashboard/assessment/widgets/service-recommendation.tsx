"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormStore } from "@/store/form-store";
import { useGetAllServices } from "@/app/api/admin/services/get-all-services";
import { Loader2, Plus, Trash2, Save } from "lucide-react";

type ServiceRecommendation = {
  id?: string; // For existing service recommendations from the database
  service_id: string;
  service_name: string;
  description: string;
  min_points: number;
  max_points: number;
  levels: string[];
};

interface ServiceRecommendationProps {
  questionNo?: number;
  isLocked?: boolean;
  onSave?: (data: any) => void;
  initialData?: any;
}

export default function ServiceRecommendation({
  questionNo = 1,
  isLocked = false,
  onSave,
  initialData,
}: ServiceRecommendationProps) {
  const { serviceRecommendations, setServiceRecommendations, removeServiceRecommendation } = useFormStore();
  const { data: services, isLoading: servicesLoading } = useGetAllServices();
  
  // Check if there's already a saved recommendation in the store
  const hasSavedRecommendation = serviceRecommendations.length > 0;

  const [recommendations, setRecommendations] = useState<ServiceRecommendation[]>(
    serviceRecommendations.length > 0
      ? serviceRecommendations
      : [
          {
            service_id: "",
            service_name: "",
            description: "",
            min_points: 0,
            max_points: 0,
            levels: [],
          },
        ]
  );

  const [selectedLevels, setSelectedLevels] = useState<{
    [key: string]: string[];
  }>(
    serviceRecommendations.reduce((acc, rec, idx) => {
      acc[idx.toString()] = rec.levels;
      return acc;
    }, {} as { [key: string]: string[] })
  );

  const availableLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  const addRecommendation = () => {
    setRecommendations([
      ...recommendations,
      {
        service_id: "",
        service_name: "",
        description: "",
        min_points: 0,
        max_points: 0,
        levels: [],
      },
    ]);
    setSelectedLevels((prev) => ({
      ...prev,
      [(recommendations.length).toString()]: [],
    }));
  };

  const removeRecommendation = (index: number) => {
    const recToRemove = recommendations[index];
    
    // If this recommendation has an id (from database), mark it as deleted in store
    if (recToRemove.id) {
      removeServiceRecommendation(recToRemove.id);
    }
    
    if (recommendations.length > 1) {
      setRecommendations((prev) => prev.filter((_, i) => i !== index));
      // Rebuild selectedLevels with new indices
      const newLevels: { [key: string]: string[] } = {};
      recommendations.forEach((rec, idx) => {
        if (idx < index) {
          newLevels[idx.toString()] = selectedLevels[idx.toString()] || [];
        } else if (idx > index) {
          newLevels[(idx - 1).toString()] =
            selectedLevels[idx.toString()] || [];
        }
      });
      setSelectedLevels(newLevels);
    }
  };

  const updateRecommendation = (
    index: number,
    field: keyof ServiceRecommendation,
    value: any
  ) => {
    setRecommendations((prev) =>
      prev.map((rec, idx) => {
        if (idx === index) {
          if (field === "service_id" && services) {
            const selectedService = services.find((s) => s._id === value);
            return {
              ...rec,
              service_id: value,
              service_name: selectedService?.name || "",
              description: selectedService?.short_description || "",
            };
          }
          return { ...rec, [field]: value };
        }
        return rec;
      })
    );
  };

  const toggleLevel = (recIndex: number, level: string) => {
    const key = recIndex.toString();
    setSelectedLevels((prev) => {
      const currentLevels = prev[key] || [];
      const newLevels = currentLevels.includes(level)
        ? currentLevels.filter((l) => l !== level)
        : [...currentLevels, level];

      // Update the recommendations array
      setRecommendations((recs) =>
        recs.map((rec, idx) =>
          idx === recIndex ? { ...rec, levels: newLevels } : rec
        )
      );

      return { ...prev, [key]: newLevels };
    });
  };

  const handleSave = () => {
    // Save recommendations to the store
    setServiceRecommendations(recommendations);
    
    // Call onSave to trigger the lock overlay
    if (onSave) {
      onSave({
        type: "service_recommendations",
        recommendations: recommendations,
      });
    } else {
      console.log("Service Recommendations saved:", recommendations);
    }
  };

  const isFormValid = () => {
    return recommendations.every(
      (rec) =>
        rec.service_id.trim() !== "" &&
        rec.min_points >= 0 &&
        rec.max_points >= 0 &&
        rec.max_points >= rec.min_points &&
        rec.levels.length > 0
    );
  };

  return (
    <div className="flex gap-6 my-10">
      {/* Left Panel */}
      <div className="flex-1 p-6 border-[#D6D4D4] rounded-lg border">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Service Recommendations
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Configure service recommendations based on assessment scores and
            digital maturity levels
          </p>
        </div>

        {/* Service Recommendations List */}
        <div className="space-y-4">
          {servicesLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-6 w-6 animate-spin text-[#227C9D]" />
              <span className="ml-2 text-gray-600">Loading services...</span>
            </div>
          ) : (
            <>
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="bg-[#FFF8EB] p-4 rounded-lg border border-[#FFA500] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-700">
                      Recommendation {index + 1}
                    </h4>
                    {recommendations.length > 1 && !isLocked && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeRecommendation(index)}
                        className="text-red-500 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-700">
                      Select Service *
                    </Label>
                    <Select
                      value={rec.service_id}
                      onValueChange={(value) =>
                        updateRecommendation(index, "service_id", value)
                      }
                      disabled={isLocked}
                    >
                      <SelectTrigger className="bg-yellow-50 border-gray-300">
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services?.map((service) => (
                          <SelectItem key={service._id} value={service._id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Points Range */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-700">
                        Min Points *
                      </Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={rec.min_points || ""}
                        onChange={(e) =>
                          updateRecommendation(
                            index,
                            "min_points",
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="bg-yellow-50 border-gray-300"
                        disabled={isLocked}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-700">
                        Max Points *
                      </Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={rec.max_points || ""}
                        onChange={(e) =>
                          updateRecommendation(
                            index,
                            "max_points",
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="bg-yellow-50 border-gray-300"
                        disabled={isLocked}
                      />
                    </div>
                  </div>

                  {/* Digital Maturity Levels */}
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-700">
                      Digital Maturity Levels *
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {availableLevels.map((level) => (
                        <label
                          key={level}
                          className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
                        >
                          <Checkbox
                            checked={
                              selectedLevels[index.toString()]?.includes(
                                level
                              ) || false
                            }
                            onCheckedChange={() => toggleLevel(index, level)}
                            disabled={isLocked}
                          />
                          <span className="text-sm">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Service Description (read-only) */}
                  {rec.service_name && (
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-700">
                        Service Details
                      </Label>
                      <div className="bg-white p-3 rounded border border-gray-200">
                        <p className="font-medium text-sm">{rec.service_name}</p>
                        {rec.description && (
                          <p className="text-xs text-gray-600 mt-1">
                            {rec.description}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {!isLocked && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={addRecommendation}
                  className="w-full text-[#227C9D] border-[#0E5F7D] bg-transparent hover:bg-[#EBFBFF]"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Recommendation
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-72 border-[#D6D4D4] rounded-lg p-6 border flex flex-col justify-between">
        <div className="space-y-4 text-gray-600 text-sm">
          <div className="pt-4">
            <p className="text-xs text-gray-500">
              <strong>Note:</strong> Service recommendations will be shown to
              users based on their total assessment score and digital maturity
              level.
            </p>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-gray-600">
              <strong>How it works:</strong>
            </p>
            <ul className="text-xs text-gray-500 mt-2 space-y-1 list-disc list-inside">
              <li>Set min/max points for each service</li>
              <li>Select applicable maturity levels</li>
              <li>Users will see matching services</li>
            </ul>
          </div>
        </div>

        <Button
          onClick={handleSave}
          className="w-full mt-6 bg-[#227C9D] hover:bg-[#1a5f7a] flex items-center justify-center gap-2"
          disabled={!isFormValid() || isLocked}
        >
          <Save className="h-4 w-4" />
          Save Recommendations
        </Button>
      </div>
    </div>
  );
}
