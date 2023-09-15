export default function formatLinks(text: string) {
  return text.replace(/@(\w+)/g, '<a href="/@$1">@$1</a>')
}
