import React, { useState, useEffect, useRef } from "react";

import { DropdownProps, Option } from "./types";
import { DropdownContainer } from "./styles";

function Dropdown({
  list = [],
  visible = false,
  style = { top: "-20px" },
  onSelected,
  onClosed,
}: DropdownProps) {
  const dropdownRef = useRef(document.createElement("ul"));
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemRefs = useRef(new Array(list.length));

  // Focus the current item when currentIndex changes
  useEffect(() => {
    if (itemRefs.current[currentIndex]) {
      itemRefs.current[currentIndex].focus();
    }
  }, [currentIndex]);

  // Handle key down events
  const handleKeyDown = (event: any, index: number, item: Option) => {
    if (event.key === "ArrowDown") {
      event.preventDefault(); // Prevent page scrolling
      const nextIndex = index + 1 < list.length ? index + 1 : 0;
      setCurrentIndex(nextIndex);
    } else if (event.key === "ArrowUp") {
      event.preventDefault(); // Prevent page scrolling
      const prevIndex = index - 1 >= 0 ? index - 1 : list.length - 1;
      setCurrentIndex(prevIndex);
    } else if (event.key === "Enter") {
      setCurrentIndex(-1);
      onSelected(item);
    }
  };

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
    onSelected(item);
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
            ref={(el) => (itemRefs.current[index] = el)}
            onKeyDown={(event) => handleKeyDown(event, index, item)}
          >
            <li>{item.label}</li>
          </div>
        ))}
      </ul>
    </DropdownContainer>
  );
}

export default Dropdown;
