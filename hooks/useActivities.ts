import {useQuery, useQueryClient} from "@tanstack/react-query";

export const useActivities = () => {
    const queryClient = useQueryClient()
    const  { status, data, error } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const res = await fetch(`/api/activities/recent`);
      return await res.json();
    }
  })

  return {
      data, status, error
  }

}