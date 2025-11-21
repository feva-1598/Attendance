import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Input } from '@mui/icons-material';
import { TextField } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Information Systems',
  'Math',
  'Computer Science',
  'Physics',
];

function getStyles(name: string, departmentName: string[], theme: Theme) {
  return {
    fontWeight: departmentName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}


export default function MultipleSelect({departments, setDepartments, classes, setClasses} : {departments: string[], setDepartments: React.Dispatch<React.SetStateAction<string[]>>, classes: number[], setClasses: React.Dispatch<React.SetStateAction<number[]>>}) {
  const theme = useTheme();
  const [departmentName, setDepartmentName] = React.useState<string[]>([]);
  const updateNumberAtIndex = (index: number, newValue: number) => {
        setClasses(prevNumbers => {
        const newNumbers = [...prevNumbers]; 
        newNumbers[index] = newValue;        
        return newNumbers; 
        });
    };

  function SectionSelect({ department, i }: { department: string, i: number })
    {
        return (
            <div>
                <InputLabel style={{ fontSize: "20px", fontFamily: "monospace"}}>How many sections in {department}</InputLabel>
                <TextField value={classes[i]} onChange={(event) => {updateNumberAtIndex(i, Number(event.target.value))}} id="outlined-basic"  variant="outlined" />
            </div>
        )
    }

  const handleChange = (event: SelectChangeEvent<typeof departmentName>) => {
    const {
      target: { value },
    } = event;
    setDepartments(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Departments</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={departments}
          onChange={handleChange}
          input={<OutlinedInput label="Departments" />}
          MenuProps={MenuProps}
           variant='outlined' 
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, departmentName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    {departments.map((department: string, i) => (
            <SectionSelect key={i} department={department} i={i} />
     ))}
    </div>
  );
}