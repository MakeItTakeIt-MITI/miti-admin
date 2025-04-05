type TableProps = {
  headers: string[];
  data: (string | number)[][];
};

export const TableLayout = ({ headers, data }: TableProps) => {
  return (
    <table className="border-collapse border border-gray-300 w-full text-left">
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th
              key={i}
              className="border border-gray-300 px-2 py-1 bg-gray-100"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, ri) => (
          <tr key={ri}>
            {row.map((cell, ci) => (
              <td key={ci} className="border border-gray-300 px-2 py-1">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
