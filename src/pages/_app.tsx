import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { GlobalStyle } from 'styles/global'
import { AuthProvider } from 'hooks/useAuth'
import styled from 'styled-components'
import { StyleConst } from 'styles/const'
import NProgress from 'nextjs-progressbar'
import { Header, Footer } from 'components/lv2'
import { DefaultSeo } from 'components/seo'

const AppContainer = styled.div`
  position: relative;
  padding: ${StyleConst.HEIGHT.HEADER}px 16px 32px;
  margin: 0 auto;
  max-width: ${StyleConst.WIDTH.CONTENT_MAX}px;
  min-height: 100vh;
`

const Provider = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0" />
      </Head>
      <DefaultSeo />

      <Header />

      <NProgress color={StyleConst.COLOR.PRIMARY} height="1" options={{ showSpinner: false }} />

      <GlobalStyle />

      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>

      <Footer />
    </Provider>
  )
}

export default App
