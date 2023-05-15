'use client'; 

import { useRef } from "react";

const Table = () => {
    const nameRef = useRef(""); 
    console.log(nameRef.current)
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td ref={nameRef}>salman sheriff</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table; 