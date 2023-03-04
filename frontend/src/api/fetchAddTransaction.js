const fetchAddTransaction = async (data) => {
    console.log(data)
  const res = await fetch("http://localhost:3000/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
};

export default fetchAddTransaction;
