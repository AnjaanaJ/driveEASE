import axiosInstance from "./axiosInstance";


export const getInstructorAvailability = (id) => {

    return axiosInstance.get(
        `/instructors/${id}/availability`
    );

};


export const updateInstructorAvailability = (id, data) => {

    return axiosInstance.put(
        `/instructors/${id}/availability`,
        data
    );

};export const getMyInstructorProfile = async () => {
    const response = await axiosInstance.get("/instructors/me");
    return response.data;
};