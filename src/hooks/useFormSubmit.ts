import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFormSubmit = <T>(
  mutationFn: (data: T) => Promise<any>,
  queryKey: string[]
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      console.error("Form submission error:", error);
    },
  });
};
