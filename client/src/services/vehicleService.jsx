import axiosInstance from "./axiosInstance";


export const addVehicleMaintenance = (id, data) => {
    return axiosInstance.put(
        `/vehicles/${id}/maintenance`,
        data
    );
};