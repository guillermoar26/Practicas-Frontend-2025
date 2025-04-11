import { FunctionalComponent } from "preact";

const Form: FunctionalComponent = () => {
  return (
    <div>
      <h1>Search Book</h1>
      <form method="get" action="/search/">
        <input type="text" name="title" placeholder="Introduce un titulo" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
