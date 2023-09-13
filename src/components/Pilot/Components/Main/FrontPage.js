import React from 'react';
import "../Main/FrontPage.css";

function FrontPage() {
    return (
        <div>
            <h1>Pilot Access</h1>
            <nav className="Admin">
                <ul className="Nav-List">
                    <li>
                        <h5 >Project</h5>
                        <ul className="Dropdown">
                            <li><a href="/Pilot selected project">Select project</a></li>
                        </ul>
                    </li>
                    <li><h5>Inventory</h5>
                        <ul className='Dropdown'>
                            <li><a href="/">Add Inventory</a></li>
                            <li><a href="/">Manage  Inventory</a></li>
                        </ul></li>
                    <li><h5>SOP</h5></li>
                    <li><h5>Attendance</h5></li>
                    <li><h5>Vehicle</h5>
                        <ul className='Dropdown'>
                            <li><a href="/">Upload Daily Vehicle Run</a></li>
                            <li><a href="/">Upload Vehicle fuel Expense</a></li>
                        </ul></li>
                </ul>
            </nav>
        </div>
    );
}

export default FrontPage;
