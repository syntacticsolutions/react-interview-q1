import React, { useState, useEffect, useRef } from "react";

import { DropdownProps, Option } from "./types";
import { DropdownContainer } from "./styles";

function Dropdown({
  list = [],
  visible = false,
  style = { top: "-20px" },
  onSelected,
  onClosed
}: DropdownProps) {
  const dropdownRef = useRef(document.createElement("ul"));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target &&
        dropdownRef.current &&
        !dropdownRef.current?.contains(event.target as Node)
      ) {
        onClosed();
        document.removeEventListener("click", handleClickOutside);
      }
    };

    if (visible) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [visible]);

  const handleSelectItem = (item: Option) => () => {
    // Assuming you handle selected item or dispatch event here
    onSelected(item)
  };

  return (
    <DropdownContainer>
      <ul className={visible ? "visible" : ""} style={style} ref={dropdownRef}>
        {list.map((item, index) => (
          <div
            key={index}
            role="button"
            onClick={handleSelectItem(item)}
            tabIndex={0}
          >
            <li>{item.label}</li>
          </div>
        ))}
      </ul>
    </DropdownContainer>
  );
}

export default Dropdown;
