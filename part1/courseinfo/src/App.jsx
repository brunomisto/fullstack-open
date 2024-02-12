const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  let key = 0;
  return (
    <>
      {props.parts.map((part) => {
        key += 1;
        return (
          <p key={key}>
            {part.name} {part.exercises}
          </p>
        );
      })}
    </>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.exercises.reduce((prev, current) => {
        return prev + current;
      }, 0)}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        parts={[
          { name: part1, exercises: exercises1 },
          { name: part2, exercises: exercises2 },
          { name: part3, exercises: exercises3 },
        ]}
      />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  );
};

export default App;
