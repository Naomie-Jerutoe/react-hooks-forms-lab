import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchItem, setSearchItem] = useState("");
  const [addItems, setAddItems] = useState([]);

  function handleSearchChange(event) {
    setSearchItem(event.target.value);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const itemsToDisplay = items.concat(addItems).filter((item) => {
    const categoryMatch =
      selectedCategory === "All" || item.category === selectedCategory;

    const searchMatch = item.name
      .toLowerCase()
      .includes(searchItem.toLowerCase());

    return categoryMatch && searchMatch;
  });

  function handleItemFormSubmit(newItem) {
    setAddItems((prevItems) => [...prevItems, newItem]);
  }

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
        search={searchItem}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
