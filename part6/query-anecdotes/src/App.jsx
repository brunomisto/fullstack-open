import { useQuery } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { NotificationContextProvider } from "./components/NotificationContext";
import anecdotesService from "./services/anecdotes";
import Anecdote from "./components/Anecdote";

const App = () => {
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdotesService.getAll,
    retry: false,
  });

  if (result.isError) {
    return <p>anecdote service is not available due to problems in server</p>;
  }

  if (result.isPending) {
    return <p>loading data</p>;
  }

  return (
    <NotificationContextProvider>
      <div>
        <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />
        {result.data.map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
      </div>
    </NotificationContextProvider>
  );
};

export default App;
