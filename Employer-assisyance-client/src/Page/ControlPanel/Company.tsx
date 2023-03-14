import React, {FunctionComponent, useEffect, useState} from 'react';
import "./company.scss";
import {TextField} from "@mui/material";
import api from "../../Api/ApiService";


type Props = {};
export const Company: FunctionComponent<Props> = (props: Props) => {
    const [showError, setShowError] = useState(false);
    const [isCompany, setIsCompany] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [state, setState] = useState('');
    const [employeeListSize, setEmployeeListSize] = useState(0);

    if (isCompany) {
        api.getCompany().then(res => {
            setCompanyName(res.data.name)
            setStreet(res.data.address.street)
            setCity(res.data.address.city)
            setZipCode(res.data.address.zipCode)
            setState(res.data.address.state)
            api.getAllEmployees().then(res => {
                setEmployeeListSize(res.data.length)
            })
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (companyName == '' || city == '' || state == '' || street == '' || zipCode == '') {
            setShowError(true);
        } else {
            api.addCompany(companyName, city, state, street, zipCode).then(response => {
                if (response.status === 200) {
                    window.location.reload();
                }
            }).catch(err => {
                console.log(err.message)
            })
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            const result = await api.isCompany();
            setIsCompany(result);
        }
        fetchData();
    }, []);

    return (
        <div className={"company"}>
            {!isCompany && <div>
                <div>
                    <div className={"company-text"}>
                        Nie posiadasz żadnej firmy - stwórz ją!
                    </div>
                    <form>
                        <div className={"input-style"}><TextField id="standard-basic" label="Nazwa firmy"
                                                                  variant="outlined"
                                                                  onChange={(e) => setCompanyName(e.target.value)}
                                                                  required/></div>
                        <div className={"input-style"}><TextField id="standard-basic" label="Państwo"
                                                                  variant="outlined"
                                                                  onChange={(e) => setState(e.target.value)} required/>
                        </div>
                        <div className={"input-style"}><TextField id="standard-basic" label="Miasto"
                                                                  variant="outlined"
                                                                  onChange={(e) => setCity(e.target.value)} required/>
                        </div>
                        <div className={"input-style"}><TextField id="standard-basic" label="Ulica" variant="outlined"
                                                                  onChange={(e) => setStreet(e.target.value)} required/>
                        </div>
                        <div className={"input-style"}><TextField id="standard-basic" label="Kod pocztowy"
                                                                  variant="outlined"
                                                                  onChange={(e) => setZipCode(e.target.value)}
                                                                  required/></div>
                        {showError && <div className="error-company">Wszystki pola muszą być uzupełnione!</div>}
                        <button type="button" onClick={(e) => handleSubmit(e)}>Dodaj</button>
                    </form>
                </div>
            </div>}
            {isCompany && <div>
                <div>
                    <div className={"company-text"}>
                        Twoja firma: {companyName}</div>
                    <form>
                        <div className={"input-style"}><TextField id="standard-basic" value={"Nazwa: " + companyName}
                                                                  disabled={true} variant="outlined"/></div>
                        <div className={"input-style"}><TextField id="standard-basic" value={"Państwo: " + state}
                                                                  disabled={true}
                                                                  variant="outlined"/></div>
                        <div className={"input-style"}><TextField id="standard-basic" value={"Miasto: " + city}
                                                                  disabled={true}
                                                                  variant="outlined"/></div>
                        <div className={"input-style"}><TextField id="standard-basic" value={"Ulica: " + street}
                                                                  disabled={true}
                                                                  variant="outlined"/></div>
                        <div className={"input-style"}><TextField id="standard-basic" value={"Kod pocztowy: " + zipCode}
                                                                  disabled={true}
                                                                  variant="outlined"/></div>
                        <div className={"input-style"}><TextField id="standard-basic"
                                                                  value={"Ilość pracowników: " + employeeListSize}
                                                                  disabled={true}
                                                                  variant="outlined"/></div>
                    </form>
                </div>
            </div>}
        </div>
    );
};