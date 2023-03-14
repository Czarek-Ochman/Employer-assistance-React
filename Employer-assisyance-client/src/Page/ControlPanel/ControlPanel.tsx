import React, {FunctionComponent, useState} from 'react';
import "./control-panel.scss";
import CircularProgress from '@mui/material/CircularProgress';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Company} from "./Company";
import {Employee} from "./Employee";

type Props = {};

function TabPanel(props: { [x: string]: any; children: any; value: any; index: any; }) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const ControlPanel: FunctionComponent<Props> = (props: Props) => {
    const [isReady, setIsReady] = useState(true);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>

            {!isReady && <div className={"loading"}>
                <CircularProgress className={"circular"}/>
            </div>}


            {isReady && <div>
                <Box sx={{width: '100%'}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Firma" {...a11yProps(0)} />
                            <Tab label="Pracownicy" {...a11yProps(1)} />
                            <Tab label="Magazyn" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Company/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Employee/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Na ten moment funkcja "Magazyn" nie jest dostępna, prace będą kontunuowane.
                    </TabPanel>
                </Box>
            </div>}
        </div>
    );
};