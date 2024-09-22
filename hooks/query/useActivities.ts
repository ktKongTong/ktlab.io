import {useQuery, useQueryClient} from "@tanstack/react-query";

export const useActivities = () => {
    const queryClient = useQueryClient()
    const { status, data, error } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
        const res = await fetch(`/api/activities/recent`);
        return await res.json();
        }
    })

    // const { status, data, error } = useQuery({
    //     queryKey: ['activities'],
    //     queryFn: async () => {
    //     const res = await fetch(`/api/activities/recent`);
    //     return await res.json();
    //     }
    // })

  return {
      data, status, error
  }

}

export const useActivity = (type: string) => {
    const queryClient = useQueryClient()
    return useQuery({
        queryKey: ['activities', type],
        queryFn: async () => {
        const res = await fetch(`/api/activities/recent/${type}`);
        return (await res.json()).data;
        }
    })
}