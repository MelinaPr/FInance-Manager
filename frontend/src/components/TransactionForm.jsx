import { useState } from "react";
import "./TransactionForm.css";
import fetchAddTransaction from "../api/fetchAddTransaction";

export default function TransactionForm(props) {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");


  function onSubmitTransaction() {
    let object =  {
      amount: amount,
      date: date,
      description: description,
      category: props.categories.filter((cat) => cat.name === category)[0].id
    }
    fetchAddTransaction(object)
  }

  return (
    <div className="TransactionForm">
      <h3>Add a new transaction</h3>
      <form className="TransactionForm">
        <input
          type="date"
          className="TransactionForm-date"
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Enter description"
          className="TransactionForm-text"
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Enter amount"
          className="TransactionForm-amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <select
          className="TransactionForm-category"
          onChange={(e) => setCategory(e.target.value)}
        >
          {props.categories.map((category) => {
            return <option key={category.id}>{category.name}</option>;
          })}
        </select>
      </form>
      <button
        className="TransactionForm-button"
        onClick={() => onSubmitTransaction()}
      >
        Add transaction
      </button>
    </div>
  );
}
