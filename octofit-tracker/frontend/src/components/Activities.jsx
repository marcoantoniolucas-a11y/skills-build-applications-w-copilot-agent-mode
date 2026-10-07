import CollectionTable from './CollectionTable.jsx'
import { displayReference, formatDate } from '../lib/formatters.js'

const columns = [
  { key: 'user', label: 'User', render: (activity) => displayReference(activity.user) },
  { key: 'activityType', label: 'Activity', render: (activity) => activity.activityType ?? '-' },
  {
    key: 'durationMinutes',
    label: 'Duration',
    render: (activity) =>
      activity.durationMinutes == null ? '-' : `${activity.durationMinutes} min`,
  },
  {
    key: 'distanceKm',
    label: 'Distance',
    render: (activity) => (activity.distanceKm == null ? '-' : `${activity.distanceKm} km`),
  },
  { key: 'points', label: 'Points', render: (activity) => activity.points ?? '-' },
  {
    key: 'completedAt',
    label: 'Completed',
    render: (activity) => formatDate(activity.completedAt),
  },
]

function Activities() {
  return (
    <CollectionTable
      title="Activities"
      description="Recent fitness activity logged by OctoFit members."
      endpoint="/activities/"
      columns={columns}
      emptyMessage="No activities have been recorded yet."
    />
  )
}

export default Activities
