
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import { addVehicleMaintenance } from "../../services/vehicleService";

function VehicleMaintenancePage() {
  const { id } = useParams();

  const [logs, setLogs] = useState([]);
  const [formData, setFormData] = useState({
    maintenanceDate: "",
    description: "",
    cost: "",
  });

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axiosInstance.get(
        `/vehicles/${id}/history`
      );

      setLogs(res.data.data || []);
    } catch (err) {
      console.error("MAINTENANCE ERROR:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addVehicleMaintenance(id, formData);

      setFormData({
        maintenanceDate: "",
        description: "",
        cost: "",
      });

      fetchHistory();
    } catch (err) {
      console.error("ADD MAINTENANCE ERROR:", err);
    }
  };

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
            maintenance
          </span>
        </h1>

        <p className="text-slate-400">
          Add and review maintenance records for this vehicle.
        </p>
      </div>

      {/* Add Maintenance */}
      <div className="rounded-3xl border border-white/20 bg-white/[0.03] p-6 text-white shadow-2xl mb-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">
            Add Maintenance Record
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Enter the details of the vehicle maintenance.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Maintenance Date */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-300">
              Maintenance Date
            </label>

            <input
              type="date"
              value={formData.maintenanceDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maintenanceDate: e.target.value,
                })
              }
              className="w-full bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-300">
              Description
            </label>

            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="w-full bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          {/* Cost */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-300">
              Cost
            </label>

            <input
              type="number"
              placeholder="Cost"
              value={formData.cost}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cost: e.target.value,
                })
              }
              className="w-full bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          {/* Add Button */}
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-primary)]/20 text-sky-300 border border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/30 transition-colors"
          >
            Add Maintenance
          </button>
        </form>
      </div>

      {/* Maintenance History */}
      <div className="rounded-3xl border border-white/20 bg-white/[0.03] overflow-hidden text-white shadow-2xl">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Maintenance History
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Previous maintenance records for this vehicle.
              </p>
            </div>

            <span className="rounded-full bg-white/[0.03] border border-white/20 px-3 py-1 text-sm text-slate-300">
              {logs.filter((log) => log !== null).length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/[0.03] text-white">
                <th className="border-b border-white/10 p-4 text-left font-semibold">
                  Date
                </th>

                <th className="border-b border-white/10 p-4 text-left font-semibold">
                  Description
                </th>

                <th className="border-b border-white/10 p-4 text-left font-semibold">
                  Cost
                </th>
              </tr>
            </thead>

            <tbody>
              {logs.filter((log) => log !== null).length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="border-b border-white/10 p-8 text-center text-slate-400"
                  >
                    No maintenance records found.
                  </td>
                </tr>
              ) : (
                logs
                  .filter((log) => log !== null)
                  .map((log) => (
                    <tr
                      key={log._id}
                      className="transition-colors hover:bg-white/10"
                    >
                      <td className="border-b border-white/10 p-4 text-white">
                        {new Date(
                          log.maintenanceDate
                        ).toLocaleDateString()}
                      </td>

                      <td className="border-b border-white/10 p-4 text-slate-300">
                        {log.description}
                      </td>

                      <td className="border-b border-white/10 p-4 text-slate-300">
                        Rs. {log.cost}
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

export default VehicleMaintenancePage;

