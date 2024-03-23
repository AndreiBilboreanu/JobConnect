"use client";
import Image from "next/image";
import { useTheme } from "src/providers/theming";
import { Card } from "@/components/Card";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

export default function Home() {
  const { setTheme } = useTheme();
  const t = useTranslations();
  const { locale } = useRouter();

  return (
    <main
      className={`bg-background light flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      <Card>
        <Card.Header>
          <Card.Title>{t("hello", { locale })} Bello</Card.Title>
        </Card.Header>
        <Card.Content>
          <Card.Description>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo minima
            hic cupiditate unde!
          </Card.Description>
        </Card.Content>
      </Card>
      <button onClick={() => setTheme("light")}>button</button>
      <button onClick={() => setTheme("dark")}>button</button>
    </main>
  );
}

export function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      messages: {
        ...require(`../messages/${locale}.json`),
      },
    },
  };
}
