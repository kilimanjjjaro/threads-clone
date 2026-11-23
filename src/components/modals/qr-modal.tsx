import { component$ } from '@builder.io/qwik'
import QrIcon from '~/components/icons/qr-icon'

export default component$(() => {
  return (
    <div class='flex flex-col justify-center gap-4'>
      <div class='rounded-[28px] border border-threads-white/20 bg-[#181818] p-6'>
        <QrIcon classes='w-60 h-60' />
      </div>
      <span class='text-center font-bold text-threads-white'>Get the app</span>
    </div>
  )
})
