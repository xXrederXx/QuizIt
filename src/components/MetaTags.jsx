import { useEffect } from 'react'

export default function MetaTags({ title, description, author }) {
  useEffect(() => {
    const existingTitle = document.title
    const existingMetaDescription = document.querySelector('meta[name="description"]')
    const existingMetaAuthor = document.querySelector('meta[name="author"]')

    if (title) {
      document.title = title
    }

    if (description) {
      if (existingMetaDescription) {
        existingMetaDescription.setAttribute('content', description)
      } else {
        const tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        tag.setAttribute('content', description)
        document.head.appendChild(tag)
      }
    }

    if (author) {
      if (existingMetaAuthor) {
        existingMetaAuthor.setAttribute('content', author)
      } else {
        const tag = document.createElement('meta')
        tag.setAttribute('name', 'author')
        tag.setAttribute('content', author)
        document.head.appendChild(tag)
      }
    }

    return () => {
      if (title) {
        document.title = existingTitle
      }
    }
  }, [title, description, author])

  return null
}
