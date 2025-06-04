import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ReceiptForm from "./components/ReceiptForm";
import ReceiptList from "./components/ReceiptList";
import Statistics from "./components/Statistics";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [receipts, setReceipts] = useLocalStorage("receipts", []);
  const [receiptToEdit, setReceiptToEdit] = useState(null);

  const handleSave = (receipt) => {
    if (receiptToEdit) {
      setReceipts((prev) =>
        prev.map((r) => (r.id === receiptToEdit.id ? { ...receipt, id: receiptToEdit.id } : r))
      );
      setReceiptToEdit(null);
    } else {
      setReceipts((prev) => [...prev, { ...receipt, id: uuidv4() }]);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Удалить этот чек?")) {
      setReceipts((prev) => prev.filter((r) => r.id !== id));
      if (receiptToEdit && receiptToEdit.id === id) {
        setReceiptToEdit(null);
      }
    }
  };

  const handleEdit = (receipt) => {
    setReceiptToEdit(receipt);
  };

  const handleCancelEdit = () => {
    setReceiptToEdit(null);
  };

  return (
    <div>
      <ReceiptForm onSave={handleSave} receiptToEdit={receiptToEdit} onCancel={handleCancelEdit} />
      <ReceiptList receipts={receipts} onDelete={handleDelete} onEdit={handleEdit} />
      <Statistics receipts={receipts} />
    </div>
  );
}

export default App;
