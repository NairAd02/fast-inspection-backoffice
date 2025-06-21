import React from "react";

interface Props {
  index: number;
}

export default function InspectionCardSkeleton({ index }: Props) {
  return (
    <div className="p-5 rounded-lg border bg-gray-50 border-gray-200 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-5 bg-gray-200 rounded w-32"></div>
            {index === 1 && (
              <div className="h-6 bg-indigo-200 rounded-full w-24"></div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Criticality skeleton */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-16"></div>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <div className="h-8 bg-gray-200 rounded w-12"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="h-2 bg-gray-300 rounded-full w-3/4"></div>
          </div>
        </div>

        {/* Deteriorations skeleton */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="h-4 bg-gray-200 rounded w-36"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-20"></div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 bg-gray-200 rounded w-8"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
