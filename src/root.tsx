import { component$ } from '@builder.io/qwik'
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister
} from '@builder.io/qwik-city'
import { RouterHead } from '~/components/router-head'

import './global.css'

export default component$(() => (
  <QwikCityProvider>
    <head>
      <meta charset='utf-8' />
      <link rel='manifest' href='/manifest.json' />
      <RouterHead />
      <ServiceWorkerRegister />
    </head>
    <body class='compatible-screen-min-height compatible-screen-height flex flex-col bg-threads-black antialiased'>
      <RouterOutlet />
    </body>
  </QwikCityProvider>
))
