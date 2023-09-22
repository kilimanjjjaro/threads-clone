import { component$ } from '@builder.io/qwik'
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister
} from '@builder.io/qwik-city'
import { RouterHead } from '~/components/router-head'

import './global.css'

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet='utf-8' />
        <link rel='manifest' href='/manifest.json' />
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body class='bg-threads-black antialiased compatible-screen-min-height compatible-screen-height flex flex-col'>
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  )
})
