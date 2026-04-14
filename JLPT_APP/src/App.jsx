import Header from "./components/Header";
import MainPage from "./pages/MainPage";

export default function App() {
  const menuItems = [
    { id: 1, label: "Element 1" },
    { id: 2, label: "Element 2" },
    { id: 3, label: "Element 3" },
    { id: 4, label: "Element 4" },
    { id: 5, label: "Element 5" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex font-sans">
      <Header items={menuItems} />
      <MainPage />
    </div>
  );
}