import { useState } from "react";
import { addReferrals } from "../../store";
import { useDispatch } from "react-redux";

const BusinessUsers = () => {
  const currentDate = new Date().toLocaleDateString("en-GB");

  const dispatch = useDispatch();

  const [newReferral, setNewReferral] = useState({
    createDate: currentDate,
    createdBy: "",
    patient: "",
    patientDob: "",
    referralType: "",
    provider: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReferral({ ...newReferral, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addReferrals(newReferral));
    setNewReferral({
      createDate: "",
      createdBy: "",
      patient: "",
      patientDob: "",
      referralType: "",
      provider: "",
      status: "",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Create Date:</label>
        <input
          type="text"
          name="createDate"
          value={newReferral.createDate}
          onChange={handleInputChange}
          placeholder="YYYY-MM-DD"
        />
      </div>

      <div>
        <label>Created By:</label>
        <input
          type="text"
          name="createdBy"
          value={newReferral.createdBy}
          onChange={handleInputChange}
          placeholder="Created By"
        />
      </div>

      <div>
        <label>Patient:</label>
        <input
          type="text"
          name="patient"
          value={newReferral.patient}
          onChange={handleInputChange}
          placeholder="Patient"
        />
      </div>

      <div>
        <label>Patient Date of Birth:</label>
        <input
          type="date"
          name="patientDob"
          value={newReferral.patientDob}
          onChange={handleInputChange}
          placeholder="YYYY-MM-DD"
        />
      </div>

      <div>
        <label>Request Type:</label>
        <input
          type="text"
          name="referralType"
          value={newReferral.referralType}
          onChange={handleInputChange}
          placeholder="Request Type"
        />
      </div>

      <div>
        <label>Provider:</label>
        <input
          type="text"
          name="provider"
          value={newReferral.provider}
          onChange={handleInputChange}
          placeholder="Provider"
        />
      </div>

      <div>
        <label>Status:</label>
        <input
          type="text"
          name="status"
          value={newReferral.status}
          onChange={handleInputChange}
          placeholder="Status"
        />
      </div>

      <button type="submit">Add Request</button>
    </form>
  );
};

export default BusinessUsers;
