/// <reference types="vite/client" />
declare module '*.md' {
    // "unknown" would be more detailed depends on how you structure frontmatter
    const attributes: Record<string, unknown>; 
  
    // When "Mode.HTML" is requested
    const html: string;
  
    // When "Mode.RAW" is requested
    const raw: string
  
    // When "Mode.React" is requested. VFC could take a generic like React.VFC<{ MyComponent: TypeOfMyComponent }>
    import React from 'react'
    const ReactComponent: React.VFC;

    export { attributes, html, raw, ReactComponent };
  }