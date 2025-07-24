// hooks/useFavouriteServiceProvider.js

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ServiceProviderService from "../services/ServiceProviderService";
import { toast } from "react-toastify";

const useFavouriteServiceProvider = (serviceId, initialIsFavourite) => {
  const queryClient = useQueryClient();
  const [isFavourite, setIsFavourite] = useState(initialIsFavourite);

  // Function to update the service in the cache
  const updateServiceInCache = (serviceId, isFavourite) => {
    queryClient.setQueryData(["services"], (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          results: page.results.map((s) =>
            s.id === serviceId ? { ...s, is_favourite: isFavourite } : s
          ),
        })),
      };
    });
  };

  // Mutation for favoriting a service
  const favouriteMutation = useMutation({
    mutationFn: () => ServiceProviderService.favouriteService(serviceId),
    onMutate: async () => {
      // Optimistically update the local state
      setIsFavourite(true);
      // Update the service in the cache
      updateServiceInCache(serviceId, true);
    },
    onError: () => {
      // Roll back the local state
      setIsFavourite(false);
      // Roll back the cache update
      updateServiceInCache(serviceId, false);
      toast.error("Failed to add to favourites.");
    },
    onSuccess: () => {
      toast.success("Service added to favourites.");
    },
  });

  // Mutation for unfavoriting a service
  const unfavouriteMutation = useMutation({
    mutationFn: () => ServiceProviderService.unfavouriteService(serviceId),
    onMutate: async () => {
      // Optimistically update the local state
      setIsFavourite(false);
      // Update the service in the cache
      updateServiceInCache(serviceId, false);
    },
    onError: () => {
      // Roll back the local state
      setIsFavourite(true);
      // Roll back the cache update
      updateServiceInCache(serviceId, true);
      toast.error("Failed to remove from favourites.");
    },
    onSuccess: () => {
      toast.success("Service removed from favourites.");
    },
  });

  const isLoading =
    favouriteMutation.isLoading || unfavouriteMutation.isLoading;

  const toggleFavourite = () => {
    if (isFavourite) {
      unfavouriteMutation.mutate();
    } else {
      favouriteMutation.mutate();
    }
  };

  return {
    isFavourite,
    isLoading,
    toggleFavourite,
  };
};

export default useFavouriteServiceProvider;
