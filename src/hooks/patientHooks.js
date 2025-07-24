import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import PatientService from "../services/PatientService"; // Ensure the path is correct
import { toast } from "react-toastify";

/**
 * Custom hook to fetch patients using React Query and PatientService.
 *
 * @param {string} searchTerm - The search term for filtering patients.
 * @param {number} page - The current page number.
 * @param {number} pageSize - The number of patients per page.
 * @returns {object} - React Query's query result containing patient data and status.
 */
export const usePatients = (searchTerm, pageSize = 10) => {
 
  return useInfiniteQuery({
    queryKey: ["patients", searchTerm],
    queryFn: async ({ pageParam = 1 }) => {
      const offset = (pageParam - 1) * pageSize;
      const params = { limit: pageSize, offset, search: searchTerm };
      const response = await PatientService.getPatients(params);
      return {
        data: response.data, // Adjust based on your API response structure
        currentPage: pageParam,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      const { data } = lastPage;
      const totalFetched = allPages.length * pageSize;
      if (data.results.length < pageSize) {
        return undefined; // No more pages
      }
      return allPages.length + 1; // Next page number
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    onError: (error) => {
      toast.error("Error fetching patients.");
      console.error("Error fetching patients:", error);
    },
  });
};

/**
 * Custom hook to update a patient's information using React Query's useMutation.
 *
 * @returns {object} - React Query's mutation object containing methods and state.
 */
export const useUpdatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => PatientService.updatePatient(id, data),

    // Called on successful mutation
    onSuccess: (data, variables) => {
      toast.success("Patient information updated successfully.");
      // Invalidate queries related to 'patients' to refetch the updated data
      queryClient.invalidateQueries(["patients"]);
    },

    // Called when mutation fails
    onError: (error) => {
      toast.error("Failed to update patient information.");
      console.error("Update Patient Error:", error);
    },
  });
};
