import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SelectProps {
    id: string;
    value: string;
    label: string;
    handleChange: (e: SelectChangeEvent) => void;
    options: Record<string, string | number>[];
}

export default function CustomSelect({ value, id, label, handleChange, options }: SelectProps) {
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id={`${id}-label`}>{label}</InputLabel>
                <Select labelId={`${id}-label`} id={`${id}`} value={value} label={label} onChange={handleChange}>
                    {options.map((option) => (
                        <MenuItem value={option.value}>{option.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
