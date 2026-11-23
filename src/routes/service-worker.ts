addEventListener('install', () => {
  void self.skipWaiting()
})

addEventListener('activate', () => {
  void self.clients.claim()
})

declare const self: ServiceWorkerGlobalScope

export {}
