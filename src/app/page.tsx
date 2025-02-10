import Head from "next/head";
import CodeEditorPortfolio from "../components/CodeEditorPortfolio";

export default function Home() {
  return (
    <>
      <Head>
        <title>Bhavika Salunkhe - Portfolio</title>
        <meta name="description" content="Full Stack Developer Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CodeEditorPortfolio />
      </main>
    </>
  );
}
