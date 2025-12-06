import { type FC, useCallback, useEffect } from "react";
import { PageLayout } from "@/components/modules/PageLayout";
import { Stack } from "@/components/unit/Stack";
import { Text } from "@/components/unit/Text";
import { useGlobalCanvas } from "@/hooks/useGlobalCanvas";
import { useTheme } from "@/hooks/useTheme";
import { useGlobalStore } from "@/state/global";
import { animation } from "./internals/canvas/animation";

export const AboutPage: FC = () => {
  const themeState = useTheme();
  const globalStore = useGlobalStore();
  const { el, canvasApi } = useGlobalCanvas();

  const handleOnAnimationComplete = useCallback(() => {
    globalStore.setIsEndedOpeningAnimation();
  }, [globalStore.setIsEndedOpeningAnimation]);

  useEffect(() => {
    if (canvasApi == null || el == null || themeState == null) {
      return;
    }
    console.log("Running about animation...");
    animation(canvasApi, el, themeState, handleOnAnimationComplete);
  }, [canvasApi, el, themeState, handleOnAnimationComplete]);

  return (
    <PageLayout title="About | EE-BBB.©">
      <Stack direction="column" gap={240} position="relative" mx={80} pt={320}>
        <Stack gap={480}>
          <Text as="h1" fz={16} fw={400} lh="140%">
            About.
          </Text>
          <Text ff="Zen Old Mincho" fz={12} lh="180%">
            <span>日本の高専を卒業後、インハウス企業でフロントエンドエンジニアとして従事。</span>
            <br />
            <span>感覚と思考のあいだを行き来し、仕組みと手触りの両方に関心を持ちながら制作に取り組んでいます。</span>
            <br />
            <span>
              自分が手がけるものがどのように使われ、どのように感じられるかを意識し、設計から実装まで一貫した対応で、インタラクションの質と体験の深さを高めることを目指しています。
            </span>
            <br />
            <span>
              ユーザーの感情や背景・利用される文脈を想像し、単なる見た目や機能を超えた、深度ある体験設計を追い求めています。
            </span>
          </Text>
        </Stack>

        <Stack gap={480}>
          <Text as="h1" fz={16} fw={400} lh="140%">
            Service.
          </Text>
          <Text ff="Zen Old Mincho" fz={12} lh="180%">
            <span>日本の高専を卒業後、インハウス企業でフロントエンドエンジニアとして従事。</span>
            <br />
            <span>感覚と思考のあいだを行き来し、仕組みと手触りの両方に関心を持ちながら制作に取り組んでいます。</span>
            <br />
            <span>
              自分が手がけるものがどのように使われ、どのように感じられるかを意識し、設計から実装まで一貫した対応で、インタラクションの質と体験の深さを高めることを目指しています。
            </span>
            <br />
            <span>
              ユーザーの感情や背景・利用される文脈を想像し、単なる見た目や機能を超えた、深度ある体験設計を追い求めています。
            </span>
          </Text>
        </Stack>
      </Stack>
    </PageLayout>
  );
};
