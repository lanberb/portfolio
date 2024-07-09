import { css, type RuleSet, type CSSProperties } from "styled-components";

export interface MarginProps {
  m?: CSSProperties["margin"];
  mt?: CSSProperties["marginTop"];
  ml?: CSSProperties["marginLeft"];
  mr?: CSSProperties["marginRight"];
  mb?: CSSProperties["marginBottom"];
}

export const margins = ({
  m = 0,
  mb = 0,
  ml = 0,
  mr = 0,
  mt = 0,
}: MarginProps): RuleSet => css`
  margin: ${m};
  margin-top: ${mt};
  margin-left: ${ml};
  margin-right: ${mr};
  margin-bottom: ${mb};
`;
