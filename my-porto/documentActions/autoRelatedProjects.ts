import {useDocumentOperation, useEditState} from 'sanity'
import {useEffect, useState} from 'react'
import {useClient} from 'sanity'

export const AutoRelatedProjects = (props) => {
  const {id, type, onComplete} = props
  const {patch, publish} = useDocumentOperation(id, type)
  const {draft, published} = useEditState(id, type)
  const client = useClient({apiVersion: '2021-06-07'})
  const [isPublishing, setIsPublishing] = useState(false)

  useEffect(() => {
    if (isPublishing && !draft) {
      setIsPublishing(false)
    }
  }, [isPublishing, draft])

  return {
    label: 'Publish & Auto-relate',
    disabled: isPublishing || publish.disabled,
    onHandle: async () => {
      setIsPublishing(true)

      const project = draft || published

      if (!project) {
        publish.execute()
        onComplete()
        return
      }

      const {tags, category, _id} = project

      const query = `*[_type == "project" && _id != $_id && (category == $category || count(tags[@ in $tags]) > 0)][0...5]`
      const params = {
        _id,
        category,
        tags: tags || [],
      }

      const relatedProjects = await client.fetch(query, params)
      const relatedProjectIds = relatedProjects.map((p) => ({
        _type: 'reference',
        _ref: p._id,
      }))

      patch.execute([{set: {relatedProjects: relatedProjectIds}}])
      publish.execute()
      onComplete()
    },
  }
}
