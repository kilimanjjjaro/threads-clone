const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}

// Bios and captions come from other users and are rendered as html, so
// escape them before adding the mention links.
function escapeHtml(text: string) {
  return text.replace(/[&<>"']/gv, (character) => HTML_ESCAPES[character])
}

export default function formatLinks(text: string) {
  return escapeHtml(text).replace(
    /@(?<username>\w+)/gv,
    '<a href="/@$<username>">@$<username></a>'
  )
}
