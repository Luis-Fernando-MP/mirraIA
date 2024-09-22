type TTop5Colors = Array<[String, number]>
export function getTopCompatibleColors(colors: TTop5Colors) {
  const sortedColors = colors.toSorted((a, b) => b[1] - a[1])
  const top5Colors = sortedColors.slice(0, 5).map(arr => arr[0])
  return top5Colors.join()
}
