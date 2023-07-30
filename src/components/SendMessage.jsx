import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react"
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase.config";
import { FaRegPaperPlane } from 'react-icons/fa';
const SendMessage = () => {
  const [value, setValue] = useState("");
  const { currentUser } = UserAuth();

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (value.trim() === "") {
      alert("Enter valid message!");
      return;
    }

    try {
      const { uid, displayName, photoURL } = currentUser;
      await addDoc(collection(db, "messages"), {
        text: value,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid
      })
    } catch (error) {
      console.log(error);
    }
    setValue("");
  }

  return (
    <div className="w-full bg-neutral mb-2 fixed bottom-0  py-10 shadow-lg">
      <form onSubmit={handleSendMessage} className="px-2 containerWrap flex">
        <input value={value} onChange={e => setValue(e.target.value)} className="input text-lg bg-gray-500 w-full focus:outline-none text-white rounded-full" type="text" />
        <button type="submit" className="w-auto rounded-r-lg px-5 "><img className="" width="48" height="48" src="https://img.icons8.com/fluency/48/sent.png" alt="sent"/></button>
      </form>
    </div>
  )
}

export default SendMessage