import { Layout } from "../../components/layout"
import { Date } from "../../components/date"
import { getAllPostIds, getPostData } from "../../lib/posts"
import Head from "next/head"
import utilStyles from "../../styles/utils.module.css"

export default function Post({ postData }) {
  const { title, date, contentHtml } = postData

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml ?? "" }} />
      </article>
    </Layout>
  )
}

// 确定动态路由的范围 如：/posts/ssg-ssr-ssr 会导向404 page，而不是Post page。
export async function getStaticPaths() {
  const paths = await getAllPostIds().catch(_ => ({}))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id).catch(_ => ({}))

  return {
    props: {
      postData
    }
  }
}
