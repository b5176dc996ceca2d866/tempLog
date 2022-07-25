import Head from "next/head";
import styles from "../styles/Home.module.css";
import Check from "../components/Check";
import React from "react";

export default function Home() {
  return (
    <div>
      <div className={styles.container}>
        <Head>
          <title>DDOS Client Check</title>
          <meta name="description" content="/ddos.jpg/" />
          <link rel="icon" href="/favicon.ico" />

          <meta name="title" content="DDOS Client Check" />
          <meta
            name="description"
            content="Client will redirect after DDoS threat evaluation is done. "
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://temp-log.vercel.app/" />
          <meta property="og:title" content="DDOS Client Check" />
          <meta
            property="og:description"
            content="Client will redirect after DDoS threat evaluation is done. "
          />
          <meta property="og:image" content="/ddos.jpg/" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://temp-log.vercel.app/" />
          <meta property="twitter:title" content="DDOS Client Check" />
          <meta
            property="twitter:description"
            content="Client will redirect after DDoS threat evaluation is done. "
          />
          <meta property="twitter:image" content="/ddos.jpg/" />
        </Head>

        <main className={styles.main}>
          <Check />
        </main>
      </div>
    </div>
  );
}
