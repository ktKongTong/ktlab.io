import {useQuery, useQueryClient} from "@tanstack/react-query";


export const useActivity = (type: string) => {
    const queryClient = useQueryClient()
    return useQuery({
        queryKey: ['activities', type],
        queryFn: async () => {
        const res = await fetch(`/api/route/${type}/activity/recent`);
            return (await res.json());
        }
    })
}