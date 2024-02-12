import Total from "./Total";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <Total parts={parts} />
    </div>
  );
};

export default Content;
