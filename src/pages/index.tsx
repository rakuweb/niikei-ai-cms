import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Autorenew from 'public/svg/autorenew_FILL0_wght400_GRAD0_opsz48.svg';
import Description from 'public/svg/description_FILL0_wght400_GRAD0_opsz48.svg';
import Edit from 'public/svg/edit_note_FILL0_wght400_GRAD0_opsz48.svg';
import Expand1 from 'public/svg/expand_circle_down_FILL-1.svg';
import Expand0 from 'public/svg/expand_circle_down_FILL0_wght400_GRAD0_opsz48.svg';
import Pass from 'public/svg/pass48.svg';
import S from 'public/svg/S.svg';
import Settings from 'public/svg/settings_input_antenna_FILL0_wght400_GRAD0_opsz48.svg';
import Smart from 'public/svg/smart_toy_FILL0_wght400_GRAD0_opsz48.svg';
import { Box } from '@chakra-ui/react';
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <Box className={styles.description} bgColor={'#333'}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
          <Autorenew />
          <Description />
          <Edit />
          <Expand1 />
          <Expand0 />
          <Pass />
          <S />
          <Settings />
          <Smart />
        </Box>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image
              src="/dev/vercel.svg"
              alt="Vercel Logo"
              width={72}
              height={16}
            />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
