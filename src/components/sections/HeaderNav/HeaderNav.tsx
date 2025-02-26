import { Link } from "@/components/unit/Link";
import { Stack } from "@/components/unit/Stack";
import { Text } from "@/components/unit/Text";
import { useI18n } from "@/components/hooks/useI18n";
import { useTheme } from "@/components/hooks/useTheme";
import { DarkModeIcon } from "@/components/icons/darkMode";
import { LightModeIcon } from "@/components/icons/lightMode";
import { SegmentControl } from "@/components/molecules/SegmentControl";
import type { LocaleKey } from "@/lib/i18n/localize";
import { MAIL_ADDRESS } from "@/lib/mail/address";
import { routes } from "@/lib/router/routes";
import { GLOBAL_TRANSITION_DURATION } from "@/styles/mixins/transition";
import type { ThemeMode } from "@/styles/theme";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { type FC, useCallback } from "react";

const navRoutes: (keyof typeof routes)[] = [
  "about",
  "works",
  "gallery",
  "contact",
];

const _LinkItem = styled.div<{ showUnderline: boolean }>`
  &::after {
    content: "";
    display: block;
    position: relative;
    left: -0.25px;
    width: ${({ showUnderline }) => (showUnderline ? 100 : 0)}%;
    height: 1px;
    background-color: var(${({ theme }) => theme.text.primary});
    transition: ${GLOBAL_TRANSITION_DURATION}ms;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const HeaderNav: FC = () => {
  const theme = useTheme();
  const i18n = useI18n();
  const router = useRouter();

  const handleOnSelectTheme = useCallback(
    (mode: string) => {
      if (theme != null) {
        theme.onChange(mode as ThemeMode);
      }
    },
    [theme],
  );

  const handleOnSelectLang = useCallback(
    (lang: string) => {
      i18n.onChange(lang as LocaleKey);
    },
    [i18n],
  );

  return (
    <Stack justifyContent="space-between" py={32} px={48}>
      <Stack direction="column" gap={8}>
        <Text ff="Roboto">Nao Sasaki,</Text>
        <Text ff="Roboto">from the obscura, via Tokyo, to the void.</Text>
      </Stack>

      <Stack direction="column" gap={8}>
        <Text ff="Roboto">{MAIL_ADDRESS}</Text>
        <Text ff="Roboto">@lanberb</Text>
      </Stack>

      <Stack alignItems="center" gap={32}>
        {navRoutes.map((key) => {
          const href = routes[key];
          return (
            <_LinkItem key={key} showUnderline={router.pathname === href}>
              <Link href={href} color="primary">
                {key.toUpperCase()}
              </Link>
            </_LinkItem>
          );
        })}
        <SegmentControl
          name="localizeLang"
          defaultKey={i18n.lang}
          items={[<span key="ja">JA</span>, <span key="en">EN</span>]}
          onSelect={handleOnSelectLang}
        />
        <SegmentControl
          name="themeMode"
          defaultKey={theme?.mode}
          items={[
            <LightModeIcon key="light" width={18} height={18} />,
            <DarkModeIcon key="dark" width={18} height={18} />,
          ]}
          onSelect={handleOnSelectTheme}
        />
      </Stack>
    </Stack>
  );
};
