import React, { useState } from "react";
import Navbar from "./Navbar";
// import Mode from "./Navbar";

export default function Textarea() {
  const [text, setText] = useState("");
  function alternateCaps(t) {
    var result = "";
    for (var i = 0; i < text.length; i++) {
      if (i % 2 === 0) {
        result += text.charAt(i).toUpperCase();
      } else {
        result += text.charAt(i).toLowerCase();
      }
    }
    return result;
  }

  const handleAlterClick = () => {
    var inputText = alternateCaps(Text);
    setText(inputText);
  };
  const handelUpClick = () => {
    // console.log("handelOnchange Clicked" + text);
    var newText = text.toUpperCase();
    setText(newText);
  };
  const handelDownClick = () => {
    var newText = text.toLowerCase();
    setText(newText);
  };
  const handelResetClick = () => {
    setText("Enter Text");
  };
  const handelOnChange = (event) => {
    // console.log('clicked');
    setText(event.target.value);
  };
  const handelCopyClick = () => {
    var text = document.getElementById("exampleFormControlTextarea1");
    text.select();
    navigator.clipboard.writeText(text.value);
  };
  const handelExtraSpaceClick = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
  };
  const liveUpperCase = (event) => {
    setText(event.target.value);
  };
  return (
    <>
      <Navbar />
      <div className="text">
        <div className="container ">
          <label
            htmlFor="exampleFormControlTextarea1"
            className="form-label fs-2"
            // data-bs-theme="light"
          >
            Text Playground
          </label>
          <textarea
            className="form-control border border-primary fs-3"
            id="exampleFormControlTextarea1"
            rows="8"
            value={text}
            onChange={handelOnChange}
            placeholder="Enter Text"
          ></textarea>

          <button className="btn btn-primary m-3" onClick={handelUpClick}>
            Convert to Uppercase
          </button>
          <button className="btn btn-primary m-3" onClick={handelDownClick}>
            Convert to Lowercase
          </button>
          <button className="btn btn-primary m-3" onClick={handleAlterClick}>
            Convert to Alternatecase
          </button>
          <button className="btn btn-primary m-3" onClick={handelCopyClick}>
            Copy Text
          </button>
          <button
            className="btn btn-primary m-3"
            onClick={handelExtraSpaceClick}
          >
            Remove Extra Space
          </button>
          <button className="btn btn-primary m-3" onClick={handelResetClick}>
            Reset
          </button>
          {/* <button type="reset">Reset</button> */}
        </div>
        <div className="container ">
          <h2>Upper Case Preview</h2>
          <p
            className="border border-primary p-2 rounded"
            onChange={liveUpperCase}
          >
            {text.toUpperCase()}
          </p>
          <h2>Lower Case Preview</h2>
          <p
            className="border border-primary p-2 rounded"
            onChange={liveUpperCase}
          >
            {text.toLowerCase()}
          </p>
          <h2>Text Summery Preview</h2>
          <div className="d-flex">
            <p className="border border-primary p-2 rounded w-50">
              {text.split(" ").length} Words And {text.length} Characters
            </p>
            <p>&nbsp;&nbsp;</p>
            <p className="border border-primary p-2 rounded w-50">
              {0.008 * text.split(" ").length} Minutes to read
            </p>
          </div>
          <h2>Text Preview Preview</h2>
          <p className="border border-primary p-2 rounded">{text}</p>
        </div>
      </div>
    </>
  );
}
