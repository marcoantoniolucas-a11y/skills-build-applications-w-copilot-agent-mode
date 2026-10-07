export function displayReference(value) {
  if (!value) {
    return '-'
  }

  if (typeof value === 'object') {
    return value.name ?? value.username ?? value._id ?? value.id ?? '-'
  }

  return value
}

export function formatDate(value) {
  if (!value) {
    return '-'
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleDateString()
}
