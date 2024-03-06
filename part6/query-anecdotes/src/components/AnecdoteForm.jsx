import { useMutation, useQueryClient } from "@tanstack/react-query";
import anecdotesService from "../services/anecdotes";
import { useContext } from "react";
import NotificationContext from "./NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const [notification, dispathNotification] = useContext(NotificationContext);

  const mutation = useMutation({
    mutationFn: anecdotesService.create,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], [...anecdotes, newAnecdote]);
      // Hardcoded notification
      dispathNotification({
        type: "NOTIFICATE",
        payload: `added '${newAnecdote.content}'`,
      });
      setTimeout(() => {
        dispathNotification({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
    },
    onError: () => {
      // Hardcoded notification
      dispathNotification({
        type: "NOTIFICATE",
        payload: "too short anecdote, must have length 5 or more",
      });
      setTimeout(() => {
        dispathNotification({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
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
