import { useDispatch } from "react-redux";
import { changeFilter } from "../reducers/store";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const input = event.target;
    dispatch(changeFilter(input.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
