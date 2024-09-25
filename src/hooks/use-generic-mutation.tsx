import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';

export default function useGenericMutation<TResult, TVariables = undefined>(
  queryFn: (variables: TVariables) => Promise<TResult>,
  queryKey: any[],
  option?: {
    onSucess?: () => void;
    onError?: () => void;
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey});
      option?.onSucess?.();
    },
    onSettled: () => {
      setLoading(false);
      option?.onSettled?.();
    },
    onError: err => {
      console.error(err);
      option?.onError?.();
    },
  });

  return {mutation, loading};
}
