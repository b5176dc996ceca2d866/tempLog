import Head from "next/head";
import styles from "../styles/Home.module.css";
import Check from "../components/Check";

export default function Home() {
  return (
    <div>
      <div className={styles.container}>
        <Head>
          <title>DDOS Client Check</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Check />
        </main>
      </div>
    </div>
  );
}
