
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
      <div className="min-h-screen p-8 md:p-12">
        <div className="rounded-3xl border border-white/20 bg-white/[0.03] p-6 text-white shadow-2xl">
          <h2 className="text-2xl font-bold text-white">
            Loading vehicles...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 md:p-12">
      {/* Page Header */}
      <div className="mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 mb-4">
          Admin panel
        </span>

        <h1 className="text-4xl font-bold text-white mb-2">
          Vehicle{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
            management
          </span>
        </h1>

        <p className="text-slate-400">
          Add, review, and manage vehicles used for driving lessons.
        </p>
      </div>

      {/* Add Vehicle */}
      <div className="rounded-3xl border border-white/20 bg-white/[0.03] p-6 text-white shadow-2xl mb-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">
            Add New Vehicle
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Enter the vehicle information below.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Registration Number */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-300">
                Registration Number
              </label>

              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="Enter registration number"
                required
                className="w-full bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-300">
                Vehicle Type
              </label>

              <input
                type="text"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                placeholder="Enter vehicle type"
                required
                className="w-full bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-300">
                Brand
              </label>

              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Enter brand"
                required
                className="w-full bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* Model */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-300">
                Model
              </label>

              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Enter model"
                required
                className="w-full bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* Transmission */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-300">
                Transmission
              </label>

              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="w-full bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-300">
                Fuel Type
              </label>

              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="w-full bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            {/* Seating Capacity */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-300">
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
                className="w-full bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Add Button */}
          <button
            type="submit"
            className="mt-6 px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-primary)]/20 text-sky-300 border border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/30 transition-colors"
          >
            Add Vehicle
          </button>
        </form>
      </div>

      {/* Vehicle List */}
      <div className="rounded-3xl border border-white/20 bg-white/[0.03] overflow-hidden text-white shadow-2xl">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Vehicles
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                View and manage registered vehicles.
              </p>
            </div>

            <span className="rounded-full bg-white/[0.03] border border-white/20 px-3 py-1 text-sm text-slate-300">
              {vehicles.length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/[0.03] text-white">
                <th className="border-b border-white/10 p-4 text-left font-semibold">
                  Registration
                </th>

                <th className="border-b border-white/10 p-4 text-left font-semibold">
                  Brand
                </th>

                <th className="border-b border-white/10 p-4 text-left font-semibold">
                  Model
                </th>

                <th className="border-b border-white/10 p-4 text-left font-semibold">
                  Transmission
                </th>

                <th className="border-b border-white/10 p-4 text-left font-semibold">
                  Fuel
                </th>

                <th className="border-b border-white/10 p-4 text-left font-semibold">
                  Status
                </th>

                <th className="border-b border-white/10 p-4 text-left font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {vehicles.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="border-b border-white/10 p-8 text-center text-slate-400"
                  >
                    No vehicles found.
                  </td>
                </tr>
              ) : (
                vehicles.map((vehicle) => (
                  <tr
                    key={vehicle._id}
                    className="transition-colors hover:bg-white/10"
                  >
                    <td className="border-b border-white/10 p-4 text-white">
                      {vehicle.registrationNumber}
                    </td>

                    <td className="border-b border-white/10 p-4 text-slate-300">
                      {vehicle.brand}
                    </td>

                    <td className="border-b border-white/10 p-4 text-slate-300">
                      {vehicle.model}
                    </td>

                    <td className="border-b border-white/10 p-4 text-slate-300">
                      {vehicle.transmission}
                    </td>

                    <td className="border-b border-white/10 p-4 text-slate-300">
                      {vehicle.fuelType}
                    </td>

                    <td className="border-b border-white/10 p-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                          vehicle.status === "Available"
                            ? "text-green-400 bg-green-500/10 border border-green-500/20"
                            : vehicle.status === "Maintenance"
                              ? "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20"
                              : "text-red-400 bg-red-500/10 border border-red-500/20"
                        }`}
                      >
                        {vehicle.status}
                      </span>
                    </td>

                    <td className="border-b border-white/10 p-4">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          to={`/admin/vehicles/${vehicle._id}`}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--color-primary)]/20 text-sky-300 border border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/30 transition-colors"
                        >
                          View
                        </Link>

                        <Link
                          to={`/admin/vehicles/${vehicle._id}/maintenance`}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--color-primary)]/20 text-sky-300 border border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/30 transition-colors"
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
    </div>
  );
}

export default VehicleListPage;

