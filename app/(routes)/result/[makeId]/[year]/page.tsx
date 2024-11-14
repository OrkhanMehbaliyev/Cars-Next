import Link from "next/link";
import { Suspense } from "react";

import { iVehiclesAPIGet } from "@/app/types";
import Spinner from "@/app/components/Spinner";
import { getApiResponse, getYearRange } from "@/app/utils/general";
import VehicleResults from "@/app/(routes)/result/[makeId]/[year]/VehicleResults";

export async function generateStaticParams() {
  const response = await getApiResponse(
    `${process.env.CARS_API_BASE_URL}/vehicles/GetMakesForVehicleType/car?format=json`,
    "Results"
  );

  const vehicles: iVehiclesAPIGet[] = response.data;

  const years = getYearRange(2014);
  const staticParams: Array<{ makeId: string; year: string }> = [];

  vehicles?.forEach((vehicle) => {
    years?.forEach((year) => {
      staticParams.push({ makeId: String(vehicle.MakeId), year: String(year) });
    });
  });

  return staticParams;
}

export default async function ResultPage({
  params,
}: {
  params: { makeId: string; year: string };
}) {
  const { makeId, year } = await params;

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-6 text-blue-600 hover:text-blue-800"
        >
          ← Back to Search
        </Link>

        <Suspense fallback={<Spinner />}>
          <VehicleResults makeId={makeId} year={year} />
        </Suspense>
      </div>
    </main>
  );
}
