export default function LikeIcon({ classes }: { classes?: string }) {
  return (
    <svg
      class={classes}
      xmlns='http://www.w3.org/2000/svg'
      aria-label='Like'
      viewBox='0 0 24 22'
    >
      <path
        stroke='currentColor'
        stroke-width='2'
        d='M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z'
      />
    </svg>
  )
}
