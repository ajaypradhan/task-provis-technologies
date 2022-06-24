import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../spinner/Spinner";

const ContactList = () => {
  let [state, setState] = useState({
    loading: false,
    contacts: [],
    errorMessage: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllContacts();
        // console.log(response.data)
        setState({ ...state, loading: false, contacts: response.data });
      } catch (error) {
        setState({ ...state, loading: false, errorMessage: error.message });
      }
    }
    fetchData();
  }, []);

  let clickkDelete = async (contactId) => {
    try {
      let response = await ContactService.deleteContact(contactId);
      if (response) {
        async function fetchData() {
          try {
            setState({ ...state, loading: true });
            let response = await ContactService.getAllContacts();
            // console.log(response.data)
            setState({ ...state, loading: false, contacts: response.data });
          } catch (error) {
            setState({ ...state, loading: false, errorMessage: error.message });
          }
        }
        fetchData();
      }
    } catch (error) {
      setState({ ...state, loading: false, errorMessage: error.message });
    }
  };

  let { loading, contacts, errorMessage } = state;

  return (
    <>
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3">
                  Contact Manager
                  <Link to={"/contacts/add"} className=" mx-2">
                    <i className="fa fa-plus-circle" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="contact-list mt-2">
            <div className="container">
              <div className="row">
                {contacts.length > 0 &&
                  contacts.map((contact) => {
                    return (
                      <div className="col-md-12 mb-3" key={contact.id}>
                        <div className="card border-0">
                          <div className="card-body">
                            <div className="row d-flex justify-content-around align-items-center">
                              <div className="d-flex align-items-center col-md-3">
                                <img
                                  src={contact.photoUrl}
                                  alt=""
                                  className="contact-img-profile"
                                />
                                <div>
                                  <span className="fw-bold mx-4">
                                    {contact.name}
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <span className="fw-bold mx-4">
                                  {contact.phone}
                                </span>
                              </div>
                              <div className="col-md-3">
                                <span className="fw-bold mx-4">
                                  {contact.email}
                                </span>
                              </div>
                              <div className="d-flex justify-content-around align-items-center col-md-3">
                                <Link to={`/contacts/view/${contact.id}`}>
                                  <i className="fa fa-eye text-primary" />
                                </Link>
                                <Link to={`/contacts/edit/${contact.id}`}>
                                  <i className="fa-solid fa-pen-to-square text-warning"></i>
                                </Link>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => clickkDelete(contact.id)}
                                >
                                  <i className="fa-solid fa-trash "></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ContactList;
