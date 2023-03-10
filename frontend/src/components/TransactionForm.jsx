import { useState } from "react";
import "./TransactionForm.css";
import fetchTransactions from "../api/fetchTransactions";
//import fetchAddTransaction from "../api/fetchAddTransaction";

export default function TransactionForm(props) {
  const [date, setDate] = useState(props.date);
  const [description, setDescription] = useState(props.description);
  const [category, setCategory] = useState(props.category);
  const [amount, setAmount] = useState(props.amount);
  const [type, setType] = useState(props.type);


  async function onSubmitTransaction() {
    if(date !== "" && description !== "" && category !== "" && amount !== "") {
    let object =  {
      id: props.id,
      amount: type === "Income" ? Number(amount) : Number(`-${amount}`),
      date: date,
      description: description,
      type: type,
      category: props.categories.filter((cat) => cat.name === category)[0].id
    }
    await props.onFetch(object)
    props.onClose("none")

    props.setTransactions(await fetchTransactions(props.transactions));} else {
      console.log("missing data")
    }
  }

  return (
    <div className="TransactionForm">
      <h3>{props.title}</h3>
      <form className="TransactionForm">
        <input
          type="date"
          className="TransactionForm-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Enter description"
          className="TransactionForm-text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Enter amount"
          className="TransactionForm-amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br/>
        <select
          className="TransactionForm-type"
          onChange={(e) => setType(e.target.value)}
          defaultValue={type}
        >
          <option selected hidden>Choose type</option>
          <option>Income</option>
          <option>Expense</option>
        </select>
        <br />
        <select
          className="TransactionForm-category"
          onChange={(e) => setCategory(e.target.value)}
          defaultValue={category}
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
        {props.buttonText}
      </button>
    </div>
  );
}
