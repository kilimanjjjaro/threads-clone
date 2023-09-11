export default function BunIcon({ classes }: { classes?: string }) {
  return (
    <svg
      class={classes}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 16 26'
      width='16'
      height='26'
      fill='none'
      stroke='currentColor'
    >
      <path
        stroke-linecap='round'
        stroke-width='2'
        d='M15 15C15 1 1 1 1 8.128 1 15.255 15 15.95 15 1'
      />
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='M15 15v10'
      />
    </svg>
  )
}
