import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';

export default function useGenericMutation<TResult, TVariables = undefined>(
  queryFn: (variables: TVariables) => Promise<TResult>,
  queryKey: any[],
  option?: {
    onSucess?: (data?: TResult) => void;
    onError?: (err: Error) => void;
    onMutate?: () => void;
    onSettled?: () => void;
  },
) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const mutation = useMutation<TResult, Error, TVariables>({
    mutationFn: queryFn,
    onMutate: () => {
      setLoading(true);
      option?.onMutate?.();
    },
    onSuccess: async data => {
      await queryClient.invalidateQueries({queryKey});
      option?.onSucess?.(data);
    },
    onSettled: () => {
      setLoading(false);
      option?.onSettled?.();
    },
    onError: err => {
      option?.onError?.(err);
    },
  });

  return {mutation, loading};
}
