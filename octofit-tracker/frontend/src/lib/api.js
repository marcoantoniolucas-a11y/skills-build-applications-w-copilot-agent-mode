const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function findCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return null
  }

  for (const key of ['results', 'items', 'data']) {
    const collection = findCollection(payload[key])
    if (collection) {
      return collection
    }
  }

  return null
}

export function getCollection(payload) {
  const collection = findCollection(payload)
  if (!collection) {
    throw new Error('The API response did not contain a list of records.')
  }

  return collection
}
