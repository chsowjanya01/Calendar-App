import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [communications, setCommunications] = useState({});
  const [highlightOverrides, setHighlightOverrides] = useState({});
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newCommunication, setNewCommunication] = useState({ type: '', date: '', notes: '' });

  useEffect(() => {
    const storedCompanies = localStorage.getItem('companies');
    if (storedCompanies) {
      setCompanies(JSON.parse(storedCompanies));
    }

    const storedCommunications = localStorage.getItem('communications');
    if (storedCommunications) {
      setCommunications(JSON.parse(storedCommunications));
    }

    const storedOverrides = localStorage.getItem('highlightOverrides');
    if (storedOverrides) {
      setHighlightOverrides(JSON.parse(storedOverrides));
    }
  }, []);

  const getNextScheduledCommunication = (company) => {
    const periodicity = parseInt(company.periodicity.replace(/\D/g, ''), 10);
    const lastCommunications = communications[company.name] || [];
    const lastDate = lastCommunications.length
      ? new Date(lastCommunications[lastCommunications.length - 1].date)
      : null;
  
    if (!lastDate || isNaN(periodicity)) {
      return { date: 'Invalid Date', status: '' };
    }
  
    const nextDate = new Date(lastDate);
    nextDate.setDate(nextDate.getDate() + periodicity * 7);
  
    const today = new Date();
    // Normalize both dates to ignore the time component for accurate comparison
    const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const normalizedNextDate = new Date(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate());
  
    let status = '';
    if (normalizedNextDate < normalizedToday) {
      status = 'Overdue';
    } else if (normalizedNextDate.getTime() === normalizedToday.getTime()) {
      status = 'Due Today';
    } else {
      status = 'On Track';
    }
  
    return {
      date: nextDate.toISOString().split('T')[0],
      status,
    };
  };  

  const handleLogCommunication = () => {
    if (!newCommunication.type || !newCommunication.date) {
      alert('Please fill all fields!');
      return;
    }
  
    const updatedCommunications = { ...communications };
    selectedCompanies.forEach((companyName) => {
      if (!updatedCommunications[companyName]) {
        updatedCommunications[companyName] = [];
      }
      updatedCommunications[companyName].push(newCommunication);
    });
  
    setCommunications(updatedCommunications);
    localStorage.setItem('communications', JSON.stringify(updatedCommunications));
  
    const updatedOverrides = { ...highlightOverrides };
    selectedCompanies.forEach((companyName) => {
      delete updatedOverrides[companyName];
    });
  
    setHighlightOverrides(updatedOverrides);
    localStorage.setItem('highlightOverrides', JSON.stringify(updatedOverrides));
  
    setNewCommunication({ type: '', date: '', notes: '' });
    setModalOpen(false);
    alert('Communication logged successfully!');
  };  

  const handleCompanySelection = (companyName) => {
    setSelectedCompanies((prevSelected) => {
      if (prevSelected.includes(companyName)) {
        return prevSelected.filter((name) => name !== companyName);
      } else {
        return [...prevSelected, companyName];
      }
    });
  };

  const getNotificationCount = () => {
    let overdueCount = 0;
    let dueTodayCount = 0;
    
    companies.forEach((company) => {
      const nextComm = getNextScheduledCommunication(company);
      if (nextComm.status === 'Overdue') {
        overdueCount++;
      } else if (nextComm.status === 'Due Today') {
        dueTodayCount++;
      }
    });

    return { overdueCount, dueTodayCount };
  };

  const { overdueCount, dueTodayCount } = getNotificationCount();

  return (
    <div>
      <h3>Dashboard</h3>
      <p>Below is the list of companies:</p>

      {companies.length === 0 ? (
        <p>No companies found. Please add companies in the Admin Module.</p>
      ) : (
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Last Five Communications</th>
              <th>Next Scheduled Communication</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => {
              const nextComm = getNextScheduledCommunication(company);
              const override = highlightOverrides[company.name];
              const backgroundColor =
                override || nextComm.status === 'On Track'
                  ? 'white'
                  : nextComm.status === 'Due Today'
                  ? 'yellow'
                  : nextComm.status === 'Overdue'
                  ? 'red'
                  : 'white';

              return (
                <tr key={index} style={{ backgroundColor }}>
                  <td>{company.name}</td>
                  <td>{company.location}</td>
                  <td>
                    {(communications[company.name] || []).slice(-5).map((comm, i) => (
                      <div key={i} title={comm.notes} style={{ cursor: 'pointer' }}>
                        {comm.type} - {comm.date}
                      </div>
                    ))}
                  </td>
                  <td>{nextComm.date}</td>
                  <td>{nextComm.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Notification Icon */}
      <div className="notification-icon">
        <span className="icon">🔔</span>
        <span className="badge">{overdueCount + dueTodayCount}</span>
      </div>

      {/* Overdue Communications Grid */}
      <h3>Overdue Communications</h3>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Next Scheduled Communication</th>
          </tr>
        </thead>
        <tbody>
          {companies
            .filter((company) => getNextScheduledCommunication(company).status === 'Overdue')
            .map((company, index) => {
              const nextComm = getNextScheduledCommunication(company);
              return (
                <tr key={index}>
                  <td>{company.name}</td>
                  <td>{company.location}</td>
                  <td>{nextComm.date}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* Today's Communications Grid */}
      <h3>Today's Communications</h3>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Next Scheduled Communication</th>
          </tr>
        </thead>
        <tbody>
          {companies
            .filter((company) => getNextScheduledCommunication(company).status === 'Due Today')
            .map((company, index) => {
              const nextComm = getNextScheduledCommunication(company);
              return (
                <tr key={index}>
                  <td>{company.name}</td>
                  <td>{company.location}</td>
                  <td>{nextComm.date}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* Button to open modal */}
      <button onClick={() => setModalOpen(true)}>Communication Performed</button>

      {/* Modal for logging communication */}
      {modalOpen && (
        <div className="modal">
          <h3>Log Communication</h3>
          <label>Select Company(ies):</label>
          <div>
            {companies.map((company) => (
              <div key={company.name}>
                <input
                  type="checkbox"
                  id={company.name}
                  checked={selectedCompanies.includes(company.name)}
                  onChange={() => handleCompanySelection(company.name)}
                />
                <label htmlFor={company.name}>{company.name}</label>
              </div>
            ))}
          </div>
          <br />

          <label>Type of Communication:</label>
          <input
            type="text"
            placeholder="Type (e.g., LinkedIn Post)"
            value={newCommunication.type}
            onChange={(e) => setNewCommunication({ ...newCommunication, type: e.target.value })}
          />
          <br />

          <label>Date of Communication:</label>
          <input
            type="date"
            value={newCommunication.date}
            onChange={(e) => setNewCommunication({ ...newCommunication, date: e.target.value })}
          />
          <br />

          <label>Notes:</label>
          <textarea
            placeholder="Add Notes"
            value={newCommunication.notes}
            onChange={(e) => setNewCommunication({ ...newCommunication, notes: e.target.value })}
          />
          <br />

          <button onClick={handleLogCommunication}>Submit</button>
          <button onClick={() => setModalOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;