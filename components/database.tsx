import { Button } from "@mui/material";
import axios from "axios";

    const handleSubmit = async (event: any) => {
      event.preventDefault();

      const postData = {
        name: 'Abebe Kebede Mola',
      };

      try {
        const response = await axios.post('http://localhost:3000/try', postData);
        console.log('Response:', response.data);
        alert(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

export default function DataBase()
{
    return (
        <Button onClick={handleSubmit}> Try</Button>
    )
}