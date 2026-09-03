import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

function InstructorProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/instructors/me");

        setProfile(response.data.data);
      } catch (err) {
        console.error("Error fetching instructor profile:", err);
        setError("Failed to load instructor profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="p-5">
        <h2 className="text-2xl font-bold">
          Loading profile...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-5">
        <p>No profile information found.</p>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-6">
        My Instructor Profile
      </h2>

      <div className="border border-gray-300 rounded-lg p-6 max-w-2xl">
        <div className="mb-5">
          <p className="text-gray-600 mb-1">Phone</p>
          <p className="text-lg font-medium">
            {profile.phone || "N/A"}
          </p>
        </div>

        <div className="mb-5">
          <p className="text-gray-600 mb-1">NIC</p>
          <p className="text-lg font-medium">
            {profile.nic || "N/A"}
          </p>
        </div>

        <div className="mb-5">
          <p className="text-gray-600 mb-1">License Number</p>
          <p className="text-lg font-medium">
            {profile.licenseNumber || "N/A"}
          </p>
        </div>

        <div className="mb-5">
          <p className="text-gray-600 mb-1">Experience</p>
          <p className="text-lg font-medium">
            {profile.experience || "N/A"}
          </p>
        </div>

        <div className="mb-5">
          <p className="text-gray-600 mb-1">Qualification</p>
          <p className="text-lg font-medium">
            {profile.qualification || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-gray-600 mb-1">Status</p>
          <p className="text-lg font-medium">
            {profile.status || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InstructorProfilePage;