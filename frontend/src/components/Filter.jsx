import { useState , useEffect} from "react";
import "./Filter.css";
import fetchTransactions from "../api/fetchTransactions";

export default function Filter(props) {
  const [type, setType] = useState("All");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [amountButtonText, setAmountButtonText] = useState("Amount ▼");
  const [dateButtonText, setDateButtonText] = useState("Date ▼");
/*
  async function submitFilter() {
    let sortedAmount = await fetchTransactions({
      type: type,
      description: description,
      category: category,
      amount: amount,
      date: date,
    });
    console.log("sortedAm" +sortedAmount)
    await props.onSetFiltersData(sortedAmount);
  }*/

  useEffect(() => {
    async function submitFilter() {
      let sortedAmount = await fetchTransactions({
        type: type,
        description: description,
        category: category,
        amount: amount,
        date: date,
      });
      await props.onSetFiltersData(sortedAmount);
    }
    submitFilter();
  }, [type, description, category, amount, date]);

  //async
  function filterType(e) {
    setType(e.target.value);
    //await submitFilter();
  } 

  function sortAmount(e) {
    console.log(e.target.value)
    if (e.target.value === "sortDescending" || e.target.value === "") {
      setAmount("sortAscending");
      setAmountButtonText("Amount ▲");
      setDate("");
    } else if (e.target.value === "sortAscending" || e.target.value === "") {
      setAmount("sortDescending");
      setAmountButtonText("Amount ▼");
      setDate("");
    }
  }

  function sortDate(e) {
    if (e.target.value === "sortDescending" || e.target.value === "") {
      setDate("sortAscending");
      setDateButtonText("Date ▲");
      setAmount("");
    } else if (e.target.value === "sortAscending" || e.target.value === "") {
      setDate("sortDescending");
      setDateButtonText("Date ▼");
      setAmount("");
    }
  }

  function reset() {
    setType();
    setDescription();
    setCategory();
    setAmount();
    setDate();
  }

  return (
    <div className="allFilters">
      <h3>Filter transactions</h3>
      <form>
        <select
          className="filterByType"
          onChange={(e) => filterType(e)}
        >
          <option value={""}>All</option>
          <option>Expense</option>
          <option>Income</option>
        </select>
        <input
          className="searchName"
          placeholder="search for description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="searchCategory"
          placeholder="search for category"
          onChange={(e) => setCategory(e.target.value)}
        />
      </form>
      <hr style={{color: "rgba(55, 0, 55, 0.1)", width: "250px", marginLeft: "18px"}}/>
      <button className="filterButton" onClick={() => submitFilter()}>
        Filter
      </button>
      <button
        className="sortButton"
        value={amount}
        onClick={(e) => sortAmount(e)}
      >
        {amountButtonText}
      </button>
      <button className="sortButton" value={date} onClick={(e) => sortDate(e)}>
        {dateButtonText}
      </button>
      <button className="sortButton" onClick={() => reset()}>
        Reset filter
      </button>
    </div>
  );
}
