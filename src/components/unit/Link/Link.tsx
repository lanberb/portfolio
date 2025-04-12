import { protocol } from "@/lib/router/routes";
import {
  type BaseProps,
  type MarginProps,
  type PaddingProps,
  type TypographyProps,
  base,
  margins,
  paddings,
  typography,
} from "@/styles/mixins";
import styled from "@emotion/styled";
import InternalLink from "next/link";
import type { FC, PropsWithChildren } from "react";
import { Text } from "../Text";

interface Props extends TypographyProps, BaseProps, MarginProps, PaddingProps {
  href: string;
}

const ExternalLink = styled.a<Props>`
${base};
${typography};
${margins};
${paddings};
`;

export const Link: FC<PropsWithChildren<Props>> = ({
  children,
  href,
  ...rest
}) => {
  const isExternal =
    href.startsWith(protocol.http) || href.startsWith(protocol.https);

  if (isExternal) {
    return (
      <ExternalLink
        href={href}
        rel="noopener"
        target="_blank"
        height="fit-content"
        {...rest}
      >
        {children}
      </ExternalLink>
    );
  }

  return (
    <InternalLink href={href} prefetch>
      <Text as="span" {...rest}>
        {children}
      </Text>
    </InternalLink>
  );
};
