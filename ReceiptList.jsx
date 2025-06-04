import React, { useState, useMemo } from "react";
import "./style.css";

function ReceiptList({ receipts, onDelete, onEdit }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("date");
  const [sortAsc, setSortAsc] = useState(true);

  // Фильтрация и сортировка
  const filteredReceipts = useMemo(() => {
    let filtered = receipts.filter(r =>
      r.title.toLowerCase().includes(search.toLowerCase())
    );

    filtered.sort((a, b) => {
      let vA = a[sortKey];
      let vB = b[sortKey];

      if (sortKey === "date") {
        vA = new Date(vA);
        vB = new Date(vB);
      }
      if (vA < vB) return sortAsc ? -1 : 1;
      if (vA > vB) return sortAsc ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [receipts, search, sortKey, sortAsc]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="receipt-list-container">
      <h3>Список чеков</h3>

      <input
        type="text"
        placeholder="Поиск по названию"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <table className="receipt-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("title")} className="sortable">Название</th>
            <th onClick={() => handleSort("amount")} className="sortable">Сумма</th>
            <th onClick={() => handleSort("date")} className="sortable">Дата</th>
            <th onClick={() => handleSort("category")} className="sortable">Категория</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {filteredReceipts.length === 0 && (
            <tr>
              <td colSpan="5" className="no-data">Чеки не найдены</td>
            </tr>
          )}
          {filteredReceipts.map((r) => (
            <tr key={r.id}>
              <td>{r.title}</td>
              <td>{r.amount.toFixed(2)} {r.currency}</td>
              <td>{new Date(r.date).toLocaleDateString()}</td>
              <td>{r.category}</td>
              <td>
                <button onClick={() => onEdit(r)} className="action-button">Редактировать</button>
                <button onClick={() => onDelete(r.id)} className="action-button delete-button">Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReceiptList;

