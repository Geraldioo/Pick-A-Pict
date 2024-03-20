import React, { useContext, useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { MyCard } from "../components";
import { ThemeContext } from "../context/ThemeContext";

export default function MyCollection() {
  const [myPictures, setMyPictures] = useState();
  const fetchMyCollection = () => {
    const q = query(
      collection(db, "Posts"),
      where("user", "==", "/Users/" + localStorage.uid),
    );
    const myCollection = onSnapshot(q, (querySnapshot) => {
      const pictures = [];
      querySnapshot.forEach((doc) => {
        const picture = doc.data();
        picture.id = doc.id; 
        pictures.push(picture);
      });
      setMyPictures(pictures);
    });
  };
  useEffect(() => {
    fetchMyCollection();
  }, []);

  // console.log(myPictures, "<== data picture");

  const { theme, currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const bgColor = theme[currentTheme].bgColor;
  const border = theme[currentTheme].border;

  return (
    <content className={`flex w-full flex-wrap items-center ${bgColor} justify-center gap-5 py-2 lg:justify-evenly`}>
      {myPictures?.map((picture, index) => (
        <MyCard
          picture={picture}
          key={`${index}${picture.id}`}
          updatePictures={fetchMyCollection}
        />
      ))}
    </content>
  );
}
