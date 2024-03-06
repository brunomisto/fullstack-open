import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import anecdotesService from "../services/anecdotes";
import { useContext } from "react";
import NotificationContext from "./NotificationContext";

const Anecdote = ({ anecdote }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: anecdotesService.update,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      );
      // Hardcoded notification
      dispathNotification({
        type: "NOTIFICATE",
        payload: `anecdote '${updatedAnecdote.content}' voted`,
      });
      setTimeout(() => {
        dispathNotification({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
    },
  });

  const handleVote = (anecdote) => {
    mutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const [notification, dispathNotification] = useContext(NotificationContext);

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  );
};

Anecdote.propTypes = {
  anecdote: PropTypes.object,
};

export default Anecdote;
