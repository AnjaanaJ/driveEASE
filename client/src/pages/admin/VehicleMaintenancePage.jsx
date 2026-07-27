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
  cost: ""
});

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
  try {

    

    const res = await axiosInstance.get(`/vehicles/${id}/history`);

    

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
      cost: ""
    });

    fetchHistory();

  } catch (err) {
    console.error("ADD MAINTENANCE ERROR:", err);
  }
};

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Vehicle Maintenance Log
      </h1>

      <form 
  onSubmit={handleSubmit}
  className="mb-6 space-y-3"
>

<input
  type="date"
  value={formData.maintenanceDate}
  onChange={(e)=>
    setFormData({
      ...formData,
      maintenanceDate:e.target.value
    })
  }
  className="border p-2 w-full"
/>


<input
  type="text"
  placeholder="Description"
  value={formData.description}
  onChange={(e)=>
    setFormData({
      ...formData,
      description:e.target.value
    })
  }
  className="border p-2 w-full"
/>


<input
  type="number"
  placeholder="Cost"
  value={formData.cost}
  onChange={(e)=>
    setFormData({
      ...formData,
      cost:e.target.value
    })
  }
  className="border p-2 w-full"
/>


<button
  type="submit"
  className="bg-blue-600 text-white px-4 py-2 rounded"
>
  Add Maintenance
</button>

</form>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Date</th>
            <th className="p-3">Description</th>
            <th className="p-3">Cost</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td className="p-3">
                {new Date(log.maintenanceDate).toLocaleDateString()}
              </td>

              <td className="p-3">
                {log.description}
              </td>

              <td className="p-3">
                Rs. {log.cost}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleMaintenancePage;