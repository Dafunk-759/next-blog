import Head from "next/head"

import { Layout } from "../../components/layout"
import { Date } from "../../components/date"
import { getAllPostIds, getPostData } from "../../lib/posts"
import utilStyles from "../../styles/utils.module.css"

type PostData = {
  title: string
  date: string
  contentHtml: string
}

type PostProp = {
  postData: PostData
}

export default function Post({ postData }: PostProp) {
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
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  )
}

// 确定动态路由的范围 如：/posts/ssg-ssr-ssr 会导向404 page，而不是Post page。
export async function getStaticPaths() {
  const paths = await getAllPostIds()

  return {
    paths,
    fallback: false
  }
}

type Params = {
  params: { id: string }
}

type StaticProps = {
  props: {
    postData: PostData
  }
}

export async function getStaticProps({ params }: Params): Promise<StaticProps> {
  const postData = await getPostData(params.id)

  return {
    props: {
      postData
    }
  }
}
