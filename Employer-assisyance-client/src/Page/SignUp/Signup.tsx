import React, {FunctionComponent, useState} from 'react';
import "./signup.scss";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import {useNavigate} from "react-router-dom";
import api from "../../Api/ApiService";
import AlertPopup from "../../Component/AlertPopup";

type Props = {};

export const Signup: FunctionComponent<Props> = (props: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState(false);
    const [alert, setAlert] = useState(false);
    const navigate = useNavigate();

    const setStatusError = () => {
        console.log("1")
        setError(!alert);
    }

    const showAlert = () => {
        setAlert(!alert)
        navigate("/login");
    };

    async function handleSubmit(e: any) {
        e.preventDefault();
        if (password === repeatPassword) {
            api.signUp(email, password)
                .then(resp => {
                    if (resp.status === 200) {
                        setAlert(true)
                    }
                })
                .catch(err => {
                })
        } else {
            setError(true)
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-box">
                <form>
                    <div className="signup-text"> Rejestracja</div>
                    <div className="item">
                        <TextField id="outlined-basic" label="Email" variant="outlined"
                                   onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="item">
                        <TextField id="outlined-basic" label="Hasło" variant="outlined" type="password"
                                   onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="item">
                        <TextField id="outlined-basic" label="Powtórz Hasło" variant="outlined" type="password"
                                   onChange={(e) => setRepeatPassword(e.target.value)}/>
                    </div>
                    {error &&
                        <div className={"errors"}>
                            <Alert severity="error">Podane hasła są różne! <span className={"close-error"}
                                                                                 onClick={setStatusError}>x</span></Alert>
                        </div>}
                    <div>
                        <button onClick={(e) => handleSubmit(e)}>Zarejestruj</button>
                    </div>
                </form>
                <Button href={"/login"}>Logowanie</Button>
                <Button href={"/"}>Wstecz</Button>
            </div>
            {alert && <AlertPopup
                title={'Pomyślnie zarejestrowano!'}
                message={'Zaloguj się by korzystać z pełni możliwości serwisu.'}
                label={"Zaloguj się"}
                onClick={showAlert}/>}
        </div>
    );
};