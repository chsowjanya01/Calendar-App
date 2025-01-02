import React, { useState, useEffect } from 'react';
import './CommunicationMethods.css'; // Add the CSS file

const CommunicationMethods = () => {
  const [methods, setMethods] = useState([
    { name: 'LinkedIn Post', description: 'Post on LinkedIn', mandatory: true, sequence: 1 },
    { name: 'LinkedIn Message', description: 'Message via LinkedIn', mandatory: true, sequence: 2 },
    { name: 'Email', description: 'Send email', mandatory: true, sequence: 3 },
    { name: 'Phone Call', description: 'Call the company', mandatory: false, sequence: 4 },
    { name: 'Other', description: 'Other methods of communication', mandatory: false, sequence: 5 }
  ]);
  const [method, setMethod] = useState({ name: '', description: '', mandatory: false, sequence: '' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedMethods = localStorage.getItem('methods');
    if (storedMethods) {
      setMethods(JSON.parse(storedMethods));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('methods', JSON.stringify(methods));
  }, [methods]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMethod({ ...method, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updatedMethods = [...methods];
      updatedMethods[editIndex] = method;
      setMethods(updatedMethods);
      setEditIndex(null);
    } else {
      setMethods([...methods, method]);
    }

    setMethod({ name: '', description: '', mandatory: false, sequence: '' });
  };

  const handleEdit = (index) => {
    setMethod(methods[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedMethods = methods.filter((_, i) => i !== index);
    setMethods(updatedMethods);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{editIndex !== null ? 'Edit Communication Method' : 'Add Communication Method'}</h2>
        <input
          type="text"
          name="name"
          placeholder="Method Name"
          value={method.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={method.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="sequence"
          placeholder="Sequence"
          value={method.sequence}
          onChange={handleChange}
          required
        />
        <label>
          Mandatory:
          <input
            type="checkbox"
            name="mandatory"
            checked={method.mandatory}
            onChange={handleChange}
          />
        </label>
        <button type="submit">{editIndex !== null ? 'Update Method' : 'Add Method'}</button>
      </form>

      <h3>Communication Methods</h3>
      <table className="methods-table">
        <thead>
          <tr>
            <th>Method Name</th>
            <th>Description</th>
            <th>Sequence</th>
            <th>Mandatory</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {methods.map((m, index) => (
            <tr key={index}>
              <td>{m.name}</td>
              <td>{m.description}</td>
              <td>{m.sequence}</td>
              <td>{m.mandatory ? 'Yes' : 'No'}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(index)}>
                  <i className="fas fa-pencil-alt"></i>
                </button>
                <button className="delete-btn" onClick={() => handleDelete(index)}>
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommunicationMethods;
