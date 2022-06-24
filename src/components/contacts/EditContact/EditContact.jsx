import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../spinner/Spinner";

const EditContact = () => {
  let navigate = useNavigate();

  let { contactId } = useParams();
  const [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photoUrl: "",
      phone: "",
      email: "",
    },
    errorMessage: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getContact(contactId);
        // console.log(response.data);
        setState({ ...state, loading: false, contact: response.data });
      } catch (error) {
        setState({ ...state, loading: false, errorMessage: error.message });
      }
    }
    fetchData();
  }, [contactId]);

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  let submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.updateContact(
        state.contact,
        contactId
      );
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate(`/contacts/edit/${contactId}`, { replace: false });
    }
  };

  let { loading, contact, errorMessage } = state;
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="add-contact p-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h3">Edit contact</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        name="name"
                        value={contact.name}
                        onChange={updateInput}
                        required="true"
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="photoUrl"
                        value={contact.photoUrl}
                        onChange={updateInput}
                        required="true"
                        type="text"
                        className="form-control"
                        placeholder="Profile picture url"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="phone"
                        value={contact.phone}
                        onChange={updateInput}
                        required="true"
                        type="text"
                        className="form-control"
                        placeholder="Phone No."
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="email"
                        value={contact.email}
                        onChange={updateInput}
                        required="true"
                        type="text"
                        className="form-control"
                        placeholder="E-mail ID"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Save Changes"
                      />
                      <Link
                        to={"/contacts/list"}
                        className="btn btn-danger mx-2"
                      >
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-6 ">
                  <img
                    src={contact.photoUrl}
                    alt=""
                    className="contact-update-profile"
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
