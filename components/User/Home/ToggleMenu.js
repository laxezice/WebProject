import * as React from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { GoListUnordered } from "react-icons/go";
import {
    AiTwotoneAppstore
} from "react-icons/ai";
export default function ToggleMenu() {
    const [alignment, setAlignment] = React.useState('left');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const children = [
        <ToggleButton value="left" key="left" sx={{ bgcolor : '#fff'}}>
            <GoListUnordered />
        </ToggleButton>,
        <ToggleButton value="center" key="center" sx={{ bgcolor : '#fff'}}>
            <AiTwotoneAppstore />
        </ToggleButton>,
    ];

    const control = {
        value: alignment,
        onChange: handleChange,
        exclusive: true,
    };

    return (
        <Box
        mr={10}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // TODO Replace with Stack
                '& > :not(style) + :not(style)': { mt: 2 },
            }}
        >
            <ToggleButtonGroup size="large" {...control}>
                {children}
            </ToggleButtonGroup>
        </Box>
    );
}