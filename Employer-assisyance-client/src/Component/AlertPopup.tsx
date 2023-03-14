import {confirmAlert} from 'react-confirm-alert'; // Import
import {useNavigate} from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import React, {FunctionComponent} from "react";

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement> & {
    title: string,
    message: string,
    label: string
};

const options = {
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    willUnmount: () => {
    },
    afterClose: () => {
    },
    onClickOutside: () => {
    },
    onKeypress: () => {
    },
    onKeypressEscape: () => {
    },
    overlayClassName: "overlay-custom-class-name"
};


const AlertPopup: FunctionComponent<Props> = ({title, message, onClick, label}) => {

    const showAlert = () => {
        if (onClick) {
            // @ts-ignore
            onClick()
        }
    };

    confirmAlert({
            title: title,
            message: message,
            buttons: [
                {
                    label: label,
                    onClick: (showAlert),
                }
            ],
        }
    );

    return (
        <div className='alert-container'>
            <button onClick={() => confirmAlert(options)}></button>
        </div>
    );
};
export default AlertPopup;