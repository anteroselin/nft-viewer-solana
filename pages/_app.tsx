import '../styles/globals.css'
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Component {...pageProps} />
    </React.Fragment>
  )
}
