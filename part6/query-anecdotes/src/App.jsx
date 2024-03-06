import { useQuery } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import axios from "axios";

const App = () => {
  const handleVote = (anecdote) => {
    console.log("vote");
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    // Hardcoded for now
    queryFn: () =>
      axios
        .get("http://localhost:3001/anecdotes")
        .then((response) => response.data),
    retry: false,
  });

  if (result.isError) {
    return <p>anecdote service is not available due to problems in server</p>;
  }

  if (result.isPending) {
    return <p>loading data</p>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {result.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
