import { useSignal } from "@preact/signals";
import Button from "../components/Button.tsx";

type Props = {
  title: string,
  text: string[],
}

export default function Counter(props: Props) {
  const mostrar = useSignal(false);
  const text = useSignal(props.text);
  const inputText = useSignal("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (inputText.value.trim()) {
      text.value = [...text.value, inputText.value];
      inputText.value = "";
    }
  };

  return (
    <div class="card">
      <h2>{props.title}</h2>
      <Button onClick={() => mostrar.value = !mostrar.value}>
        {mostrar.value ? "Mostrar menos" : "Mostrar más"}
      </Button>
      {mostrar.value && (
        <div class="open-card">
          <div>
            {text.value.map((elem, index) => (
              <span key={index}>{elem}<br/><br/></span>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Input de texto" value={inputText.value}
              onInput={(e) => inputText.value = (e.target as HTMLInputElement).value}
            />
            <Button type="submit">Añadir</Button>
          </form>
        </div>
      )}
    </div>
  );
}

