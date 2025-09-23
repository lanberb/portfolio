import { useI18n } from "@/components/hooks/useI18n";
import { useTheme } from "@/components/hooks/useTheme";
import { DarkModeIcon } from "@/components/icons/darkMode";
import { LightModeIcon } from "@/components/icons/lightMode";
import { SegmentControl } from "@/components/molecules/SegmentControl";
import { Link } from "@/components/unit/Link";
import { Stack } from "@/components/unit/Stack";
import type { LocaleKey } from "@/lib/i18n/localize";
import { routes } from "@/lib/router/routes";
import { GLOBAL_TRANSITION_DURATION } from "@/styles/mixins/transition";
import type { ThemeMode } from "@/styles/theme";
import styled from "@emotion/styled";
import { type CSSProperties, type FC, useCallback } from "react";
import { useLocation } from "react-router-dom";

const navKeys: (keyof typeof routes)[] = ["top", "about", "blog"];

const _NavigationCellWidth = 80;

const _NavigationCell = styled(Link)`
  width: ${_NavigationCellWidth}px;
  display: block;
  flex-grow: 1;
  padding-block: 6px;
  position: relative;
  z-index: 1;
  color: var(${({ theme }) => theme.text.primary});

  &[data-selected="true"] {
    color: var(${({ theme }) => theme.text.primaryInversed});
  }
`;

const _NavigationCellList = styled(Stack)`
  position: relative;

  &::before {
    transition: ${GLOBAL_TRANSITION_DURATION}ms;
    display: block;
    content: "";
    position: absolute;
    border-radius: 80px;
    left: 0;
    width: ${_NavigationCellWidth}px;
    height: calc(100% - 2px);
    transform: translateX(var(--pseudoElementPositionX));
    background-color: var(${({ theme }) => theme.surface.primaryInversed});
  }
`;

export const Navigation: FC = () => {
  const location = useLocation();
  const theme = useTheme();
  const i18n = useI18n();

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

  const pseudoElementPositionX = (() => {
    const index = navKeys.findIndex(
      (route) => `/${route}` === location.pathname,
    );
    return _NavigationCellWidth * Math.max(0, index) + 1;
  })();

  return (
    <Stack
      gap={16}
      p={1}
      mt={64}
      ml={64}
      radius={80}
      width="fit-content"
      backgroundColor="primaryInversed"
    >
      <_NavigationCellList
        as="nav"
        alignItems="center"
        p={1}
        radius={32}
        backgroundColor="primary"
        style={
          {
            "--pseudoElementPositionX": `${pseudoElementPositionX}px`,
          } as CSSProperties
        }
      >
        {navKeys.map((key) => {
          const pathname = `/${key === "top" ? "" : key}`;
          return (
            <_NavigationCell
              key={key}
              href={routes[key]}
              ta="center"
              fz={14}
              data-selected={pathname === location.pathname}
            >
              {key}
            </_NavigationCell>
          );
        })}
      </_NavigationCellList>

      <Stack alignItems="center" gap={16} px={24}>
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
            <LightModeIcon key="light" width={12} height={12} />,
            <DarkModeIcon key="dark" width={12} height={12} />,
          ]}
          onSelect={handleOnSelectTheme}
        />
      </Stack>
    </Stack>
  );
};
