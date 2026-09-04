
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

function VehicleDetailPage() {
  const { id } = useParams();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicle();
  }, []);

  const fetchVehicle = async () => {
    try {
      const response = await axiosInstance.get(`/vehicles/${id}`);
      setVehicle(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8 md:p-12">
        <div className="rounded-3xl border border-white/20 bg-white/[0.03] p-6 text-white shadow-2xl">
          <h2 className="text-2xl font-bold text-white">
            Loading vehicle details...
          </h2>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen p-8 md:p-12">
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-red-400">
          Vehicle not found.
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
            details
          </span>
        </h1>

        <p className="text-slate-400">
          View vehicle information and current operational status.
        </p>
      </div>

      {/* Vehicle Details */}
      <div className="rounded-3xl border border-white/20 bg-white/[0.03] p-6 text-white shadow-2xl">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">
            Vehicle Information
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Details associated with this vehicle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-sm text-slate-400 mb-1">
              Registration Number
            </p>
            <p className="font-medium text-white">
              {vehicle.registrationNumber}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-sm text-slate-400 mb-1">
              Vehicle Type
            </p>
            <p className="font-medium text-white">
              {vehicle.vehicleType}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-sm text-slate-400 mb-1">
              Brand
            </p>
            <p className="font-medium text-white">
              {vehicle.brand}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-sm text-slate-400 mb-1">
              Model
            </p>
            <p className="font-medium text-white">
              {vehicle.model}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-sm text-slate-400 mb-1">
              Transmission
            </p>
            <p className="font-medium text-white">
              {vehicle.transmission}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-sm text-slate-400 mb-1">
              Fuel Type
            </p>
            <p className="font-medium text-white">
              {vehicle.fuelType}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-sm text-slate-400 mb-1">
              Seating Capacity
            </p>
            <p className="font-medium text-white">
              {vehicle.seatingCapacity}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-sm text-slate-400 mb-2">
              Status
            </p>

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
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetailPage;

