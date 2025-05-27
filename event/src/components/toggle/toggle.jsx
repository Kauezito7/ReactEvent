import React from "react";
import "./toggle.css"

const Toggle = () => {
    return (
        <>
            <div className="teste">
                <label className="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                </label>
            </div>
        </>
    )
}

export default Toggle;