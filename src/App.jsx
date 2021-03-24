import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

function WishList() {
  const [wishText, setWishText] = useState("");
  const [wishList, setWishList] = useState([]);
  const [loader, setLoader] = useState("");
  // const [timer, setTimer] = useState(3)

  useEffect(() => {
    (async function sth() {
      wishList.length === 0 && setLoader("Data is fetching");
      try {
        const resp = await axios.get("/api/wishes");
        setWishList(resp.data.wishes);
      } catch (err) {
        console.log(err);
      } finally {
        setLoader("");
      }
    })();
  }, []);

  async function postData() {
    setLoader("saving your data..");
    try {
      const { data } = await axios.post("/api/wishes", {
        wish: {
          text: wishText
        }
      });
      setWishList((prev) => prev.concat(data.wish));
      setWishText("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoader("");
    }
  }

  // async function deleteData(id)
  // {
  //   const {status} = await axios.delete(`/api/wishes/${wish.id}`)
  //   setWishList(wishList.filter(data.wishes.id!==id));
  // }

  // const handleWishAdd = () => {
  //   setWishList((list) => list.concat({ id: uuid(), wish: wishText }));
  //   setWishText("");
  // };
  const handleWishInput = (event) => setWishText(event.target.value);
  return (
    <div className="center">
      <input
        onChange={handleWishInput}
        value={wishText}
        placeholder={"I wish..."}
      />
      <button onClick={postData} className="button-primary padding-1 margin-1">
        Add{" "}
      </button>
      <small style={{ margin: "4em" }}>{loader}</small>
      <ul>
        {wishList.map(({ id, text }) => (
          <>
            <li key={id}> {text} </li>
            {/* <span onClick={()=>deleteData(id)}>X</span> */}
          </>
        ))}
      </ul>
    </div>
  );
}
export default function App() {
  return (
    <div className="App">
      <h1 className="app-header">wishing well</h1>
      <div className="app-body">
        <WishList />
      </div>
    </div>
  );
}
