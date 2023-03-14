import {FunctionComponent} from 'react';
import "./main-footer.scss";

type Props = {};

export const MainFooter: FunctionComponent<Props> = (props: Props) => {
    return (
        <div className="main-footer">
            <div className="text">
                © 2022 Employer Assistance. Wszelkie Prawa zastrzeżone | Aplikacja zaliczeniowa Cezary Ochman
            </div>
        </div>
    );
};