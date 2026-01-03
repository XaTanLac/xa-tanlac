// React core
import React from 'react'
import { createRoot } from 'react-dom/client'

// Tailwind stylesheet
import './css/tailwind.scss'

// ZaUI stylesheet
import 'zmp-ui/zaui.css'

// Your stylesheet
import './css/app.scss'

// Expose app configuration
import appConfig from '../app-config.json'

import { pdfjs } from 'react-pdf'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig
}

// @ts-expect-error This does not exist outside of polyfill which this is doing
if (typeof Promise.withResolvers === 'undefined') {
  if (window)
    // @ts-expect-error This does not exist outside of polyfill which this is doing
    window.Promise.withResolvers = function () {
      let resolve, reject
      const promise = new Promise((res, rej) => {
        resolve = res
        reject = rej
      })
      return { promise, resolve, reject }
    }
}

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`

// Mount the app
import App from './components/app'
const root = createRoot(document.getElementById('app')!)
root.render(React.createElement(App))
