import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
function App() {

  const [empDetails,setEmpDetails] = useState([]);
  const[page,setPage] = useState(0);
  const [displayEmp,setDisplayEmp] = useState([]);
useEffect(()=>{
  fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
  .then((res)=>res.json())
  .then((data)=>{setEmpDetails(data);setPage(1)})
  .catch((err)=>alert("failed to fetch data",err));
  console.log(empDetails);
},[])

useEffect(()=>{
  if(page){
    let filtered = empDetails.slice(page*10-10,page*10);
    setDisplayEmp(filtered);
  }
},[page]);

const handlePageInc=()=>{
  if(page>=1 && page<5){
    setPage((prev)=>prev+1);
  }
}
const handlePageDec=()=>{
  if(page>1){
    setPage((prev)=>prev-1);
  }else{
    setPage(1);
  }
}
  return (
    <div className="App">
     <h1>Employee Data Table</h1><br/>
     <table style={{width:"100%"}}>
      <tr style={{background:"#047d4c"}}>
        <td className='head'>ID</td>
        <td className='head'>Name</td>
        <td className='head'>Email</td>
        <td className='head'>Role</td>
      </tr>
      <tbody>
        {
          displayEmp.map((emp)=>{
            return <tr key={emp.id}>
           <td>{emp.id}</td>
           <td>{emp.name}</td>
           <td>{emp.email}</td>
           <td>{emp.role}</td>
        </tr>
          })
        }
        
      </tbody>
     </table>
     <button onClick={handlePageDec}>Previous</button>
     <button style={{padding:"15px"}}>{page}</button>
     <button onClick={handlePageInc}>Next</button>

    </div>
  );
}

export default App;
