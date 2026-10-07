import CollectionTable from './CollectionTable.jsx'
import { displayReference } from '../lib/formatters.js'

const columns = [
  { key: 'rank', label: 'Rank', render: (entry) => entry.rank ?? '-' },
  { key: 'user', label: 'User', render: (entry) => displayReference(entry.user) },
  { key: 'team', label: 'Team', render: (entry) => displayReference(entry.team) },
  { key: 'period', label: 'Period', render: (entry) => entry.period ?? '-' },
  { key: 'points', label: 'Points', render: (entry) => entry.points ?? '-' },
]

function Leaderboard() {
  return (
    <CollectionTable
      title="Leaderboard"
      description="See how members and teams are performing."
      endpoint="/leaderboard/"
      columns={columns}
      emptyMessage="The leaderboard is empty right now."
    />
  )
}

export default Leaderboard
