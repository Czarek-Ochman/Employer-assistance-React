import {FunctionComponent} from 'react';
import "./homepage.scss";
import {MainFooter} from "../../Component/MainFooter/MainFooter";
import Employees from '../../Component/Shared/Assets/employees.jpg';

type Props = {};

export const Homepage: FunctionComponent<Props> = (props: Props) => {
    return (
        <div className="homepage">
            <div className="main-text"> Dzięki korzystaniu z  Employer Assistance możesz w łatwy sposób zarządzać pracownikami.</div>
            <div className="img-style "><img className="img" src={Employees}/></div>
           <div className="home-footer"><MainFooter /></div>
        </div>
    );
};