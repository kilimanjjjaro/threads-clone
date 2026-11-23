import { component$ } from '@builder.io/qwik'
import { QwikCityProvider, RouterOutlet } from '@builder.io/qwik-city'
import { RouterHead } from '~/components/router-head'

import './global.css'

export default component$(() => (
  <QwikCityProvider>
    <head>
      <meta charset='utf-8' />
      <link rel='manifest' href='/manifest.json' />
      <RouterHead />
    </head>
    <body class='flex compatible-screen-height compatible-screen-min-height flex-col bg-threads-black antialiased'>
      <RouterOutlet />
    </body>
  </QwikCityProvider>
))
