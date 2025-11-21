import { Label } from '@mui/icons-material';
import { Button, FormLabel, Input, TextField } from '@mui/material';
import { Form } from 'react-router';
import MultipleSelect from './selectmulti';
import { useState } from 'react';
import axios from "axios";

export default function Settings()
{
    const [name, setName] = useState<string>("");
    const [departments, setDepartments] = useState<string[]>([]);
    const [classes, setClasses] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    const handleSubmit = async (event: any) => {
      event.preventDefault();

      const postData = {
        name: name,
        departments: departments,
        classes: classes

      };

      try {
        const response = await axios.post('http://localhost:3000/InsertDepartmentsAndSections', postData);
        console.log('Response:', response.data);
        alert(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    return (
        <div>
            <h1 style={{marginTop: "40px"}}>Create / Update Profile Information</h1>
            <form action="" method="post" style={{ width: "100%"}}>
                <div style={{width: "100%"}}>
                    <FormLabel style={{ fontSize: "20px", fontFamily: "monospace"}}>What should I call you?</FormLabel><br />
                    <TextField style={{width: "400px", marginTop: "10px", marginBottom: "15px"}} value={name} onChange={(event) => {setName(event.target.value)}} variant='outlined' placeholder='Enter your name here'/>
                </div>
                <div style={{width: "100%"}}>
                    <FormLabel style={{ fontSize: "20px", fontFamily: "monospace"}}>Select the departments you are currently teaching</FormLabel><br />
                    <MultipleSelect departments={departments} setDepartments={setDepartments} classes={classes} setClasses={setClasses}/>
                    <Button onClick={handleSubmit} variant='contained' style={{marginTop: "15px"}}>Save</Button>
                </div>
            </form>
        </div>
    )
}
