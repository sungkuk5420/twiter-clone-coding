import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate,Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";

import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";


export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading,setLoading] = useState(false);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {target : {name,value} }= e;
    if(name === "name"){
      setName(value)
    }else if(name === "password"){
      setPassword(value)
    }else if(name === "email"){
      setEmail(value)
    }

  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setError("");
    console.log(name,email,password)

    if(isLoading || name === "" || email ==="" || password === ""){
      return ;
    }
    
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(auth,email,password);
      console.log(credentials.user);
      await updateProfile(credentials.user,{
        displayName:name
      })
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
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        />
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
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account? {" "}
        <Link to="/login">Log in &rarr;</Link>
      </Switcher>
      <GithubButton></GithubButton>
    </Wrapper>
  );
}