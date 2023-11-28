import { collection,  limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Unsubscribe } from "firebase/auth";
import { styled } from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";

export interface ITweet {
  id:string,
  photo:string;
  tweet:string,
  userId:string,
  createdAt:number,
  username:string;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;
export default function Timeline() {
  const [tweets,setTweet] = useState<ITweet[]>([]);
 
  useEffect(()=>{
    let unsubscribe : Unsubscribe | null = null;
    const fetchTweets = async() => {
      const tweetsQuery = query(
        collection(db,"tweets"),
        orderBy("createdAt","desc"),
        limit(25)
      );
      // const snapshot = await getDocs(tweetsQuery);
      // const tweets = snapshot.docs.map(doc=>
      //   {
      //     const {tweet,createdAt,userId,username,photo} = doc.data(); 
      //     return {
      //       tweet,
      //       createdAt,
      //       userId,
      //       username,
      //       photo,
      //       id:doc.id
      //     }
      //   });
      //   console.log(tweets)
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot)=>{
        const tweets = snapshot.docs.map(doc=>
        {
          const {tweet,createdAt,userId,username,photo} = doc.data(); 
          return {
            tweet,
            createdAt,
            userId,
            username,
            photo,
            id:doc.id
          }
        })
        setTweet(tweets);
      })
    }
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    }
  },[])
  return <Wrapper>
    {tweets.map(tweet=> <Tweet key={tweet.id} {...tweet}></Tweet>)}
  </Wrapper>
}