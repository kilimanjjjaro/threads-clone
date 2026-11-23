addEventListener('install', () => {
  void self.skipWaiting()
})

addEventListener('activate', () => {
  void self.registration.unregister()
})

declare const self: ServiceWorkerGlobalScope

export {}
