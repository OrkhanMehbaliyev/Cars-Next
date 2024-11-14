"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import useFetch from "./hooks/useFetch";
import { iVehiclesAPIGet } from "./types";
import bgImage from "@/public/bg-image.webp";
import { getYearRange } from "./utils/general";

export default function Home() {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const years = getYearRange(2014);

  const { data: dataCarResults, loading: loadingCarResults } = useFetch<
    iVehiclesAPIGet[]
  >(
    `${process.env.NEXT_PUBLIC_CARS_API_BASE_URL}/vehicles/GetMakesForVehicleType/car?format=json`,
    "Results"
  );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Image
        src={bgImage}
        alt="Background Image"
        className="absolute inset-0 w-full h-full object-cover z-[-1] brightness-50"
      />

      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Car Dealer Application
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Make
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
              disabled={loadingCarResults}
            >
              <option value="">Select a make</option>
              {dataCarResults?.map((make) => (
                <option key={make.MakeId} value={make.MakeId}>
                  {make.MakeName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Year
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Select a year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <Link
            href={
              selectedMake && selectedYear
                ? `/result/${selectedMake}/${selectedYear}`
                : "#"
            }
            className={`block w-full text-center py-3 px-4 rounded-md font-medium transition-colors ${
              selectedMake && selectedYear
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={(e) => {
              if (!selectedMake || !selectedYear) {
                e.preventDefault();
              }
            }}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
