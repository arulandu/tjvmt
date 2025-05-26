import { MathJax, MathJaxContext } from "better-react-mathjax";

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
    ]
  }
};

export const MathText = ({children, inline=false, dynamic=false, className=''}) => {
  return (
    <MathJaxContext version={3} config={config}>
      <MathJax hideUntilTypeset="first" inline={inline} dynamic={dynamic} className={className}>{children}</MathJax>
    </MathJaxContext>
  );
}