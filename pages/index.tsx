import useSWR from 'swr';
import {
  authorName,
  githubUrl,
  personalSite,
  kanbanWikiUrl,
} from '../utils/constants';
import Board from '../components/board/board';
import { Typography, Spin, Space } from 'antd';
import { GithubFilled, RadarChartOutlined } from '@ant-design/icons';
import Head from 'next/head';
import {queryGetColumns} from '../utils/queries';

import styles from '../styles/home.module.scss';

const { Title } = Typography;

const fetcher = (query) =>
  fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

const Home = () => {
  const { data, error } = useSWR(queryGetColumns, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <Space size="middle">
        <Spin size="large" />
      </Space>
    );

  const { columns } = data;

  return (
    <div className={styles.app_container}>
      <Head>
        <title>Kanban Board</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Title level={1} style={{ color: 'white' }}>
          <RadarChartOutlined spin /> Inspired by{' '}
          <a href={kanbanWikiUrl} target="_blank" rel="noopener noreferrer">
            Kanban 🧑🏻‍💻{' '}
          </a>
          <RadarChartOutlined spin />
        </Title>

        <Title
          className={styles.description}
          level={4}
          style={{ color: 'white' }}
        >
          View this project on{' '}
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <code className={styles.code}>
              <GithubFilled /> Github
            </code>
          </a>
        </Title>

        <Board columns={columns} />
      </main>

      <footer className={styles.footer}>
        <a href={personalSite} target="_blank" rel="noopener noreferrer">
          Developed by {authorName} 🦸🏻‍♂️
        </a>
      </footer>
    </div>
  );
};

export default Home;
