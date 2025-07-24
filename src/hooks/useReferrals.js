import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import ReferralService from "../services/ReferralService";

export const useReferrals = (pageSize, filters) => {
  return useInfiniteQuery({
    queryKey: ["referrals", pageSize, filters],
    queryFn: async ({ pageParam = 0 }) => {
      const params = new URLSearchParams({
        limit: pageSize,
        offset: pageParam,
      });

      // Status Filters
      if (filters?.statuses?.length) {
        filters.statuses.forEach((status) => {
          params.append("status", status.toUpperCase());
        });
      }

      // Type Filters
      if (filters?.type) {
        params.append("type", filters.type.toUpperCase());
      }

      // Include Archived Filter
      if (filters?.includeArchived) {
        params.append("include_archived", "true");
      }

      // Patient DOB Filter
      if (filters?.dob) {
        params.append("patient__birth_date", filters.dob);
      }

      // Creation Date Range Filters
      if (filters?.createdDateRange?.from) {
        params.append("created_date__gte", filters.createdDateRange.from);
      }
      if (filters?.createdDateRange?.to) {
        params.append("created_date__lte", filters.createdDateRange.to);
      }

      // Search Term Filter
      if (filters?.searchTerm) {
        params.append("search", filters.searchTerm);
      }

      if (filters?.fromMe) {
        params.append("from_me", filters.fromMe); // true or false
      }

      // Order
      if (filters?.order) {
        params.append("order", filters.order);
      }

      // Fetch data
      const response = await ReferralService.getReferrals(params);
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalCount = lastPage.count;
      const nextOffset = allPages.length * pageSize;
      if (nextOffset < totalCount) {
        return nextOffset;
      } else {
        return undefined;
      }
    },
  });
};

export const useReferral = (id) => {
  return useQuery({
    queryKey: ["getReferralById", id],
    queryFn: async () => {
      if (!id) throw new Error("Request ID is required");
      const response = await ReferralService.getReferralById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useReferralHistory = (id) => {
  return useQuery({
    queryKey: ["getReferralHistoryById", id],
    queryFn: async () => {
      const response = await ReferralService.getReferralHistoryById(id);
      return response.data;
    },
    enabled: !!id,
  });
};
