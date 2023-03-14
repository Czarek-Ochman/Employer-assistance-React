import React, {FunctionComponent, useEffect, useState} from 'react';
import "./employee.scss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import {TextField} from "@mui/material";
import api from "../../Api/ApiService";
import {EmployeeEdit} from "./EmployeeEdit";
import {EmployeeDelete} from "./EmployeeDelete";


type Props = {};
export const Employee: FunctionComponent<Props> = (props: Props) => {
    const [isCompany, setIsCompany] = useState(true);
    const [isLoad, setIsLoad] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showError, setShowError] = useState(false);
    const [addEmployee, setAddEmployee] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [age, setAge] = React.useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [state, setState] = useState('');
    const [department, setDepartment] = React.useState('');
    const [salary, setSalary] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [id, setId] = React.useState('');
    const [isIll, setIsIll] = useState(false);
    const [isOnVacation, setIsOnVacation] = useState(false);
    const [idForDelete, setIdForDelete] = React.useState('');
    const [nameForDelete, setNameForDelete] = React.useState('');
    const [vacationDaysEmp, setVacationDaysEmp] = React.useState('');
    const [l4daysEmp, setL4daysEmp] = React.useState('');
    const [companyId, setCompanyId] = React.useState('');

    const [employeeData, setEmployeeData] = useState<Array<{ name: string, department: string, salary: number, l4days: number, vacationDays: number, id: number, ill: boolean, onVacation: boolean }>>([]);

    if (isCompany && !isLoad) {
        api.getAllEmployees().then((res) => {
            const newEmployeeData = res.data.map((employee: any) => createData(
                (employee.person.firstName + ' ' + employee.person.lastName),
                employee.employeeDepartment,
                employee.salary,
                employee.sickDays,
                employee.vacationDays,
                employee.id,
                employee.ill,
                employee.onVacation
            ));
            setEmployeeData(newEmployeeData);
            setIsLoad(true);
        });
    }

    const updateEmployeesData = () => {
        api.getAllEmployees().then((res) => {
            const newEmployeeData = res.data.map((employee: any) => createData(
                (employee.person.firstName + ' ' + employee.person.lastName),
                employee.employeeDepartment,
                employee.salary,
                employee.sickDays,
                employee.vacationDays,
                employee.id,
                employee.ill,
                employee.onVacation
            ));
            setEmployeeData(newEmployeeData);
        });
    }

    const openEditModal = (id: any) => {
        api.getEmployeeById(id).then((res) => {
            if (res.status === 200) {
                setId(id);
                setAge(res.data.person.age);
                setFirstName(res.data.person.firstName);
                setLastName(res.data.person.lastName);
                setSalary(res.data.salary);
                setState(res.data.address.state);
                setZipCode(res.data.address.zipCode);
                setCity(res.data.address.city);
                setStreet(res.data.address.street);
                setIsIll(res.data.ill);
                setIsOnVacation(res.data.onVacation);
                setDepartment(res.data.employeeDepartment)
                setVacationDaysEmp(res.data.vacationDays);
                setL4daysEmp(res.data.sickDays);
                setCompanyId(res.data.company.id);
                setIsOpen(true);
            }
        });
    }

    const openDeleteModal = (id: any, name: any) => {
        setIdForDelete(id);
        setNameForDelete(name);
        setIsOpenDeleteModal(true);
    }

    const addEmployeeToCompany = (e: any) => {
        e.preventDefault();
        if (firstName == '' || city == '' || state == '' || street == '' || zipCode == '' || age == '' || lastName == '' || salary == '' || department == '') {
            setShowError(true);
        } else {
            api.addEmployee(city, state, street, zipCode, department, age, firstName, lastName, salary).then(response => {
                if (response.status === 200) {
                    setShowError(false);
                    setAddEmployee(false);
                    updateEmployeesData();
                }
            }).catch(err => {
                console.log(err.message)
            })
        }
    }

    function createData(
        name: string,
        department: string,
        salary: number,
        l4days: number,
        vacationDays: number,
        id: number,
        ill: boolean,
        onVacation: boolean
    ): { name: string, department: string, salary: number, l4days: number, vacationDays: number, id: number, ill: boolean, onVacation: boolean } {
        return {name, department, salary, l4days, vacationDays, id, ill, onVacation};
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.isCompany();
            setIsCompany(result);
        }
        fetchData();
    }, []);

    const handleEmployee = () => {
        setAddEmployee(!addEmployee);
    };

    return (
        <div className={"employee"}>
            {!isCompany && <div>
                <div className={"employee-text"}>
                    Nie posiadasz dodanej firmy!
                </div>
            </div>}
            {isCompany && <div>
                <div className={"add-employee"}>
                    <button onClick={handleEmployee} className={"add-employee-button"}>Dodaj nowego pracownika</button>
                </div>
                {addEmployee && <div className={"employee-box"}>
                    <form>
                        <div className={"employee-add-box"}>
                            <div className={"employee-text"}>
                                Dodaj nowego pracownika:
                            </div>
                            <div>
                                <div className="employee-three-item">
                                    <div className={"employee-item"}><TextField id="standard-basic" label="Imie"
                                                                                variant="outlined"
                                                                                onChange={(e) => setFirstName(e.target.value)}/>
                                    </div>
                                    <div className={"employee-item"}><TextField id="standard-basic" label="Nazwisko"
                                                                                variant="outlined"
                                                                                onChange={(e) => setLastName(e.target.value)}/>
                                    </div>
                                    <div className={"employee-item"}><TextField id="standard-basic" label="Wiek"
                                                                                variant="outlined" type={"number"}
                                                                                onChange={(e) => setAge(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="employee-three-item">
                                    <div className={"employee-item"}><TextField id="standard-basic" label="Kraj"
                                                                                variant="outlined"
                                                                                onChange={(e) => setState(e.target.value)}/>
                                    </div>
                                    <div className={"employee-item"}><TextField id="standard-basic" label="Miasto"
                                                                                variant="outlined"
                                                                                onChange={(e) => setCity(e.target.value)}/>
                                    </div>
                                    <div className={"employee-item"}><TextField id="standard-basic" label="Ulica"
                                                                                variant="outlined"
                                                                                onChange={(e) => setStreet(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="employee-three-item">
                                    <div className={"employee-item"}><TextField id="standard-basic" label="Kod pocztowy"
                                                                                variant="outlined"
                                                                                onChange={(e) => setZipCode(e.target.value)}/>
                                    </div>
                                    <div className={"employee-item"}>
                                        <div className={"select"}><FormControl>
                                            <InputLabel id="demo-simple-select-label">Dział</InputLabel>
                                            <Select className={"select-style"}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
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
                                                                                type={"number"}
                                                                                variant="outlined"
                                                                                onChange={(e) => setSalary(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            {showError && <div className="error">Wszystki pola muszą być uzupełnione!</div>}
                            <div className={"add"}>
                                <button className={"add-button"} type="button"
                                        onClick={(e) => addEmployeeToCompany(e)}>Dodaj
                                </button>
                            </div>
                        </div>
                    </form>
                </div>}
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Dane osobowe</TableCell>
                                <TableCell align="right">Dział</TableCell>
                                <TableCell align="right">Pozostałe dni urlopowe</TableCell>
                                <TableCell align="right">Wykorzystane L4</TableCell>
                                <TableCell align="right">Wypłata</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employeeData.map((row) => (
                                <TableRow
                                    style={{backgroundColor: row.ill ? "#e4605e" : row.onVacation ? "#1b9fa1" : "inherit"}}
                                    key={row.name}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.department}
                                    </TableCell>
                                    <TableCell align="right">{row.vacationDays}</TableCell>
                                    <TableCell align="right">{row.l4days}</TableCell>
                                    <TableCell align="right">{row.salary}</TableCell>
                                    <span className={"edit"}><button className={"edit-button"}
                                                                     onClick={() => openEditModal(row.id)}>Edytuj</button></span>
                                    <span className={"delete"}><button onClick={() => openDeleteModal(row.id, row.name)}
                                                                       className={"delete-button"}>Usuń</button></span>
                                    <EmployeeEdit isOpen={isOpen} setIsOpen={setIsOpen} firstNameEmployee={firstName}
                                                  lastNameEmployee={lastName} departmentEmployee={department}
                                                  salaryEmployee={salary} idEmployee={id} illEmployee={isIll}
                                                  onVacationEmployee={isOnVacation}
                                                  streetEmployee={street} cityEmployee={city} zipCodeEmployee={zipCode}
                                                  stateEmployee={state} ageEmployee={age} sickDaysEmployee={l4daysEmp}
                                                  vacationDaysEmployee={vacationDaysEmp} companyIdEmployee={companyId}
                                                  handleButtonClick={updateEmployeesData}
                                    />
                                    <EmployeeDelete isOpen={isOpenDeleteModal} id={idForDelete}
                                                    setIsOpen={setIsOpenDeleteModal} name={nameForDelete}
                                                    handleButtonClick={updateEmployeesData}/>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>}
        </div>
    );
};