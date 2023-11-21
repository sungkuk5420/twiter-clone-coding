import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";

import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading,setLoading] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {target : {name,value} }= e;
    if(name === "password"){
      setPassword(value)
    }else if(name === "email"){
      setEmail(value)
    }

  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setError("");
    console.log(email,password)

    if(isLoading ||  email ==="" || password === ""){
      return ;
    }
    
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth,email,password);
      navigate("/");
    } catch (errorMsg) {
      if(errorMsg instanceof FirebaseError){
        console.log(errorMsg.code, errorMsg.message)
        setError(errorMsg.message);
      }
      
    }finally{
      setLoading(false)
    }
  }

  return (
    <Wrapper>
      <Title>Join 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          value={password}
          name="password"
          placeholder="Password"
          type="password"
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Log in"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Don't have an account? {" "}
        <Link to="/create-account">Create one &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}