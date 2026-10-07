import CollectionTable from './CollectionTable.jsx'

const columns = [
  { key: 'name', label: 'Team', render: (team) => team.name ?? '-' },
  { key: 'description', label: 'Description', render: (team) => team.description ?? '-' },
  {
    key: 'members',
    label: 'Members',
    render: (team) => (Array.isArray(team.members) ? team.members.length : '-'),
  },
  { key: 'points', label: 'Points', render: (team) => team.points ?? '-' },
]

function Teams() {
  return (
    <CollectionTable
      title="Teams"
      description="Explore the teams competing in OctoFit."
      endpoint="/teams/"
      columns={columns}
      emptyMessage="No teams have been created yet."
    />
  )
}

export default Teams
