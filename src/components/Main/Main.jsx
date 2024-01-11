import React, { useEffect, useRef, useState } from "react";
import { Header } from "./style";
import axios from "axios";
import { BASE_URL } from "../..";
import { useDispatch, useSelector } from "react-redux";
import { userType } from "../../Const/usetTypes";
import { store } from "../../redux/store";
import { toast } from "react-toastify";

function Main() {
  const data = useSelector((store) => store.UsersReducer.users);
  const [editData, setEditData] = useState({ name: "", surname: "", id: null });

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
      .catch((error) =>
        toast.info(
          "HTTPS request is invalid or there is some error Please try again",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        )
      );
  }, []);

  const name = useRef(null);

  const surname = useRef(null);

  async function addUser(data) {
    await axios
      .post(BASE_URL + "/users", data)
      .then((res) => {
        dispatch({ type: userType.addUser, payload: res.data });
        toast.success("Datas added successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
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
      .catch((error) =>
        toast.error("Failed to add information, please try again", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
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

  async function deleteUser(id) {
    await axios
      .delete(BASE_URL + "/users/" + id)
      .then((res) => {
        dispatch({ type: userType.delUser, payload: id });
        toast.success("Data deleted successfully :)", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((error) =>
        toast.warn("Data was not deleted :(", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      );
  }

  async function editedUser(data, id) {
    await axios
      .put(BASE_URL + "/users/" + id, data)
      .then((res) => {
        dispatch({ type: userType.editUser, payload: data });
        toast("Your information has been edited successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((error) =>
        toast("Your information has not been edited", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      );
  }

  function editedForm(event) {
    event.preventDefault();
    if (editData.name == "" || editData.surname == "" || !editData.id) {
      toast.info("Please, select one of the details in the pass to edit", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      const newEditedUserObj = {
        id: editData.id,
        name: editData.name,
        surname: editData.surname,
\
      };
      editedUser(newEditedUserObj, editData.id);
    }
    setEditData({ name: "", surname: "", id: null });
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
        <form onSubmit={(event) => editedForm(event)} className="edit-form">
          <input
            // value={editedName}
            // ref={userName}
            value={editData.name}
            type="text"
            className="form-control edit-name"
            placeholder="please write edit-user_name..."
            required
            onChange={(evt) =>
              setEditData((p) => ({ ...p, name: evt.target.value }))
            }
          />
          <input
            // value={}
            // ref={userSurname}
            value={editData.surname}
            type="text"
            className="form-control edit-surname"
            placeholder="please write edit-user_surname..."
            required
            onChange={(evt) =>
              setEditData((p) => ({ ...p, surname: evt.target.value }))
            }
          />
          <button className="add-name-surname btn btn-primary">
            Edit & Submit
          </button>
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
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      const coniform = window.confirm("Do you want to delete?");
                      if (coniform) {
                        deleteUser(item.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      setEditData((p) => ({
                        name: item.name,
                        surname: item.surname,
                        id: item.id,
                      }))
                    }
                    className="btn btn-warning"
                  >
                    Edit
                  </button>
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
