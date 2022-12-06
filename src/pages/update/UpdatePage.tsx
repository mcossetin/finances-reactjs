import { Alert, AlertTitle, Box, Button, Grid, TextField, Typography } from "@mui/material"
import { Container } from "@mui/system"
import React from "react"
import { useState } from "react"
import TableUI from "../../components/Table"
import api from "../../services/Api"


function TokenStep(props: any) {

    const [token, setToken] = useState("")

    return <React.Fragment>
        <Grid item>
            <TextField
                id="outlined-textarea"
                label="Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                multiline
                maxRows={4}
                minRows={4}
                sx={{ width: '50ch' }}
            />
        </Grid>
        <Grid item>
            <Button variant="contained" onClick={(e) => props.handleUpdate(token)}>Atualizar</Button>
        </Grid>
    </React.Fragment>
}


function UpdatingStep() {
    return <div style={{ width: '100%', height: '100%', position: 'relative' }}><img src="https://i.giphy.com/media/WRQBXSCnEFJIuxktnw/giphy.webp" width="100%" height="100%" style={{ position: "absolute" }} ></img></div>
}


function ErrorStep(props: any) {
    return <React.Fragment>
        <Grid item>
            <Alert severity="error">
                <AlertTitle><strong>{props.message}</strong></AlertTitle>
                {props.details}
            </Alert>
        </Grid>
        <Grid item>
            <Button variant="contained" onClick={(e) => props.handleExit()}>Continuar</Button>
        </Grid>
    </React.Fragment>
}


function SuccessStep(props: any) {

    return <React.Fragment>
        <Grid item>
            <Typography variant="h6">Deu tudo certo!!!</Typography>
        </Grid>
        <Grid item>
            <Typography variant="subtitle1">Removidos</Typography>
        </Grid>
        <Grid item>
            <TableUI rows={props.data['removed']['rows']} columns={props.data['removed']['columns']} />
        </Grid>
        <Grid item>
            <Typography variant="subtitle1">Inseridos</Typography>
        </Grid>
        <Grid item>
            <TableUI rows={props.data['news']['rows']} columns={props.data['news']['columns']} />
        </Grid>
        <Grid item>
            <Button variant="contained" onClick={(e) => props.handleExit()}>Continuar</Button>
        </Grid>
    </React.Fragment>
}

function UpdatePage() {

    const [step, setStep] = useState('token')
    const [error, setError] = useState<{ message: null | string, details: null | string }>({ message: null, details: null })
    const [result, setResult] = useState({ removed: [], news: [] })

    function update(token: string) {
        api.post('extrato/update/nubank', { token: token })
            .then((res) => { setResult(res.data); setStep('success') })
            .catch((err) => {
                console.log(err)
                setError({
                    message: err.message,
                    details: err.stack
                });
                setStep('error')
            })
    }

    function start(token: string) {
        setStep('updating')
        update(token)
    }

    function goToken() {
        setStep('token')
    }

    function getStepComponent() {
        switch (step) {
            case 'token': return <TokenStep handleUpdate={start} />
            case 'updating': return <UpdatingStep />
            case 'success': return <SuccessStep handleExit={goToken} data={result} />
            default: return <ErrorStep
                message={error['message']}
                details={error['details']}
                handleExit={goToken} />
        }
    }


    return <Container >
        <Grid spacing={2}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: '100vh' }}
        >
            {getStepComponent()}
        </Grid>

    </Container>
}

export default UpdatePage