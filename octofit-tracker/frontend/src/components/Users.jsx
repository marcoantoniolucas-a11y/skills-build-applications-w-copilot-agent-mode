import CollectionTable from './CollectionTable.jsx'
import { displayReference } from '../lib/formatters.js'

const columns = [
  { key: 'name', label: 'Name', render: (user) => user.name ?? '-' },
  { key: 'username', label: 'Username', render: (user) => user.username ?? '-' },
  { key: 'email', label: 'Email', render: (user) => user.email ?? '-' },
  { key: 'age', label: 'Age', render: (user) => user.age ?? '-' },
  { key: 'team', label: 'Team', render: (user) => displayReference(user.team) },
]

function Users() {
  return (
    <CollectionTable
      title="Users"
      description="Browse OctoFit member profiles."
      endpoint="/users/"
      columns={columns}
      emptyMessage="No users have registered yet."
    />
  )
}

export default Users
