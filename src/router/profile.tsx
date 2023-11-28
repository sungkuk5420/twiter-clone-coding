import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import React, { useState,useEffect } from "react";
import { collection, getDocs, limit, orderBy, query,  where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
  }
`;

const AvatarImg = styled.img`
  width: 100%;
`;
const AvatarInput = styled.input`
  display: none;
`;
const Name = styled.span`
  font-size: 22px;
`;

const Tweets = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

export default function Profile(){
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const onAvatarChange =  async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    if (!user) return;
    if(files && files.length ===1){
      const file= files[0]
      if(file){
        const locationRef = ref(storage,`avatars/${user?.uid}`);
        const fileDoc = await uploadBytes(locationRef,file);
        const avatarUrl = await getDownloadURL(fileDoc.ref)

        await updateProfile(user,{
          photoURL:avatarUrl
        })
        setAvatar(avatarUrl)
      }
    }
  };

  const fetchTweets = async() => {
    const tweetQuery = query(
      collection(db,"tweets"),
      where("userId","==",user?.uid),
      orderBy("createdAt","desc"),
      limit(25)
    );

    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map(doc=>{
      const {tweet,createdAt,userId,username,photo} = doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      }
    });
    setTweets(tweets)
  };
  
  useEffect(()=>{
    fetchTweets();
  },[]);
  return <Wrapper>
    <AvatarUpload htmlFor="avatar">
      {avatar ? <AvatarImg src={avatar}/> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
}
    </AvatarUpload>
    <AvatarInput onChange={onAvatarChange} id="avatar" type="file" accept="image/*"></AvatarInput>
    <Name>{user?.displayName?user.displayName:"Anonymous"}</Name>
    <Tweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
    </Tweets>
  </Wrapper>;
}