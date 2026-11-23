const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/gv, (character) => HTML_ESCAPES[character])
}

export default function formatLinks(text: string) {
  return escapeHtml(text).replace(
    /@(?<username>\w+)/gv,
    '<a href="/@$<username>">@$<username></a>'
  )
}
