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
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>No profile information found.</p>;
  }

  return (
    <div>
      <h1>My Instructor Profile</h1>

      <div>
        <p>
          <strong>Phone:</strong> {profile.phone}
        </p>

        <p>
          <strong>NIC:</strong> {profile.nic}
        </p>

        <p>
          <strong>License Number:</strong> {profile.licenseNumber}
        </p>

        <p>
          <strong>Experience:</strong> {profile.experience}
        </p>

        <p>
          <strong>Qualification:</strong> {profile.qualification}
        </p>

        <p>
          <strong>Status:</strong> {profile.status}
        </p>
      </div>
    </div>
  );
}

export default InstructorProfilePage;