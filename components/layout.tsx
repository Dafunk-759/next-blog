import type { ReactNode } from "react"

import Head from "next/head"
import Image from "next/image"
import styles from "./layout.module.css"
import utilStyles from "../styles/utils.module.css"
import Link from "next/link"

const name = "JQ"
export const siteTitle = "Blog"

export type LayoutProps = {
  children: ReactNode
  home?: boolean
}

export function Layout({ children, home }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Head>
        <Favicon />
        <Metas />
      </Head>
      <Header home={home} />
      <main>{children}</main>
      {home ? undefined : (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}

function Favicon() {
  const pre = (path: string) => "/favicon" + path

  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={pre("/apple-touch-icon.png")}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={pre("/favicon-32x32.png")}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={pre("/favicon-16x16.png")}
      />
      <link rel="manifest" href={pre("/site.webmanifest")} />
    </>
  )
}

function Metas() {
  return (
    <>
      <meta name="description" content="A blog about javascript." />
      <meta
        property="og:image"
        content={`https://og-image.vercel.app/${encodeURI(
          siteTitle
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  )
}

type HeaderProps = {
  home?: boolean
}

function Header({ home }: HeaderProps) {
  const avator = (
    <>
      <Image
        priority
        src="/images/profile.jpg"
        className={utilStyles.borderCircle}
        height={144}
        width={144}
        alt={name}
      />
      <h1 className={utilStyles.heading2Xl}>{name}</h1>
    </>
  )

  const links = (
    <>
      <Link href="/">
        <a>
          <Image
            priority
            src="/images/profile.jpg"
            className={utilStyles.borderCircle}
            height={108}
            width={108}
            alt={name}
          />
        </a>
      </Link>
      <h2 className={utilStyles.headingLg}>
        <Link href="/">
          <a className={utilStyles.colorInherit}>{name}</a>
        </Link>
      </h2>
    </>
  )

  return <header className={styles.header}>{home ? avator : links}</header>
}
