function CategoryList({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="pill-list">
      <button
        className={`pill ${selectedCategory === "All" ? "pill-active" : ""}`}
        onClick={() => onSelectCategory("All")}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          className={`pill ${selectedCategory === category ? "pill-active" : ""}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryList;
