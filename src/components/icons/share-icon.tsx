export default function ShareIcon({ classes }: { classes?: string }) {
  return (
    <svg
      class={classes}
      xmlns='http://www.w3.org/2000/svg'
      aria-label='Share'
      viewBox='0 0 24 24'
    >
      <path
        fill='none'
        stroke='currentColor'
        stroke-linejoin='round'
        stroke-width='2'
        d='M22 3 9.218 10.083M11.698 20.334 22 3.001H2l7.218 7.083 2.48 10.25z'
      />
    </svg>
  )
}
