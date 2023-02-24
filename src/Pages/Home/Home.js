import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ContentEditable from "react-contenteditable";
import "./Home.css";
const Home = () => {
  const [sudokuData, setSudokuData] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const difficulty =
    searchParams.get("difficulty") === "easy"
      ? 0.35
      : searchParams.get("difficulty") === "hard"
      ? 0.75
      : 0.55;
  // console.log(difficulty);

  const fetchSudokuData = async () => {
    const response = await fetch("/api/sudoku");
    const data = await response.json();
    // console.log(data);
    setSudokuData(data.data);
  };

  const checkSudoku = () => {
    const allDiv = document.querySelectorAll("#sudokuVal");
    const allDivValue = [];

    for (let i = 0; i < 9; i++) {
      allDivValue.push([]);
      for (let j = 0; j < 9; j++) {
        let val = allDiv[i * 9 + j].innerText;
        if (val === "") {
          alert("Please fill all the values");
          return;
        }
        if (val < 1 || val > 9) {
          alert("Please enter value between 1 to 9");
          return;
        }
        //  conver val to number
        val = parseInt(val);
        allDivValue[i].push(val);
      }
    }

    // console.log(allDivValue);
    // console.log("main data ", sudokuData);
    // console.log(currentSudoku);

    let count = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (parseInt(sudokuData[i][j]) === parseInt(allDivValue[i][j])) {
          count++;
        } else {
          // change color of input
          allDiv[i * 9 + j].style.backgroundColor = "red";
        }
      }
    }
    if (count === 81) {
      allDiv.forEach(function (div) {
        //   check if div background color is not #e9ecef
        if (div.style.backgroundColor !== "rgb(233, 236, 239)") {
          div.style.backgroundColor = "green";
        }
      });
    }
  };

  useEffect(() => {
    fetchSudokuData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <h3 className="text-center">Sudoku Game</h3>
          </div>
        </div>
        <div className="mt-4">
          <div
            className="container d-flex justify-content-center"
            style={{ maxWidth: 600 }}
          >
            <table
              style={{
                width: "100%",
                borderRadius: "10px",
              }}
            >
              <tbody>
                {/* place tr , td and input */}
                {sudokuData.map((row, rowIndex) => {
                  return (
                    <tr key={rowIndex}>
                      {row.map((col, colIndex) => {
                        const disabl = Math.random() > difficulty;
                        return (
                          <td key={colIndex}>
                            {disabl ? (
                              <ContentEditable
                                className="form-control"
                                style={{
                                  backgroundColor: "#e9ecef",
                                }}
                                id="sudokuVal"
                                html={col.toString()}
                                disabled
                              />
                            ) : (
                              <ContentEditable
                                className="form-control"
                                id="sudokuVal"
                                html=""
                                onChange={(e) => {
                                  if (isNaN(e.target.value)) {
                                    e.target.value = "";
                                  } else if (e.target.value > 9) {
                                    e.target.value = "";
                                  } else if (e.target.value < 1) {
                                    e.target.value = "";
                                  } else {
                                    //  set value of input
                                    sudokuData[rowIndex][colIndex] =
                                      e.target.value;
                                  }
                                }}
                              />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center mt-5">
            <button
              className={
                searchParams.get("difficulty") === "easy"
                  ? "btn btn-info fw-bold mx-2 "
                  : "btn btn-primary mx-2"
              }
              onClick={() => {
                setSearchParams({ difficulty: "easy" });
              }}
            >
              Easy
            </button>
            <button
              className={
                searchParams.get("difficulty") === "medium" ||
                searchParams.get("difficulty") === null
                  ? "btn btn-info fw-bold mx-2 "
                  : "btn btn-primary mx-2"
              }
              onClick={() => {
                setSearchParams({ difficulty: "medium" });
              }}
            >
              Medium
            </button>
            <button
              className={
                searchParams.get("difficulty") === "hard"
                  ? "btn btn-info fw-bold mx-2 "
                  : "btn btn-primary mx-2"
              }
              onClick={() => {
                setSearchParams({ difficulty: "hard" });
              }}
            >
              Hard
            </button>
            <button
              className="btn btn-success mx-3 fw-bold"
              onClick={checkSudoku}
            >
              Check
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
