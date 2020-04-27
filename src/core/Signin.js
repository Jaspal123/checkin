import React,{useState} from "react";
import "../styles.css";
import Base from "./Base";
import { useHistory } from "react-router-dom";
import {signup} from "./helper/index";


export default function Signin() {

  const [values,setValues] = useState({
    name:"",
    password:"",
    question : "",
    error:"",
    formshow:true,
    success: false
  })
  const [batch, setBatch] = useState([])
  const [subbatch, setsubBatch] = useState([])
  const [thread, setThread] = useState()


  const {name,password, question,error,success,formshow} = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }
  const checkboxChange = (event) => {
      const target = event.target;
        var value = target.value;
        if(target.checked){
            setBatch([...batch, value])
        }else
        {
              var toggle = batch.filter(prev => prev !== value)
              setBatch(toggle);
        }
  }
  const subbatchChange = (event) => {
    const target = event.target;
    var value = target.value;
    if(target.checked){
      setsubBatch([...subbatch, value])
    }else
    {
          var toggle = subbatch.filter(prev => prev !== value)
          setsubBatch(toggle);
    }
  }

  const onDropdownChange = event => {
    const value = event.target.value
    setThread(value)
  }

  const history = useHistory();
  const refresh = () => {
    setTimeout(function(){
      history.push('/')
    },3000);
  }
  const onSubmit = event =>{
    event.preventDefault()
    setValues({...values, error:false});
    signup({name,password,question,batch,subbatch,thread})
    .then(data => {
        setValues({...values, name:"", password:"", formshow:false ,success:true})
        setBatch({batch:[]})
        setsubBatch({subbatch:[]})
        refresh();
    })
    .catch(console.log("error occured"))

  }

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left size">
          <div className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Please Wait for few minutes before we generate your Checkin on FRESCO TALK
          </div>
        </div>
      </div>
    )
  }

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left size">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return(formshow &&
      <div className="container">
        <form id="form" className="mx-auto  p-4 text-white">
            <div className="form-group">
              <label className="label">Username</label>
              <input type="text" name="username" id="username" placeholder="Username" className="form-control" onChange={handleChange("name")} value={name} required/>
            </div>
            <div className="form-group">
              <label className="label">Password</label>
              <input type="password" name="password" id="password" placeholder="Enter Password" className="form-control" onChange={handleChange("password")} value={password} required/>
            </div>
            <div className="form-group">
              <label className="label">Question</label>
              <input type="text" name="question" id="question" placeholder="Enter question" className="form-control" onChange={handleChange("question")} value={question} required/>
            </div>
            <div class="dropdown">
                  <select class="form-control" onChange={onDropdownChange}>
                    <option>Select Thread</option>
                    <option value="Announcements">Announcements</option>
                    <option value="Attendance">Attendance</option>
                    <option value="Discussions">Discussions</option>
                    <option value="General">General</option>
                    <option value="Learning">Learning</option>
                    <option value="Status_Reports">Status_Reports</option>
                </select>
            </div>
            <div className="d-block">
              <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" value="A" onChange={checkboxChange}/>
                  <label className="label">A</label>
              </div>
              <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox"  value="B" onChange={checkboxChange}/>
                  <label className="label">B</label>
              </div>
              <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox"  value="C" onChange={checkboxChange} />
                  <label className="label">C</label>
              </div>
            </div>
            <div className="d-block">
              <div className="form-check form-check-inline">
                  <input className="form-check-input p-2" type="checkbox" value="A1" onChange={subbatchChange}/>
                  <label className="label">A1</label>
              </div>
              <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox"  value="A2" onChange={subbatchChange}/>
                  <label className="label">A2</label>
              </div>
              <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox"  value="A3" onChange={subbatchChange} />
                  <label className="label">A3</label>
              </div>
              <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox"  value="A4" onChange={subbatchChange} />
                  <label className="label">A4</label>
              </div>
          </div>
          <div className="d-block">
            <div className="form-check form-check-inline">
                <input className="form-check-input p-2" type="checkbox" value="B1" onChange={subbatchChange}/>
                <label className="label">B1</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox"  value="B2" onChange={subbatchChange}/>
                <label className="label">B2</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox"  value="B3" onChange={subbatchChange} />
                <label className="label">B3</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox"  value="B4" onChange={subbatchChange} />
                <label className="label">B4</label>
            </div>
        </div>
        <div className="d-block">
          <div className="form-check form-check-inline">
              <input className="form-check-input p-2" type="checkbox" value="C1" onChange={subbatchChange}/>
              <label className="label">C1</label>
          </div>
          <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox"  value="C2" onChange={subbatchChange}/>
              <label className="label">C2</label>
          </div>
          <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox"  value="C3" onChange={subbatchChange} />
              <label className="label">C3</label>
          </div>
          <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox"  value="C4" onChange={subbatchChange} />
              <label className="label">C4</label>
          </div>
      </div>
            <div className="form-group">
              <input type="submit" name="submit" value="Submit" className="form-control btn btn-primary" onClick={onSubmit}/>
            </div>
        </form>
    </div>
  )
  }


  return (
        <Base>
          {successMessage()}
          {errorMessage()}
          {signInForm()}
          
      </Base>
  );
}
