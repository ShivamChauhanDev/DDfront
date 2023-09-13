import React, { useState } from 'react';
import './ItemShipment.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const ItemShipment = () => {
    const initialRows = Array.from({ length: 10 }, (_, index) => ({ id: index + 1, data: {} }));
    const [rows, setRows] = useState(initialRows);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const [formData, setFormData] = useState({
        Date: '',
        TypeOfItems: '',
        Brand: '',
        SerialNoProductId: '',
        Quantity: 0,
        TransferLocation: '',
        TransferDestination: '',
        ShippedBy: '',
        Repair: '',
        SentByEmployee: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post('http://localhost:5000/Admin/repair-list', formData);
          console.log('RepairList inserted successfully.');
          toast.success('RepairList inserted successfully.');
          // Reset the form after successful submission
          setFormData({
            Date: '',
            TypeOfItems: '',
            Brand: '',
            SerialNoProductId: '',
            Quantity: 0,
            TransferLocation: '',
            TransferDestination: '',
            ShippedBy: '',
            Repair: '',
            SentByEmployee: '',
          });
        } catch (error) {
          console.error('Error inserting data:', error);
        }
      };



    const addRow = () => {
        const newRow = { id: rows.length + 1, data: {} };
        setRows([...rows, newRow]);
    };

    const toggleCheckboxes = () => {
        setShowCheckboxes(!showCheckboxes);
        setSelectedRows([]); // Clear selected rows when toggling checkboxes
    };

    const deleteSelectedRows = () => {
        const updatedRows = rows.filter((_, index) => !selectedRows.includes(index));
        // Renumber the rows
        const renumberedRows = updatedRows.map((row, index) => ({ ...row, id: index + 1 }));
        setRows(renumberedRows);
        // Clear selected rows
        setSelectedRows([]);
    };

    const handleCheckboxChange = (index) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter((i) => i !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
    };

    const handleInputChange = (rowIndex, columnName, value) => {
        const updatedRows = [...rows];
        updatedRows[rowIndex].data[columnName] = value;
        setRows(updatedRows);
    };
  return (
    <div className="Shipment">
            <h2>Item Shipment</h2>
            <div className="Shipment-list">
                <table>
                    <thead>
                        <tr>
                            {showCheckboxes && <th>Select</th>}
                            <th>S.No.</th>
                            <th>Date</th>
                            <th>Type of Items</th>
                            <th>Brand</th>
                            <th>Serial No./Product Id</th>
                            <th>Quantity</th>
                            <th>Transfer Locaiton</th>
                            <th>Transfer Destination</th>
                            <th>Shipped by</th>
                            <th>Repair</th>
                            <th>Sent by Employee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                {showCheckboxes && (
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(index)}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                    </td>
                                )}
                                <td>{row.id}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.data.date || ''}
                                        onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.data.typeofitems || ''}
                                        onChange={(e) => handleInputChange(index, 'typeofitems', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.data.brand || ''}
                                        onChange={(e) => handleInputChange(index, 'brand', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.data.serialNo || ''}
                                        onChange={(e) => handleInputChange(index, 'serialNo', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.data.quantity || ''}
                                        onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.data.transferlocation || ''}
                                        onChange={(e) => handleInputChange(index, 'transferlocation', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.data.transferdestination || ''}
                                        onChange={(e) => handleInputChange(index, 'transferdestination', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.data.shippedby || ''}
                                        onChange={(e) => handleInputChange(index, 'shippedby', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.data.repair || ''}
                                        onChange={(e) => handleInputChange(index, 'repair', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.data.sentbyemployee || ''}
                                        onChange={(e) => handleInputChange(index, 'sentbyemployee', e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="Shipment-list">
                    {showCheckboxes ? (
                        <>
                            <button type="button" onClick={deleteSelectedRows}>
                                Delete
                            </button>
                            <button type="button" onClick={() => setShowCheckboxes(false)}>
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button type="button" onClick={toggleCheckboxes}>
                            Delete
                        </button>
                    )}
                    <button type="button" onClick={addRow}>
                        Add
                    </button>
                </div>
            </div>
        </div>
  );
};

export default ItemShipment;
