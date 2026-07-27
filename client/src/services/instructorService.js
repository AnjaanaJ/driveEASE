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

};