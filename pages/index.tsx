import { NextPage } from 'next';
import Head from 'next/head'
import styles from '../styles/Home.module.scss';
import Image from 'next/image';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import Avatar from 'react-avatar';
import { IconEditor } from '../components/IconEditor';

const Home: NextPage = () => {
  const [icon, setIcon] = useState<File | null>(null);
  const [previewIcon, setPreviewIcon] = useState<File | null>(null);
  const iconInputRef = useRef<HTMLInputElement | null>(null);

  const handleClickChangeIcon = useCallback(() => {
    if (!iconInputRef || !iconInputRef.current) return;
    iconInputRef.current.click();
  }, []);

  const handleChangePreviewIcon = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return;
      setPreviewIcon(e.target.files[0]);
      e.currentTarget.value = '';
    },
    [],
  );

  const handleChangeIcon = useCallback(
    (nextIcon: File) => {
      setIcon(nextIcon);
    },
    [],
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.avatar}>
          <Avatar
            size='160'
            name="アイコン"
            round
            color="#ddd"
            alt="アイコン"
            src={icon ? URL.createObjectURL(icon) : ''}
          />
          {!icon ? (
            <>
              <button
                className={styles.avatarEdit}
                type="button"
                onClick={handleClickChangeIcon}
              >
                <Image
                  src="/imageEdit.svg"
                  width={40}
                  height={30}
                  alt="アイコン編集"
                />
              </button>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={iconInputRef}
                onChange={handleChangePreviewIcon}
              />
            </>
          ) : null}
        </div>
        <IconEditor
          previewIcon={previewIcon}
          onChangePreviewIcon={setPreviewIcon}
          onChangeIcon={handleChangeIcon}
        />
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export default Home