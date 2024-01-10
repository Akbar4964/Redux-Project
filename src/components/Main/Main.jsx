import React, { useEffect, useRef } from "react";
import { Header } from "./style";
import axios from "axios";
import { BASE_URL } from "../..";
import { useDispatch, useSelector } from "react-redux";
import { userType } from "../../Const/usetTypes";

function Main() {
  const data = useSelector((store) => store.UsersReducer.users);

  let isGetLoading = useSelector(
    (store) => store.UsersReducer.isUserGetLoading
  );

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(BASE_URL + "/users")
      .then((res) => {
        dispatch({ type: userType.user, payload: res.data });
      })
      .catch((error) => console.log(error));
  }, []);

  const name = useRef(null);

  const surname = useRef(null);

  async function addUser(data) {
    await axios
      .post(BASE_URL + "/users", data)
      .then((res) => {
        dispatch({ type: userType.addUser, payload: res.data });
        // if (res.status == 200) {
        //   setData((prev) =>
        //     prev.map((item) => {
        //       if (item.id == data.id) {
        //         return data;
        //       }
        //       return item;
        //     })
        //   );
        // }
      })
      .catch((error) => console.log(error));
  }

  function addedUser(event) {
    event.preventDefault();
    const newUser = {
      name: name.current.value.trim(),
      surname: surname.current.value.trim(),
    };
    addUser(newUser);
    name.current.value = "";
    surname.current.value = "";
  }

  function deleteUser() {
    axios
  }

  return (
    <Header>
      <div className={isGetLoading ? "loading" : "load-none"}></div>
      <div className="container">
        <form className="form" onSubmit={addedUser}>
          <input
            ref={name}
            type="text"
            className="form-control name"
            placeholder="please write user-name..."
            required
          />
          <input
            ref={surname}
            type="text"
            className="form-control surname"
            placeholder="please write user-surname..."
            required
          />
          <button className="add-name-surname btn btn-success">Submit</button>
        </form>
        <br />
        <table className="table">
          <thead className="table-head">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NAME</th>
              <th scope="col">SURNAME</th>
              <th scope="col">DELETE</th>
              <th scope="col">EDIT</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <th>{item.id}</th>
                <td>{item.name}</td>
                <td>{item.surname}</td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
                <td>
                  <button className="btn btn-warning">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Header>
  );
}

export default Main;
