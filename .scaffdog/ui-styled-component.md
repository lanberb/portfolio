---
name: 'ui-styled-component'
questions:
  name: 'コンポーネント名を入力してください'
root: 'src/components'
output: '**/*'
ignore: ['**/{A..Z}*', '**/{A..Z}**/*']
---

# `{{ inputs.name | pascal }}/index.ts`

```typescript
export * from './{{ inputs.name | pascal }}';
```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.tsx`

```typescript
import styled from 'styled-components';

interface Props {}

export const {{ inputs.name | pascal }} = styled.div<Props>`
  display: block;
`;
```
