import { iVehicleModelAPIGet } from "@/app/types";
import { getApiResponse, getUniqueObjectsById } from "@/app/utils/general";

export default async function VehicleResults({
  makeId,
  year,
}: {
  makeId: string;
  year: string;
}) {
  const { data: dataResponse } = await getApiResponse<iVehicleModelAPIGet[]>(
    `${process.env.CARS_API_BASE_URL}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
    "Results"
  );

  //api sometimes sends the same objects, that's why I wrote this function. It is a quick solution though.
  const data = dataResponse && getUniqueObjectsById(dataResponse, "Model_ID");

  if (!data?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">
          No vehicles found for the selected criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Vehicles for {year}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((vehicle) => (
          <div
            key={vehicle.Model_ID}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {vehicle.Model_Name}
            </h2>

            <p className="text-sm text-gray-600">Make: {vehicle.Make_Name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
