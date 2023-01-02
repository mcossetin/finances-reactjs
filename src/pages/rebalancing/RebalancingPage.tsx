
import { Fragment, useEffect, useState } from 'react';
import TableUI from '../../components/Table';
import api from '../../services/Api';
import { Alert, Typography } from '@mui/material';


function RebalancingPage() {

    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        api.get('rebalancing/calculate')
            .then(res => setData(res.data.data))
            .catch(err => setError(err.stack))
            .finally(() => setLoading(false))
    }, [])

    return (
        <Fragment>
            <Typography variant="h5" gutterBottom>REBALANCEAMENTO</Typography>
            {error
                ? <Alert severity="error">{error}</Alert>
                : <TableUI loading={isLoading} rows={data ? data['rows'] : []} columns={data ? data['columns'] : []} />
            }
        </Fragment>
    )
}

export default RebalancingPage