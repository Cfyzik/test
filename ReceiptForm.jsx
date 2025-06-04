import React, { useState, useEffect } from "react";
import "./style.css";

const categories = ["Продукты", "Транспорт", "Развлечения", "Медицина", "Другие"];
const currencies = ["RUB", "USD", "EUR"];

function ReceiptForm({ onSave, receiptToEdit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    currency: "RUB",
    date: "",
    category: categories[0],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (receiptToEdit) {
      setFormData(receiptToEdit);
    }
  }, [receiptToEdit]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Название обязательно";
    const amountNum = parseFloat(formData.amount);
    if (isNaN(amountNum) || amountNum <= 0) newErrors.amount = "Сумма должна быть больше нуля";
    if (!formData.date) newErrors.date = "Дата обязательна";
    else if (isNaN(new Date(formData.date).getTime())) newErrors.date = "Некорректная дата";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({ ...formData, amount: parseFloat(formData.amount) });
      setFormData({
        title: "",
        amount: "",
        currency: "RUB",
        date: "",
        category: categories[0],
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="receipt-form">
      <h3>{receiptToEdit ? "Редактировать чек" : "Добавить чек"}</h3>

      <label className="form-label">
        Название:
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </label>
      {errors.title && <div className="error-message">{errors.title}</div>}

      <label className="form-label">
        Сумма:
        <input type="number" step="0.01" min="0" name="amount" value={formData.amount} onChange={handleChange} />
      </label>
      {errors.amount && <div className="error-message">{errors.amount}</div>}

      <label className="form-label">
        Валюта:
        <select name="currency" value={formData.currency} onChange={handleChange}>
          {currencies.map((cur) => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
      </label>

      <label className="form-label">
        Дата:
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
      </label>
      {errors.date && <div className="error-message">{errors.date}</div>}

      <label className="form-label">
        Категория:
        <select name="category" value={formData.category} onChange={handleChange}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </label>

      <div className="button-group">
        <button type="submit">{receiptToEdit ? "Сохранить" : "Добавить"}</button>
        {receiptToEdit && (
          <button type="button" onClick={onCancel} className="cancel-button">
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}

export default ReceiptForm;
