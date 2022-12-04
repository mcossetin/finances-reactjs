import { Alert, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TableUI from "../../components/Table";
import api from "../../services/Api";


function StatementPage() {

    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        api.post('extrato/list')
            .then(res => setData(res.data))
            .catch(err => setError(err.stack))
            .finally(() => setLoading(false))
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item >
                <Typography variant="h5" gutterBottom>EXTRATO</Typography>

                {error
                    ? <Alert severity="error">{error}</Alert>
                    : [<Button> Atualizar</Button>, 
                    <TableUI loading={isLoading} rows={ data ? data['records'] : [] } columns={data ? data['columns'] : []}/>]
                }

            </Grid>
        </Grid>
    )
}

export default StatementPage