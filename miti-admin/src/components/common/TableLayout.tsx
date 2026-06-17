type TableProps = {
  headers: string[];
  data: (string | number)[][];
  context: string;
};

export const TableLayout = ({ headers, data, context }: TableProps) => {
  return (
    <table className=" table-fixed w-full border-collapse ">
      <thead>
        <tr className="bg-white h-[72px] ">
          {headers.map((header, i) => (
            <th key={i} className="text-center px-2">
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={headers.length}
              className="text-center py-10 text-gray-800 font-bold"
            >
              {context}
            </td>
          </tr>
        ) : (
          data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="bg-white h-[72px] hover:bg-gray-100 text-sm"
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="text-center px-2 truncate">
                  {cell}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
