---
name: "ui-function-component"
questions:
  name: "コンポーネント名を入力してください"
  bool:
    confirm: "Connectedを作成しますか？"
    initial: false
root: "src/components"
output: "**/*"
ignore: ["**/{A..Z}*", "**/{A..Z}**/*"]
---

# `{{ inputs.name | pascal }}/index.ts`

```typescript
export * from "./{{ inputs.name | pascal }}";
```

# `{{ !inputs.bool && "!" }}{{ inputs.name | pascal }}/Connected{{ inputs.name | pascal }}.tsx`

```typescript
import { type FC } from "react";
import { {{ inputs.name | pascal }} } from "./{{ inputs.name | pascal }}";

interface Props {}

export const Connected{{ inputs.name | pascal }}: FC<Props> = () => {
  return <{{ inputs.name | pascal }}/>;
};
```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.tsx`

```typescript
import { type FC } from "react";

interface Props {}

export const {{ inputs.name | pascal }}: FC<Props> = () => {
  return <></>;
};
```
