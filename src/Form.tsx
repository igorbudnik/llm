import React, { FormEvent, useState } from "react";

function Form() {
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");

  const sendAPI = async (e: FormEvent) => {
    e.preventDefault();
    console.log(`http://127.0.0.1:8000/${text.split(" ").join("_")}`);

    await fetch(`http://127.0.0.1:8000/${text.split(" ").join("_")}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Кривизна");
        }

        return response.json();
      })
      .then((data) => setAnswer(data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form onSubmit={(e) => sendAPI(e)}>
        <input
          type="text"
          value={text}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setText((e.target as HTMLInputElement).value)
          }
        />
        <input type="submit" value="Отправить" />
        {answer ? <div>{answer}</div> : ""}
      </form>
    </>
  );
}

export default Form;
