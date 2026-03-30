export function TableWrap({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-5 overflow-x-auto rounded-xl border border-border">
      <table className="w-full border-collapse text-[.85rem]">
        <thead>
          <tr className="bg-bg-3">
            {headers.map((h, i) => (
              <th key={i} className="whitespace-nowrap border-b border-border px-4 py-3 text-left font-semibold text-text">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-4 py-3 text-text-2 ${ri < rows.length - 1 ? "border-b border-border" : ""}`}
                >
                  <span dangerouslySetInnerHTML={{ __html: cell }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
