import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  --color-primary-100:#6A00FF;
  --color-primary-200:#a64aff;
  --color-primary-300:#ffb1ff;
  --color-accent-100:#00E5FF;
  --color-accent-200:#00829b;
  --color-text-100:#FFFFFF;
  --color-text-200:#e0e0e0;
  --color-bg-100:#1A1A1A;
  --color-bg-200:#292929;
  --color-bg-300:#404040;
  --color-danger-100:#dd4d51;
  --color-danger-200:#8f001a;
      
  --backdrop-color: rgba(64, 64, 64, 0.1);
  --button-color-100: rgba(106, 0, 255, 0.8);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  --image-grayscale: 0;
  --image-opacity: 100%;

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-text-100);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
  border: 1px solid var(--color-bg-300);
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-bg-300);
  color: var(--color-text-200);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-primary-200);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

`;

export default GlobalStyles;
