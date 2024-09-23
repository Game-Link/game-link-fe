import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';

export default function useGenericMutation<TResult, TVariables = undefined>(
  queryFn: (variables: TVariables) => Promise<TResult>,
  queryKey: any[],
) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const mutation = useMutation<TResult, Error, TVariables>({
    mutationFn: queryFn,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey});
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: err => {
      console.error(err);
    },
  });

  return {mutation, loading};
}
