import { useSelector } from "react-redux";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .toSorted((first, second) => second.votes - first.votes)
      .filter((anecdote) => anecdote.content.includes(state.filter))
  );

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  );
};

export default AnecdoteList;
