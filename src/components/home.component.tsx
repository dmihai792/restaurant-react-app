import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";

// Types describe the shape of the data
type State = {
  content: string;
  number?: number; // this is an optional state param
};
// for instance say you have an object data
const data: State = { content: "Some Text" };
// this is good the object fits the type
// const otherData: State = { wrong: "testThings ", number: 122 };
// this is also good because now we know that otherData is fucked
// and des not look like what we said it shoud look like
const yetAnotherCorrect = { content: "YAYYY" };

// This is how I debug with console logs
// you can filter the console for WAT, then you only have that specific console log
// console can have as many aguments as you want
// you can also pass it straight objects, as in the example below
// in the console you will have each of the data, other data as keys with the value of the objets set above
console.log("WAT -", { data, yetAnotherCorrect });

//Functional components are just functions
// this is the "cool" anonymous functuon way
// const Home = () => {
// or you can write it like this
function Home() {
  // But you only have to do it if you are advanced
  // -- It can also be just
  // function Home() {

  // this is the useState hook
  // it returns the value and a setter, you can call them anything you want, but convention is NAME , setNAME
  // https://react.dev/reference/react/useState#usage
  const [content, setContent] = useState<string>(""); //
  // You also dont need to type this, it can be infered by the value you pass to the useState(112) --
  // const [content, setContent] = useState("");
  //

  // this is the useEffect hool, this one take a while to get

  // base useEffect
  // useEffect(()=>{},[])
  // useEffect((CALLBACK)=>{SCOPE OF USE EFFECT},[DEPENDENCY ARRAY, values that when change will make the use effect run again])
  // if no value, it only runs once , when the component is rendered
  // https://react.dev/reference/react/useEffect#usage

  useEffect(() => {
    UserService.getPublicContent()
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => {
        setContent(
          (error.response && error.response.data) ||
            error.message ||
            error.toString()
        );
      });
  }, []);

  // all react components can return somethign
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
}

export default Home;
