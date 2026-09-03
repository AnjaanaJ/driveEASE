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

  if (loading) return <h2 className="p-6">Loading...</h2>;

  if (!vehicle) return <h2 className="p-6">Vehicle not found</h2>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Vehicle Details
      </h1>

      <div className="bg-background rounded-lg p-6 space-y-3">

        <p><strong>Registration Number:</strong> {vehicle.registrationNumber}</p>

        <p><strong>Vehicle Type:</strong> {vehicle.vehicleType}</p>

        <p><strong>Brand:</strong> {vehicle.brand}</p>

        <p><strong>Model:</strong> {vehicle.model}</p>

        <p><strong>Transmission:</strong> {vehicle.transmission}</p>

        <p><strong>Fuel Type:</strong> {vehicle.fuelType}</p>

        <p><strong>Seating Capacity:</strong> {vehicle.seatingCapacity}</p>

        <p><strong>Status:</strong> {vehicle.status}</p>

      </div>
    </div>
  );
}

export default VehicleDetailPage;