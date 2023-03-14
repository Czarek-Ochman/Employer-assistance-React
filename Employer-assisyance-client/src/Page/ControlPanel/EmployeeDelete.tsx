import React, {FunctionComponent} from 'react';
import "./delete-modal.scss";
import ReactModal from "react-modal";
import api from "../../Api/ApiService";

interface Props {
    isOpen: boolean;
    id: any;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    name: string
    handleButtonClick: () => void;
}

export const EmployeeDelete: FunctionComponent<Props> = ({isOpen, setIsOpen, id, name, handleButtonClick}) => {

    const goBack = () => {
        setIsOpen(false)
    }

    const deleteEmployee = () => {
        api.deleteEmployee(id).then(response => {
            setIsOpen(false)
            handleButtonClick();
        }).catch(err => {
            console.log(err.message)
        })
    }

    return (
        <ReactModal isOpen={isOpen} style={{
            overlay: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px'
            },
            content: {
                width: '400px',
                height: '250px',
                backgroundColor: 'white',
                padding: '40px',
                margin: 'auto',
                overflow: 'hidden'
            }
        }}>
            <div className={"delete-modal"}>
                <div className={"warning"}>Uwaga!</div>
                <div className={"delete-text"}>Czy na pewno chcesz skasować pracownika o danych osobowych: <span
                    className={"username"}>{name}</span></div>

                <div className={"modal-buttons"}>
                    <div className={"edit"}>
                        <button className={"edit-button"} onClick={goBack}>Nie</button>
                    </div>
                    <div className={"delete"}>
                        <button className={"delete-button"} onClick={deleteEmployee}>Tak</button>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};