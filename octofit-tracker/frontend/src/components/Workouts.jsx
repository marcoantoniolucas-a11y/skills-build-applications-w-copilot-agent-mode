import CollectionTable from './CollectionTable.jsx'

const columns = [
  { key: 'name', label: 'Workout', render: (workout) => workout.name ?? '-' },
  { key: 'activityType', label: 'Activity', render: (workout) => workout.activityType ?? '-' },
  { key: 'difficulty', label: 'Difficulty', render: (workout) => workout.difficulty ?? '-' },
  {
    key: 'durationMinutes',
    label: 'Duration',
    render: (workout) =>
      workout.durationMinutes == null ? '-' : `${workout.durationMinutes} min`,
  },
  { key: 'target', label: 'Target', render: (workout) => workout.target ?? '-' },
  {
    key: 'description',
    label: 'Description',
    render: (workout) => workout.description ?? workout.tips?.join(', ') ?? '-',
  },
]

function Workouts() {
  return (
    <CollectionTable
      title="Workouts"
      description="Find personalized workout ideas for your next session."
      endpoint="/workouts/"
      columns={columns}
      emptyMessage="No workouts are available yet."
    />
  )
}

export default Workouts
