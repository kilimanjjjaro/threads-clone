/*
 * Qwik no longer needs a service worker for prefetching (setupServiceWorker is
 * now a no-op). The file stays so browsers that installed the previous worker
 * pick up this one; it can be removed with <ServiceWorkerRegister /> once all
 * users have updated.
 */

addEventListener('install', () => {
  void self.skipWaiting()
})

addEventListener('activate', () => {
  void self.clients.claim()
})

declare const self: ServiceWorkerGlobalScope

export {}
