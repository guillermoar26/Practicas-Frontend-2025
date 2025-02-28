import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

const Button = (props: JSX.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="button"
    />
  );
}

export default Button;