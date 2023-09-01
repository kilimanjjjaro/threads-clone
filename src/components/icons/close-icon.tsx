export default function CloseIcon({ classes }: { classes?: string }) {
  return (
    <svg
      class={classes}
      xmlns='http://www.w3.org/2000/svg'
      aria-label='Close'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='M21 3 3 21M21 21 3 3'
      />
    </svg>
  )
}
