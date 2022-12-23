
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chip, Skeleton } from '@mui/material';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rowsDemo = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair AAAASDDDDDDDDDD', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];



interface Props {
    loading?: boolean;
    rows?: any[] | null;
    columns?: any[] | null;
}

function createCell(col: any, value: number | string) {
    if (col['type'] == 'date')
        return new Date(value).toLocaleDateString()
    else if (col['type'] == 'datetime')
        return new Date(value).toLocaleString()
    else if (col['type'] == 'chip' && typeof value === "string")
        return (
            <Chip label={value.toLowerCase()} color="primary" size="small" style={{ backgroundColor: col['colors'][value] }} />
        )
    else if (col['type'] == 'currency' && typeof value === "number")
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    else if (col['type'] == 'percent' && typeof value === "number")
        return (value * 100).toFixed(2) + "%"
    return value
}


function TableUI({ loading = false, rows, columns }: Props) {

    const NUM_COLUMNS = 10

    const columnsLoading = []
    for (var i = 0; i < NUM_COLUMNS; i++)
        columnsLoading.push(<TableCell><Skeleton width={100} /></TableCell>)

    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {columns?.map((col) =>
                            <TableCell align="right" variant="head">
                                {col['label']}
                            </TableCell>
                        )
                        }

                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading || !rows ? [<TableRow>{columnsLoading}</TableRow>, <TableRow>{columnsLoading}</TableRow>, <TableRow>{columnsLoading}</TableRow>, <TableRow>{columnsLoading}</TableRow>]
                        :
                        rows.map((row) => (
                            <TableRow
                                // key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                {
                                    columns?.map((col) =>
                                        <TableCell align="right">
                                            {createCell(col, row[col['field']])}
                                        </TableCell>
                                    )
                                }

                                {/*                                 
                                <TableCell align="right">{row['qtd']}</TableCell>
                                <TableCell align="right">{row['type']}</TableCell> */}
                                {/* // <TableCell component="th" scope="row">
                                //     {row.name}
                                // </TableCell>
                                // <TableCell align="right">{row.calories}</TableCell>
                                // <TableCell align="right">{row.fat}</TableCell>
                                // <TableCell align="right">{row.carbs}</TableCell>
                                // <TableCell align="right">{row.protein}</TableCell> */}
                            </TableRow>
                        ))

                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableUI