export function SplitTags(tags: string) {
  return tags.split(",").map((tag) => tag.trim());
}
