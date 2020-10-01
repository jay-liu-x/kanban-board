import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Typography } from 'antd';

const { Title } = Typography;

export default function Home() {
  return (
    <div className={styles.app_container}>
      <Head>
        <title>Trello Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Title level={1}>
          Clone of {' '}
          <a
            href="https://www.xiaohuiliu.me/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Trello
          </a>
        </Title>

        <Title className={styles.description} level={4}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </Title>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.xiaohuiliu.me/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developed by Xiaohui(Jay) Liu
        </a>
      </footer>
    </div>
  );
}
