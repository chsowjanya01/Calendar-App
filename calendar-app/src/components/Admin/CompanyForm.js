import React, { useState, useEffect } from 'react';
import './CompanyForm.css';


const CompanyForm = () => {
  const [company, setCompany] = useState({
    name: '',
    location: '',
    linkedin: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
    periodicity: ''
  });
  const [companies, setCompanies] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Load companies from localStorage when the component mounts
  useEffect(() => {
    const storedCompanies = localStorage.getItem('companies');
    if (storedCompanies) {
      setCompanies(JSON.parse(storedCompanies));
    }
  }, []);

  // Save companies to localStorage whenever they change
  useEffect(() => {
    if (companies.length > 0) {
      localStorage.setItem('companies', JSON.stringify(companies));
    }
  }, [companies]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updatedCompanies = [...companies];
      updatedCompanies[editIndex] = company;
      setCompanies(updatedCompanies);
      setEditIndex(null);
    } else {
      setCompanies([...companies, company]);
    }

    alert('Company saved successfully!');
    setCompany({
      name: '',
      location: '',
      linkedin: '',
      emails: '',
      phoneNumbers: '',
      comments: '',
      periodicity: ''
    });
  };

  const handleEdit = (index) => {
    setCompany(companies[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedCompanies = companies.filter((_, i) => i !== index);
    setCompanies(updatedCompanies);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{editIndex !== null ? 'Edit Company' : 'Add Company'}</h2>
        <input type="text" name="name" placeholder="Name" value={company.name} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={company.location} onChange={handleChange} />
        <input type="url" name="linkedin" placeholder="LinkedIn Profile" value={company.linkedin} onChange={handleChange} />
        <input type="email" name="emails" placeholder="Emails (comma-separated)" value={company.emails} onChange={handleChange} />
        <input type="text" name="phoneNumbers" placeholder="Phone Numbers (comma-separated)" value={company.phoneNumbers} onChange={handleChange} />
        <textarea name="comments" placeholder="Comments" value={company.comments} onChange={handleChange}></textarea>
        <input type="text" name="periodicity" placeholder="Communication Periodicity (e.g., 2 weeks)" value={company.periodicity} onChange={handleChange} />
        <button type="submit">{editIndex !== null ? 'Update Company' : 'Add Company'}</button>
      </form>

      <h3>Company List</h3>
<table className="company-table">
  <thead>
    <tr>
      <th>Company Name</th>
      <th>Location</th>
      <th>Periodicity</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {companies.map((comp, index) => (
      <tr key={index}>
        <td>{comp.name}</td>
        <td>{comp.location}</td>
        <td>{comp.periodicity}</td>
        <td>
          {/* Using Font Awesome icons */}
          <button className="edit-btn" onClick={() => handleEdit(index)}>
            <i className="fas fa-pencil-alt"></i>
          </button>
          <button className="delete-btn" onClick={() => handleDelete(index)}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
};

export default CompanyForm;