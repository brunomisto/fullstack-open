import { useMutation, useQueryClient } from "@tanstack/react-query";
import anecdotesService from "../services/anecdotes";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: anecdotesService.create,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], [...anecdotes, newAnecdote]);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    mutation.mutate({ content, votes: 0 });
    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
