import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

function VehicleListPage() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    registrationNumber: "",
    vehicleType: "",
    brand: "",
    model: "",
    transmission: "Manual",
    fuelType: "Petrol",
    seatingCapacity: "",
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  // GET - Fetch all vehicles
  const fetchVehicles = async () => {
    try {
      const response = await axiosInstance.get("/vehicles");

      console.log("API Response:", response.data);

      setVehicles(response.data.data || []);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // POST - Add new vehicle
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axiosInstance.post("/vehicles", formData);

      alert("Vehicle added successfully!");

      setFormData({
        registrationNumber: "",
        vehicleType: "",
        brand: "",
        model: "",
        transmission: "Manual",
        fuelType: "Petrol",
        seatingCapacity: "",
      });

      await fetchVehicles();
    } catch (error) {
      console.error("Error adding vehicle:", error);

      if (error.response && error.response.data) {
        alert(
          error.response.data.message ||
            "Failed to add vehicle."
        );
      } else {
        alert("Failed to add vehicle.");
      }
    }
  };

  if (loading) {
    return (
      <div className="p-5">
        <h2 className="text-2xl font-bold">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="p-5">

      {/* Page Title */}
      <h2 className="text-2xl font-bold mb-6">
        Vehicle Management
      </h2>

      {/* Add Vehicle */}
      <div className="border border-gray-300 rounded-lg p-5 mb-8">

        <h3 className="text-xl font-semibold mb-4">
          Add New Vehicle
        </h3>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Registration Number */}
            <div>
              <label className="block mb-1 font-medium">
                Registration Number
              </label>

              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="Enter registration number"
                required
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block mb-1 font-medium">
                Vehicle Type
              </label>

              <input
                type="text"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                placeholder="Enter vehicle type"
                required
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block mb-1 font-medium">
                Brand
              </label>

              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Enter brand"
                required
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            {/* Model */}
            <div>
              <label className="block mb-1 font-medium">
                Model
              </label>

              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Enter model"
                required
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            {/* Transmission */}
            <div>
              <label className="block mb-1 font-medium">
                Transmission
              </label>

              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block mb-1 font-medium">
                Fuel Type
              </label>

              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            {/* Seating Capacity */}
            <div>
              <label className="block mb-1 font-medium">
                Seating Capacity
              </label>

              <input
                type="number"
                name="seatingCapacity"
                value={formData.seatingCapacity}
                onChange={handleChange}
                placeholder="Enter seating capacity"
                min="1"
                required
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

          </div>

          {/* Add Button */}
          <button
            type="submit"
            className="mt-5 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Add Vehicle
          </button>

        </form>
      </div>

      {/* Vehicle List */}
      <h3 className="text-xl font-semibold mb-4">
        Vehicles
      </h3>

      <div className="overflow-x-auto">

        <table className="table-auto border-collapse border border-gray-300 w-full">

          <thead>
            <tr className="bg-background text-text-primary">
              <th className="border p-2">Registration</th>
              <th className="border p-2">Brand</th>
              <th className="border p-2">Model</th>
              <th className="border p-2">Transmission</th>
              <th className="border p-2">Fuel</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>

            {vehicles.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="border p-4 text-center"
                >
                  No vehicles found.
                </td>
              </tr>
            ) : (
              vehicles.map((vehicle) => (
                <tr key={vehicle._id}>

                  <td className="border p-2">
                    {vehicle.registrationNumber}
                  </td>

                  <td className="border p-2">
                    {vehicle.brand}
                  </td>

                  <td className="border p-2">
                    {vehicle.model}
                  </td>

                  <td className="border p-2">
                    {vehicle.transmission}
                  </td>

                  <td className="border p-2">
                    {vehicle.fuelType}
                  </td>

                  <td className="border p-2">
                    {vehicle.status}
                  </td>

                  <td className="border p-2">

                    <div className="flex gap-2">

                      <Link
                        to={`/admin/vehicles/${vehicle._id}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        View
                      </Link>

                      <Link
                        to={`/admin/vehicles/${vehicle._id}/maintenance`}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Maintenance
                      </Link>

                    </div>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default VehicleListPage;