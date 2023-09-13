import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CurrentInventory() {
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    // Fetch data from your backend API
    axios.get('http://localhost:5000/Admin/Current-Inventory') // Update the URL
      .then((response) => {
        console.log(response.data); // Add this line for debugging
        setExcelData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>CURRENT Inventory</h1>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Abbreviation</th>
            <th>Make</th>
            <th>Model / Product Number</th>
            <th>Serial No./Product id</th>
            <th>Dept</th>
            <th>Internal Sl. No.</th>
            <th>SKU Code</th>
            <th>Name</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          {excelData.map((row, index) => (
            <tr key={index}>
              <td>{row['S.No']}</td>
              <td>{row['Category']}</td>
              <td>{row['Sub Category']}</td>
              <td>{row['Abbreviation']}</td>
              <td>{row['Make']}</td>
              <td>{row['Model / Product Number']}</td>
              <td>{row['Serial No./Product id']}</td>
              <td>{row['Dept']}</td>
              <td>{row['Internal Sl. No.']}</td>
              <td>{row['SKU Code']}</td>
              <td>{row['Name']}</td>
              <td>{row['Remark']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CurrentInventory;






// import React, { useState } from 'react';
// import './CurrentInventory.css';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const CurrentInventory = () => {
//   const initialRows = Array.from({ length: 5 }, (_, index) => ({ id: index + 1, data: {} }));
//   const [rows, setRows] = useState(initialRows);
//   const [showCheckboxes, setShowCheckboxes] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]);

//   const addRow = () => {
//     const newRow = { id: rows.length + 1, data: {} };
//     setRows([...rows, newRow]);
//   };



//   const [formData, setFormData] = useState({
//     Category: '',
//     SubCategory: '',
//     Abbreviation: '',
//     Make: '',
//     ModelProductNo: '',
//     SerialNoProductID: '',
//     Dept: '',
//     InternalSINo: '',
//     SKUCode: '',
//     Name: '',
//     Remark: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/Admin/inventories',formData);
//       console.log('Inventory inserted successfully.');
//       toast.success('Inventory inserted successfully.');
//         setFormData({
//           Category: '',
//           SubCategory: '',
//           Abbreviation: '',
//           Make: '',
//           ModelProductNo: '',
//           SerialNoProductID: '',
//           Dept: '',
//           InternalSINo: 0,
//           SKUCode: '',
//           Name: '',
//           Remark: '',
//         });
//     } catch (error) {
//       console.error('An error occurred.:', error);
//     }
//   };


//   const toggleCheckboxes = () => {
//     setShowCheckboxes(!showCheckboxes);
//     setSelectedRows([]); // Clear selected rows when toggling checkboxes
//   };

//   const deleteSelectedRows = () => {
//     const updatedRows = rows.filter((_, index) => !selectedRows.includes(index));
//     // Renumber the rows
//     const renumberedRows = updatedRows.map((row, index) => ({ ...row, id: index + 1 }));
//     setRows(renumberedRows);
//     // Clear selected rows
//     setSelectedRows([]);
//   };

//   const handleRowSelect = (index) => {
//     if (selectedRows.includes(index)) {
//       setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
//     } else {
//       setSelectedRows([...selectedRows, index]);
//     }
//   };

//   const handleInputChange = (rowIndex, columnName, value) => {
//     const updatedRows = [...rows];
//     updatedRows[rowIndex].data[columnName] = value;
//     setRows(updatedRows);
//   };

//   const generateSKUCode = (row) => {
//     const { data } = row;
//     const category = data.category || '';
//     const abbreviation = data.abbreviation || '';
//     const internalSlNo = data.internalSlNo || '';
//     const serialNo = data.serialNo || '';
//     const lastThreeSerialNo = serialNo.slice(-3);
//     const skuCode = `DD/${category}/${abbreviation}/${internalSlNo}/${lastThreeSerialNo}`;
//     return skuCode.replace(/\/+/g, '/'); // Remove any duplicate slashes if present
//   };
  
  

//   return (
//     <form>
//       <div className="current-inventory">
//         <h2>Inventories</h2>
//         <div className="inventory">
//           <table>
//             <thead>
//               <tr>
//                 {showCheckboxes && <th>Select</th>}
//                 <th>S.No.</th>
//                 <th>Category</th>
//                 <th>Sub Category</th>
//                 <th>Abbreviation</th>
//                 <th>Make</th>
//                 <th>Model/Product No.</th>
//                 <th>Serial No./Product ID</th>
//                 <th>Dept.</th>
//                 <th>Internal SI.No.</th>
//                 <th>SKU Code</th>
//                 <th>Name</th>
//                 <th>Remark</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rows.map((row, index) => (
//                 <tr key={index}>
//                   {showCheckboxes && (
//                     <td>
//                       <input
//                         type="checkbox"
//                         checked={selectedRows.includes(index)}
//                         onChange={() => handleRowSelect(index)}
//                       />
//                     </td>
//                   )}
//                   <td>{row.id}</td>
//                   <td>
//                     <input
//                       type="text"
//                       value={row.data.category || ''}
//                       onChange={(e) => handleInputChange(index, 'category', e.target.value)}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       value={row.data.subCategory || ''}
//                       onChange={(e) => handleInputChange(index, 'subCategory', e.target.value)}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       value={row.data.abbreviation || ''}
//                       onChange={(e) => handleInputChange(index, 'abbreviation', e.target.value)}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       value={row.data.make || ''}
//                       onChange={(e) => handleInputChange(index, 'make', e.target.value)}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       value={row.data.model || ''}
//                       onChange={(e) => handleInputChange(index, 'model', e.target.value)}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       value={row.data.serialNo || ''}
//                       onChange={(e) => handleInputChange(index, 'serialNo', e.target.value)}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       value={row.data.dept || ''}
//                       onChange={(e) => handleInputChange(index, 'dept', e.target.value)}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       value={row.data.internalSlNo || ''}
//                       onChange={(e) => handleInputChange(index, 'internalSlNo', e.target.value)}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       value={generateSKUCode(row)} // Populate SKU Code based on other fields
//                       readOnly // Make SKU Code input field read-only
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       value={row.data.name || ''}
//                       onChange={(e) => handleInputChange(index, 'name', e.target.value)}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       value={row.data.remark || ''}
//                       onChange={(e) => handleInputChange(index, 'remark', e.target.value)}
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="inventory-button">
//             {showCheckboxes ? (
//               <>
//                 <button type="button" onClick={deleteSelectedRows}>
//                   Delete
//                 </button>
//                 <button type="button" onClick={() => setShowCheckboxes(false)}>
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <button type="button" onClick={toggleCheckboxes}>
//                 Delete
//               </button>
//             )}
//             <button type="button" onClick={addRow}>
//               Add
//             </button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default CurrentInventory;














// import React, { useState } from 'react';
// import './CurrentInventory.css';

// const CurrentInventory = () => {
//     const [rows, setRows] = useState(Array.from({ length: 5 }, (_, index) => ({ id: index + 1 })));

//   const addRow = () => {
//     const newRow = { id: rows.length + 1 };
//     setRows([...rows, newRow]);
//   };

//   const deleteLastRow = () => {
//     if (rows.length > 0) {
//       const updatedRows = rows.slice(0, -1);
//       setRows(updatedRows);
//     }
//   };
//   return (
//     <div className="current-inventory">
//         <h2>Inventories</h2>
//       <div className="inventory">
//         <table>
//           <thead>
//             <tr>
//               <th>S.No.</th>
//               <th>Category</th>
//   <th>Sub Category</th>
//   <th>Abbreviation</th>
//   <th>Make</th>
//   <th>Model / Product Number</th>
//   <th>Serial No./Product id</th>
//   <th>Dept.</th>
//   <th>Internal Sl. No.</th>
//   <th>SKU Code</th>
//   <th>Name</th>
//   <th>Remark</th>
//             </tr>
//           </thead>
//           <tbody>
//              {rows.map((row, index) => (
//               <tr key={index}>
//                 <td>{row.id}</td>
//                 <td><input type="text" /></td>
//                 <td><input type="text" /></td>
//                 <td><input type="text" /></td>
//                 <td><input type="text" /></td>
//                 <td><input type="text" /></td>
//                 <td><input type="text" /></td>
//                 <td><input type="text" /></td>
//                 <td><input type="text" /></td>
//                 <td><input type="text" /></td>
//                 <td><input type="text" /></td>
//                 <td><input type="text" /></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="inventory-button">
//           <button onClick={addRow}>Add</button>
//           <button onClick={deleteLastRow}>Delete</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CurrentInventory;



























// import React, { useState } from 'react';
// import './CurrentInventory.css';

// const CurrentInventory = () => {
//     const initialRows = Array.from({ length: 5 }, (_, index) => ({ id: index + 1 }));
//     const [rows, setRows] = useState(initialRows);
//     const [showCheckboxes, setShowCheckboxes] = useState(false);
//     const [selectedRows, setSelectedRows] = useState([]);

//     const addRow = () => {
//         const newRow = { id: rows.length + 1 };
//         setRows([...rows, newRow]);
//     };

//     const toggleCheckboxes = () => {
//         setShowCheckboxes(!showCheckboxes);
//         setSelectedRows([]); // Clear selected rows when toggling checkboxes
//     };

//     const deleteSelectedRows = () => {
//         const updatedRows = rows.filter((_, index) => !selectedRows.includes(index));
//         setRows(updatedRows.map((row, index) => ({ ...row, id: index + 1 }))); // Renumber rows
//         // Clear selected rows
//         setSelectedRows([]);
//     };

//     const handleRowSelect = (index) => {
//         if (selectedRows.includes(index)) {
//             setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
//         } else {
//             setSelectedRows([...selectedRows, index]);
//         }
//     };

//     return (
//         <div className="current-inventory">
//             <h2>Inventories</h2>
//             <div className="inventory">
//                 <table>
//                     <thead>
//                         <tr>
//                             {showCheckboxes && <th>Select</th>}
//                             <th>S.No.</th>
//                             <th>Category</th>
//                             <th>Sub Category</th>
//                             <th>Abbreviation</th>
//                             <th>Make</th>
//                             <th>Model / Product Number</th>
//                             <th>Serial No./Product id</th>
//                             <th>Dept.</th>
//                             <th>Internal Sl. No.</th>
//                             <th>SKU Code</th>
//                             <th>Name</th>
//                             <th>Remark</th>            </tr>
//                     </thead>
//                     <tbody>
//                         {rows.map((row, index) => (
//                             <tr key={index}>
//                                 {showCheckboxes && (
//                                     <td>
//                                         <input
//                                             type="checkbox"
//                                             checked={selectedRows.includes(index)}
//                                             onChange={() => handleRowSelect(index)}
//                                         />
//                                     </td>
//                                 )}
//                                 <td>{row.id}</td>
//                                 <td><input type="text" /></td>
//                                 <td><input type="text" /></td>
//                                 <td><input type="text" /></td>
//                                 <td><input type="text" /></td>
//                                 <td><input type="text" /></td>
//                                 <td><input type="text" /></td>
//                                 <td><input type="text" /></td>
//                                 <td><input type="text" /></td>
//                                 <td><input type="text" /></td>
//                                 <td><input type="text" /></td>
//                                 <td><input type="text" /></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <div className="inventory-button">
//                     {showCheckboxes ? (
//                         <>
//                             <button onClick={deleteSelectedRows}>Delete</button>
//                             <button onClick={() => setShowCheckboxes(false)}>Cancel</button>
//                         </>
//                     ) : (
//                         <button onClick={toggleCheckboxes}>Delet</button>
//                     )}
//                     <button onClick={addRow}>Add</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CurrentInventory;