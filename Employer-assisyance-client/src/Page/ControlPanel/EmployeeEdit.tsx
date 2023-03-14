import React, {FunctionComponent, useEffect, useState} from 'react';
import "./employee-modal.scss";
import ReactModal from "react-modal";
import {FormControlLabel, FormGroup, Switch, TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import api from "../../Api/ApiService";

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    firstNameEmployee: string,
    lastNameEmployee: string,
    departmentEmployee: string,
    salaryEmployee: string,
    idEmployee: any,
    illEmployee: boolean,
    onVacationEmployee: boolean
    streetEmployee: string,
    cityEmployee: string,
    zipCodeEmployee: string,
    stateEmployee: string,
    ageEmployee: string,
    sickDaysEmployee: string,
    vacationDaysEmployee: string
    companyIdEmployee: string
    handleButtonClick: () => void;
}

export const EmployeeEdit: FunctionComponent<Props> = ({
                                                           isOpen,
                                                           setIsOpen,
                                                           firstNameEmployee,
                                                           lastNameEmployee,
                                                           departmentEmployee,
                                                           salaryEmployee,
                                                           idEmployee,
                                                           illEmployee,
                                                           onVacationEmployee,
                                                           streetEmployee,
                                                           cityEmployee,
                                                           zipCodeEmployee,
                                                           stateEmployee,
                                                           ageEmployee,
                                                           sickDaysEmployee,
                                                           vacationDaysEmployee,
                                                           companyIdEmployee,
                                                           handleButtonClick
                                                       }) => {
    const [age, setAge] = React.useState(ageEmployee || '');
    const [street, setStreet] = useState(streetEmployee || '');
    const [city, setCity] = useState(cityEmployee || '');
    const [zipCode, setZipCode] = useState(zipCodeEmployee || '');
    const [state, setState] = useState(stateEmployee || '');
    const [department, setDepartment] = React.useState(departmentEmployee || '');
    const [salary, setSalary] = React.useState(salaryEmployee || '');
    const [firstName, setFirstName] = React.useState(firstNameEmployee || '');
    const [lastName, setLastName] = React.useState(lastNameEmployee || '');
    const [isIll, setIsIll] = useState(illEmployee || false);
    const [isOnVacation, setIsOnVacation] = useState(onVacationEmployee || false);
    const [sickDays, setSickDays] = React.useState(sickDaysEmployee || '');
    const [vacationDays, setVacationDays] = React.useState(vacationDaysEmployee || '');
    const [id, setId] = React.useState(idEmployee || '');
    const [companyId, setCompanyId] = React.useState(companyIdEmployee || '');

    const goBack = () => {
        setIsOpen(false)
    }

    const editCompany = (e: any) => {
        e.preventDefault();
        api.editEmployee(id, city, state, street, zipCode, department, age, firstName, lastName, salary, isIll, isOnVacation, sickDays, vacationDays, companyId).then(response => {
            if (response.status === 200) {
                setIsOpen(false)
                handleButtonClick();
            }
        }).catch(err => {
            console.log(err.message)
        })
    }

    React.useEffect(() => {
        setId(idEmployee);
        setAge(ageEmployee);
        setStreet(streetEmployee);
        setCity(cityEmployee);
        setZipCode(zipCodeEmployee);
        setState(stateEmployee);
        setDepartment(departmentEmployee);
        setSalary(salaryEmployee);
        setFirstName(firstNameEmployee);
        setLastName(lastNameEmployee);
        setIsIll(illEmployee);
        setIsOnVacation(onVacationEmployee);
        setSickDays(sickDaysEmployee);
        setVacationDays(vacationDaysEmployee);
    }, [idEmployee, ageEmployee, streetEmployee, cityEmployee, zipCodeEmployee, stateEmployee, departmentEmployee, salaryEmployee, firstNameEmployee, lastNameEmployee, illEmployee, onVacationEmployee, sickDaysEmployee, vacationDaysEmployee, companyIdEmployee]);

    return (
        <ReactModal isOpen={isOpen} style={{
            overlay: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px'
            },
            content: {
                width: '600px',
                height: '640px',
                backgroundColor: 'white',
                padding: '40px',
                margin: 'auto',
                overflow: 'hidden'
            }
        }}>
            <div className={"modal"}>
                <div className={"employee-box"}>
                    <form>
                        <div className={"employee-add-box"}>
                            <div className={"employee-text"}>
                                Edytacja pracownika:
                            </div>
                            <div>
                                <div className="employee-three-item">
                                    <div className={"employee-item"}><TextField id="standard-basic" label="Imie"
                                                                                variant="outlined"
                                                                                defaultValue={firstName}
                                                                                onChange={(e) => setFirstName(e.target.value)}/>
                                    </div>
                                    <div className={"employee-item"}><TextField id="standard-basic" label="Nazwisko"
                                                                                defaultValue={lastName}
                                                                                variant="outlined"
                                                                                onChange={(e) => setLastName(e.target.value)}/>
                                    </div>
                                    <div className={"employee-item"}><TextField id="standard-basic" label="Wiek"
                                                                                variant="outlined" type={"number"}
                                                                                defaultValue={age}
                                                                                onChange={(e) => setAge(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="employee-three-item">
                                    <div className={"employee-item"}><TextField id="standard-basic" label="Kraj"
                                                                                variant="outlined" defaultValue={state}
                                                                                onChange={(e) => setState(e.target.value)}/>
                                    </div>
                                    <div className={"employee-item"}><TextField id="standard-basic" label="Miasto"
                                                                                variant="outlined" defaultValue={city}
                                                                                onChange={(e) => setCity(e.target.value)}/>
                                    </div>
                                    <div className={"employee-item"}><TextField id="standard-basic" label="Ulica"
                                                                                variant="outlined" defaultValue={street}
                                                                                onChange={(e) => setStreet(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="employee-three-item">
                                    <div className={"employee-item"}><TextField id="standard-basic" label="Kod pocztowy"
                                                                                variant="outlined"
                                                                                defaultValue={zipCode}
                                                                                onChange={(e) => setZipCode(e.target.value)}/>
                                    </div>
                                    <div className={"employee-item"}>
                                        <div className={"select"}><FormControl>
                                            <InputLabel id="demo-simple-select-label">Dział</InputLabel>
                                            <Select className={"select-style"}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    defaultValue={department}
                                                    value={department}
                                                    label="department"
                                                    onChange={(e) => setDepartment(e.target.value)}
                                            >
                                                <MenuItem value={"HR"}>HR</MenuItem>
                                                <MenuItem value={"IT"}>IT</MenuItem>
                                                <MenuItem value={"FINANCE"}>Finanse</MenuItem>
                                                <MenuItem value={"PRODUCTION"}>Produkcja</MenuItem>
                                                <MenuItem value={"SALES"}>Sprzedaż</MenuItem>
                                            </Select>
                                        </FormControl></div>
                                    </div>
                                    <div className={"employee-item"}><TextField id="standard-basic" label="Wypłata"
                                                                                type={"number"} defaultValue={salary}
                                                                                variant="outlined"
                                                                                onChange={(e) => setSalary(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="modal-employee-days">
                                    <div className={"employee-days"}><TextField id="standard-basic"
                                                                                label="Wykorzystane dni l4"
                                                                                type={"number"}
                                                                                variant="outlined"
                                                                                defaultValue={sickDays}
                                                                                onChange={(e) => setSickDays(e.target.value)}/>
                                    </div>
                                    <div><FormControlLabel
                                        control={<Switch checked={isIll} onClick={(e) => setIsIll(!isIll)}/>}
                                        label="Oznacz L4"/></div>
                                </div>
                                <div className={"modal-employee-days"}>
                                    <div className={"employee-days"}><TextField id="standard-basic"
                                                                                label="Wykorzystane dni urlopowe"
                                                                                type={"number"}
                                                                                variant="outlined"
                                                                                defaultValue={vacationDays}
                                                                                onChange={(e) => setVacationDays(e.target.value)}/>
                                    </div>
                                    <div><FormControlLabel control={<Switch checked={isOnVacation}
                                                                            onClick={(e) => setIsOnVacation(!isOnVacation)}/>}
                                                           label="Oznacz urlop"/></div>
                                </div>
                            </div>
                            <div className={"modal-buttons"}>
                                <div className={"edit"}>
                                    <button className={"edit-button"} onClick={goBack}>Wstecz</button>
                                </div>
                                <div className={"edit"}>
                                    <button className={"edit-button"}
                                            onClick={editCompany}>Edytuj
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </ReactModal>
    );
};