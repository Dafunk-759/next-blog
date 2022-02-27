import { Layout } from "../components/layout"
import utilStyles from "../styles/utils.module.css"

export default function Custom404() {
  return (
    <Layout>
      <h1 className={utilStyles.heading2Xl}>
        Page Not Found.
      </h1>
    </Layout>
  )
}
