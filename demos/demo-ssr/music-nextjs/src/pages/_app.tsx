import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Result } from 'antd-mobile'

function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.error) {
    return (
      <Result
        status="error"
        title="无法完成操作"
        description={pageProps.error}
      />
    )
  }
  return <Component {...pageProps} />
}

export default MyApp
