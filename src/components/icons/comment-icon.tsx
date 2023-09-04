export default function CommentIcon({ classes }: { classes?: string }) {
  return (
    <svg
      class={classes}
      xmlns='http://www.w3.org/2000/svg'
      aria-label='Comment'
      viewBox='0 0 24 24'
    >
      <path
        fill='none'
        stroke='currentColor'
        stroke-linejoin='round'
        stroke-width='2'
        d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
      />
    </svg>
  )
}
