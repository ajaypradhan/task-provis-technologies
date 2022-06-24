import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../spinner/Spinner";

const ViewContact = () => {
  let { contactId } = useParams();

  const [state, setState] = useState({
    loading: false,
    contact: {},
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

  let { loading, contact, errorMessage } = state;

  return (
    <>
      <section className="view-contact-i  p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-warning">Contact Details</p>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(contact).length > 0 && (
            <section className="view-contact-body mt-3">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt=""
                      className="contact-update-profile"
                    />
                  </div>
                  <div className="col-md-8">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-action">
                        Name : <span className="fw-bold">{contact.name}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Phone : <span className="fw-bold">{contact.phone}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Email : <span className="fw-bold">{contact.email}</span>
                      </li>
                      {/* <li className="list-group-item list-group-item-action">
                      Group : <span className="fw-bold"></span>
                    </li> */}
                    </ul>
                  </div>
                </div>
                <div className="row m-5">
                  <div className="col">
                    <Link to={"/contacts/list"} className="btn btn-warning">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default ViewContact;
