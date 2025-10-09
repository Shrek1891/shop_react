const Table = ({head, body}: { head: string[], body: any }) => {

    return (
        <table className="min-w-full border-collapse border border-gray-500">
            <thead className="bg-gray-200">
            <tr>
                {head.map((item, index) => (
                    <th key={index} className="border border-gray-300 px-4 py-2">{item}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {
                body.map((item: any, index: number) => (
                    <tr key={index}>
                        {Object.values(item).map((value: any, index: number) => (
                            <td key={index} className="border border-gray-300 px-4 py-2">{value}</td>
                        ))}
                    </tr>
                ))
            }


            </tbody>
        </table>
    )
}

export default Table;