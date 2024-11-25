export function ToTitle(title: string): string {
  return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
}

export function ReplaceHyphenWithSpace(input: string): string {
  return input.replace(/-/g, ' ');
}