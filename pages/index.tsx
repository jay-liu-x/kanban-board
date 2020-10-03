import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { Typography } from 'antd';
import { authorName, githubUrl, personalSite } from '../constants/homePage';
import Board from '../components/Board';

const { Title } = Typography;

const Home = () => (
  <div className={styles.app_container}>
    <Head>
      <title>Trello Clone</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <Title level={1}>
        Clone of{' '}
        <a href={personalSite} target="_blank" rel="noopener noreferrer">
          Trello 🧑🏻‍💻
        </a>
      </Title>

      <Title className={styles.description} level={4}>
        View this project on{' '}
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          <code className={styles.code}>Github</code>
        </a>
      </Title>

      <Board />
    </main>

    <footer className={styles.footer}>
      <a
        href="https://www.xiaohuiliu.me/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Developed by {authorName}
      </a>
    </footer>
  </div>
);
export default Home;
