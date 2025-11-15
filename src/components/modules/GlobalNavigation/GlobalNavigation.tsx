import styled from "@emotion/styled";
import { type CSSProperties, type FC, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { SegmentControl } from "@/components/modules/SegmentControl";
import { MediaQuery } from "@/components/styles/media";
import { GLOBAL_TRANSITION_DURATION, type TransitionProps, transition } from "@/components/styles/mixins/transition";
import type { ThemeMode } from "@/components/styles/theme";
import { Box } from "@/components/unit/Box";
import { Button } from "@/components/unit/Button";
import { Icon } from "@/components/unit/Icon";
import { Link } from "@/components/unit/Link";
import { Stack } from "@/components/unit/Stack";
import { Text } from "@/components/unit/Text";
import { useI18n } from "@/hooks/useI18n";
import { useTheme } from "@/hooks/useTheme";
import { useDialogStore } from "@/state/dialog";
import { useGlobalStore } from "@/state/global";
import type { LocaleKey } from "@/util/i18n/localize";
import { routes } from "@/util/routes";

const navKeys: (keyof typeof routes)[] = ["top", "about", "blog"];

const _NavigationCellWidth_PC = 96;
const _NavigationCellWidth_SP = 72;

const _NavigationTransitionItem = styled(Box)<TransitionProps>`
  ${transition};
`;

const _NavigationCell = styled(Link)`
  flex-grow: 1;
  transition: ${GLOBAL_TRANSITION_DURATION}ms;
  font-size: 16px;

  @media ${MediaQuery.sp} {
    font-size: 14px;
  }

  &[data-selected="true"] {
    color: var(${({ theme }) => theme.text.primaryInversed});
  }

  &:not([data-selected="true"]):hover {
    background-color: var(${({ theme }) => theme.surface.primaryDisabled});
  }
`;

const _NavigationCellList = styled(Stack)`
  &::before {
    transition: ${GLOBAL_TRANSITION_DURATION}ms;
    display: block;
    content: "";
    position: absolute;
    border-radius: 80px;
    left: 0;
    width: ${_NavigationCellWidth_PC}px;
    height: 100%;
    transform: translateX(var(--pseudoElementPositionX));
    background-color: var(${({ theme }) => theme.surface.primaryInversed});

    @media ${MediaQuery.sp} {
      width: ${_NavigationCellWidth_SP}px;
    }
  }
`;

export const GlobalNavigation: FC = () => {
  const location = useLocation();
  const theme = useTheme();
  const i18n = useI18n();

  const globalStore = useGlobalStore();
  const dialogStore = useDialogStore();

  const handleOnSelectTheme = useCallback(
    (mode: string) => {
      if (theme != null) {
        theme.change(mode as ThemeMode);
      }
    },
    [theme],
  );

  const handleOnSelectLang = useCallback(
    (lang: string) => {
      i18n.change(lang as LocaleKey);
    },
    [i18n],
  );

  const handleOnClickFootprintButton = useCallback(() => {
    dialogStore.openCreateStickerDialog();
  }, [dialogStore]);

  const pseudoElementPositionX = (() => {
    const index = navKeys.findIndex((route) => `/${route}` === location.pathname);
    const width = window.matchMedia(MediaQuery.sp).matches ? _NavigationCellWidth_SP : _NavigationCellWidth_PC;
    return width * Math.max(0, index);
  })();

  return (
    <>
      <_NavigationTransitionItem
        opacity={globalStore.isEndedOpeningAnimation ? 1 : 0}
        position="absolute"
        top={[
          { key: "sp", value: 24 },
          { key: "pc", value: 64 },
        ]}
        left={[
          { key: "sp", value: 16 },
          { key: "pc", value: 64 },
        ]}
      >
        <Stack
          wrap="nowrap"
          b={1}
          bc="primaryInversed"
          radius={80}
          width="fit-content"
          backgroundColor="primaryInversed"
        >
          <_NavigationCellList
            as="nav"
            position="relative"
            alignItems="center"
            b={2}
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
                  tt="capitalize"
                  width={[
                    { key: "sp", value: _NavigationCellWidth_SP },
                    { key: "pc", value: _NavigationCellWidth_PC },
                  ]}
                  radius={32}
                  py={4}
                  position="relative"
                  color="primary"
                  zIndex={1}
                  display="block"
                  data-selected={pathname === location.pathname}
                >
                  {key}
                </_NavigationCell>
              );
            })}
          </_NavigationCellList>

          <Stack alignItems="center" gap={24} px={32}>
            <SegmentControl
              name="localizeLang"
              defaultKey={i18n.lang}
              items={[<span key="ja">JA</span>, <span key="en">EN</span>]}
              onSelect={handleOnSelectLang}
            />
            {/* SPだとはみ出る & 端末で切り替えればいい */}
            <Box
              display={[
                { key: "sp", value: "none" },
                { key: "pc", value: "block" },
              ]}
            >
              <SegmentControl
                name="themeMode"
                defaultKey={theme?.mode}
                items={[<Icon key="light" name="modeLight" size={16} />, <Icon key="dark" name="modeDark" size={16} />]}
                onSelect={handleOnSelectTheme}
              />
            </Box>
          </Stack>
        </Stack>
      </_NavigationTransitionItem>

      <_NavigationTransitionItem
        opacity={globalStore.isEndedOpeningAnimation ? 1 : 0}
        position="absolute"
        inset={[
          { key: "pc", value: "64px 64px auto auto" },
          { key: "sp", value: "auto 16px 24px auto" },
        ]}
      >
        <Button
          endIcon={<Icon name="footprint" size={24} rotate={90} />}
          variant="filled"
          type="button"
          onClick={handleOnClickFootprintButton}
        >
          <Text as="span" ff="Zen Old Mincho" color="primaryInversed">
            足跡を残す
          </Text>
        </Button>
      </_NavigationTransitionItem>
    </>
  );
};
