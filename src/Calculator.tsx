import React from "react";
import { useState } from "react";
import calcStyle from "./Calculator.module.css";

const numbers: string[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  ".",
];
const signs: string[] = ["+", "-", "*", "/"];

const separateNums = (exp: string): string[] => {
  return exp.split(/[^\d\.]/);
};

const separateSigns = (exp: string): string[] => {
  return exp.split(/[\d|\.]+/).filter((x) => x);
};

const normalNums = (exp: string) => {
  return exp
    .split(/[^\d\.]/)
    .map((x: string, i: number) => {
      if (i === 0) {
        return `${+x}`;
      } else {
        return `${separateSigns(exp)[i - 1]} + ${+x}`;
      }
    })
    .join("");
};

function Calculator() {
  const [expression, setExpression] = useState<string>("");
  const [sign, setSign] = useState<string>("");

  const [answer, setAnswer] = useState<boolean>(false);

  const findValue = (expr: string, event: React.MouseEvent) => {
    event.preventDefault();

    console.log(normalNums(expr));

    if (sign) {
      return;
    }

    const findDevisionByZero = separateNums(expr).map((val, i) => {
      if (i != 0) {
        return separateSigns(expr)[i - 1] + `${+val}`;
      }
    });

    if (findDevisionByZero.some((x) => x === "/0")) {
      setAnswer(true);
      setExpression("Error, division by zero");
    } else {
      setAnswer(true);
      setExpression(`${eval(normalNums(expr))}`);
    }
  };

  const erace = (expr: string, event: React.MouseEvent) => {
    event.preventDefault();

    if (answer) {
      setExpression("");
      setAnswer(false);
      return;
    }

    if (sign) {
      setSign("");
    } else {
      setExpression(expr.slice(0, expr.length - 1));
    }
  };

  const addNum = (number: string, event: React.MouseEvent) => {
    event.preventDefault();

    if (!answer) {
      if (sign === "") {
        setExpression(expression + number);
      } else {
        setExpression(expression + sign + number);
        setSign("");
      }
    } else {
      setExpression(number);
      setSign("");
      setAnswer(false);
    }
  };

  const addSign = (sign: string, event: React.MouseEvent) => {
    event.preventDefault();

    setAnswer(false);
    if (expression) {
      setSign(sign);
    }
  };

  return (
    <div className={calcStyle.body}>
      <form className={calcStyle.form}>
        <input
          disabled
          className={calcStyle.input}
          type="text"
          value={expression + sign}
        />
        <section className={calcStyle.section}>
          <div className={calcStyle.calcDiv}>
            {numbers.map((number) => {
              return (
                <button
                  className={calcStyle.button}
                  onClick={(e) => addNum(number, e)}
                >
                  {number}
                </button>
              );
            })}
            <button
              className={calcStyle.button}
              onClick={(e) => findValue(expression, e)}
            >
              =
            </button>
          </div>
          <div className={calcStyle.signDiv}>
            {signs.map((sign) => {
              return (
                <button
                  className={calcStyle.button}
                  onClick={(e) => addSign(sign, e)}
                >
                  {sign}
                </button>
              );
            })}
          </div>
        </section>

        {expression ? (
          <button
            className={calcStyle.erace}
            onClick={(e) => erace(expression, e)}
          >
            {"<"}
          </button>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}

export default Calculator;
