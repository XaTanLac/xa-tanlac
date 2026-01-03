import { AuthorizedHeader, DOMAIN } from './constants'

fetch(`${DOMAIN}/api/loads`, {
  method: 'GET',
  headers: AuthorizedHeader,
})
  .then((res) => res.json())
  .then((data) => {
    if (!data || !data.css || !data.js) {
      console.error('Invalid data format:', data)
      return
    }
    data.css.forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = href
        document.head.appendChild(link)
      }
    })

    data.js.forEach((src) => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement('script')
        script.src = src
        script.type = 'module'
        document.head.appendChild(script)
      }
    })
  })
  .catch((err) => console.error('Failed to load assets:', err))
