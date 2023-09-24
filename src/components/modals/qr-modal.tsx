import { component$ } from '@builder.io/qwik'
import QrIcon from '~/components/icons/qr-icon'

export default component$(() => {
  return (
    <div class='flex justify-center flex-col gap-4'>
      <div class='p-6 bg-[#181818] rounded-[28px] border border-threads-white/20'>
        <QrIcon classes='w-60 h-60' />
      </div>
      <span class='text-center font-bold text-threads-white'>Get the app</span>
    </div>
  )
})
