import { useEffect, useRef, useState } from 'react'

export function useFlexGhosts<T extends HTMLElement>(
  itemsCount: number,
  classNameItem: string,
): [React.RefObject<T>, number[]] {
  const containerRef = useRef<T>(null)
  const [ghosts, setGhosts] = useState<number[]>([])

  useEffect(() => {
    const adjustGhosts = (): void => {
      const container = containerRef.current
      if (!container) return

      const items = Array.from(container.querySelectorAll(`.${classNameItem}`)) as HTMLElement[]
      if (items.length === 0) return

      // Group items by line using offsetTop
      const rows: HTMLElement[][] = []
      items.forEach((item) => {
        const top = item.offsetTop
        let row = rows.find((r) => r.length && r[0].offsetTop === top)
        if (!row) {
          row = []
          rows.push(row)
        }
        row.push(item)
      })

      const maxRowCount = Math.max(...rows.map((r) => r.length))
      const lastRow = rows[rows.length - 1]
      const ghostCount = maxRowCount - lastRow.length

      setGhosts(Array.from({ length: ghostCount }, (_, i) => i))
    }

    adjustGhosts()
    window.addEventListener('resize', adjustGhosts)

    return () => {
      window.removeEventListener('resize', adjustGhosts)
    }
  }, [itemsCount])

  return [containerRef, ghosts]
}
