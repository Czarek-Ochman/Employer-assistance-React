import React, {FunctionComponent, useState} from 'react';
import "./login.scss";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import api from "../../Api/ApiService";
import {useNavigate} from "react-router-dom";


type Props = {};

export const Login: FunctionComponent<Props> = (props: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e: any) {
        e.preventDefault();
        api.login(email, password).then(response => {
            if (response.status === 200) {
                navigate("/");
            }
        }).catch(err => {
            console.log(err.message)
        })
    }

    return (
        <div className="login-container">

            <div className="login-box">
                <form>
                    <div className="login-text"> Logowanie</div>
                    <div className="item">
                        <TextField id="outlined-basic" label="Email" variant="outlined"
                                   onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="item">
                        <TextField id="outlined-basic" label="Hasło" variant="outlined" type="password"
                                   onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <button type="button" onClick={(e) => handleSubmit(e)}>Zaloguj</button>
                    </div>
                </form>
                <Button href={"/rejestracja"}>Rejestracja</Button>
                <Button href={"/"}>Wstecz</Button>
            </div>
        </div>
    );
};