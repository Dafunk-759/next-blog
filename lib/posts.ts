import * as fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const postsDirectory = path.join(process.cwd(), "posts")

export async function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = await fs.readdir(postsDirectory)
  const allPostsDataPromises = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "")
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)

    return fs.readFile(fullPath, "utf8").then(fileContents => {
      // Use gray-matter to parse the post metadata section
      const { data } = matter(fileContents)

      // Combine the data with the id
      return {
        id,
        ...(data as { date: string; title: string })
      }
    })
  })

  const allPostsData = await Promise.all(allPostsDataPromises)

  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export async function getAllPostIds() {
  const fileNames = await fs.readdir(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, "")
      }
    }
  })
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = await fs.readFile(fullPath, "utf8")

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...(matterResult.data as { title: string; date: string })
  }
}
