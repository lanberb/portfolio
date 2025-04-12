import fs from "node:fs";
import path from "node:path";
import { Default } from "@/components/layouts/Default";
import { Box } from "@/components/unit/Box";
import { Stack } from "@/components/unit/Stack";
import { Text } from "@/components/unit/Text";
import { typography } from "@/styles/mixins";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Markdown from "react-markdown";

const currentDir = path.join(process.cwd(), "public/blog-markdown");
const textStyle = typography({ ff: "Zen Old Mincho", fw: 400, lh: "140%" });

export const getStaticPaths: GetStaticPaths = () => {
  const filenames = fs.readdirSync(currentDir);

  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace(/\.md$/, ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const fullPath = path.join(currentDir, `${params?.slug}.md`);
  const content = fs.readFileSync(fullPath, "utf8");

  return {
    props: {
      content,
    },
  };
};

interface Props {
  content: string;
}

const Page: NextPage<Props> = ({ content }) => {
  return (
    <Default>
      <Stack mx="auto" maxWidth={960} mt={160}>
        <Markdown
          components={{
            h1: ({ children }) => (
              <Text as="h1" ff="Zen Old Mincho" fw={400} fz={32} lh="140%">
                {children}
              </Text>
            ),
            h2: ({ children }) => <Text as="h2">{children}</Text>,
            h3: ({ children }) => <Text as="h3">{children}</Text>,
            h4: ({ children }) => <Text as="h4">{children}</Text>,
            h5: ({ children }) => <Text as="h5">{children}</Text>,
            h6: ({ children }) => <Text as="h6">{children}</Text>,
            p: ({ children }) => <Text as="p">{children}</Text>,
          }}
        >
          {content}
        </Markdown>
      </Stack>
    </Default>
  );
};

export default Page;
