export const themes = [
    "conkcreet",
    "soot",
    "jetset",
    "amontillado",
    "spring",
    "forest",
    "thistle",
    "system" // keep this if you still want system theme detection
  ] as const;
  
  export type Theme = typeof themes[number];