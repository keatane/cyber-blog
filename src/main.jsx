import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Blog from './Blog.jsx'
import BlogArticle from './BlogArticle.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/cyber-blog">
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/articles/:slug" element={<BlogArticle />} />
        <Route path="*" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)