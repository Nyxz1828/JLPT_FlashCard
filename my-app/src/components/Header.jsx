function Header() {
  const menuItems = ["Levels", "Errors", "Notes", "Test"];

  return (
    <aside
      style={{
        width: "220px",
        minHeight: "100vh",
        backgroundColor: "#1e1e2f",
        color: "white",
        padding: "24px 16px",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ marginBottom: "24px", fontSize: "22px" }}>Flash Card</h2>

      <nav>
        {menuItems.map((item) => (
          <div
            key={item}
            style={{
              padding: "12px 14px",
              marginBottom: "12px",
              borderRadius: "10px",
              backgroundColor: "#2c2c44",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            {item}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Header;