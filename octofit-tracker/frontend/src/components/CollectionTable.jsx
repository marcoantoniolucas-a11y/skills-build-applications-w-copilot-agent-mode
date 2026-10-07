import useApiCollection from '../hooks/useApiCollection.js'

function CollectionTable({ title, description, endpoint, columns, emptyMessage }) {
  const { records, isLoading, error } = useApiCollection(endpoint)

  return (
    <section>
      <div className="mb-4">
        <h1 className="h2 mb-1">{title}</h1>
        <p className="text-secondary">{description}</p>
      </div>

      {isLoading && (
        <div className="alert alert-info" role="status">
          Loading {title.toLowerCase()}...
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!isLoading && !error && records.length === 0 && (
        <div className="alert alert-secondary" role="status">
          {emptyMessage}
        </div>
      )}

      {!isLoading && !error && records.length > 0 && (
        <div className="table-responsive bg-white rounded shadow-sm">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-success">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} scope="col">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id ?? record.id ?? index}>
                  {columns.map((column) => (
                    <td key={column.key}>{column.render(record)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default CollectionTable
