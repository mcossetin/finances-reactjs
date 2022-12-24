import { Alert, Button, Grid, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import TableUI from "../../components/Table"
import api from "../../services/Api"



function Position() {

  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)


  useEffect(() => {
    api.get('posicao/list')
      .then(res => setData(res.data.data))
      .catch(err => setError(err.stack))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Fragment>
        <Typography variant="h5" gutterBottom>POSICAO</Typography>

        {error
          ? <Alert severity="error">{error}</Alert>
          : [ <TableUI loading={isLoading} rows={data ? data['rows'] : []} columns={data ? data['columns'] : []} />]
        }

    </Fragment>
  )
}

export default Position