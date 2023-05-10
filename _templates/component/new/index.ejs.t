---
to: <%= abs_path %>/index.ts
unless_exists: true
---

// export layer
export { Container as <%= component_name %> } from './container';
export type { ContainerProps as <%= component_name %>Props } from './container';
