 import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { Link } from "react-router-dom";

function VehicleListPage() {
  const [vehicles, setVehicles] = useState([]);
  console.log("Vehicles State:", vehicles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
  try {
    const response = await axiosInstance.get("/vehicles");

    console.log("API Response:", response.data);

    setVehicles(response.data.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  if (loading) return <h2 className="p-6">Loading...</h2>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Vehicle Management</h1>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Registration</th>
            <th className="p-3">Brand</th>
            <th className="p-3">Model</th>
            <th className="p-3">Transmission</th>
            <th className="p-3">Fuel</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
              {vehicles.map((vehicle) => (
              <tr key={vehicle._id} className="border-t">
                 <td className="p-3">{vehicle.registrationNumber}</td>
                 <td className="p-3">{vehicle.brand}</td>
                 <td className="p-3">{vehicle.model}</td>
                 <td className="p-3">{vehicle.transmission}</td>
                 <td className="p-3">{vehicle.fuelType}</td>
                 <td className="p-3">{vehicle.status}</td>

                 <td className="p-3">
                    <div className="flex gap-2">

                      <Link
                        to={`/admin/vehicles/${vehicle._id}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                      View
                      </Link>

                     <Link
                        to={`/admin/vehicles/${vehicle._id}/maintenance`}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                     >
                      Maintenance
                     </Link>

                    </div>
                  </td>
              </tr>
                     ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleListPage;