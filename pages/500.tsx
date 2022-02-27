import { Layout } from "../components/layout"
import utilStyles from "../styles/utils.module.css"

export default function Custom500() {
  return (
    <Layout>
      <h1 className={utilStyles.heading2Xl}>
        500 - Server-side error occurred
      </h1>
    </Layout>
  )
}
