import React, { useState, useMemo } from "react";

function TextForm(props) {
  const [text, setText] = useState("");

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleConvertToUpperCase = () => {
    setText(text.toUpperCase());
    props.showAlert("Coverted to Uppercase", "Success");
  };

  const handleConvertToLowerCase = () => {
    setText(text.toLowerCase());
    props.showAlert("Coverted to Lowercase", "Success");
  };
  const clearText = () => {
    setText("");
    props.showAlert("text Cleared", "Success");
  };
  const handleCopy = () => {
    const textarea = document.getElementById("myBox"); // Select the textarea element
    textarea.select(); // Select its content
    navigator.clipboard.writeText(textarea.value);
    props.showAlert("Copied to Clipboard", "Success"); // Copy the selected text to the clipboard
  };
  const handleExtraSpaces = () => {
    let newText = text.split(/\s+/); // Split by one or more whitespace characters
    setText(newText.join(" ")); // Join with a single space
    props.showAlert("Extra Spaces Removed", "Success");
  };

  const wordCount = useMemo(() => {
    return text.split(/\s+/).filter((word) => word !== "").length;
  }, [text]);

  const characterCount = useMemo(() => {
    return text.replace(/\s/g, "").length;
  }, [text]);

  const estimatedReadingTime = useMemo(() => {
    return 0.008 * wordCount;
  }, [wordCount]);

  return (
    <>
      <div
        className="mb-3 container"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h1>{props.heading}</h1>
        <textarea
          className="form-control"
          value={text}
          onChange={handleInputChange}
          placeholder="Enter text here"
          id="myBox"
          rows="8"
          style={{
            backgroundColor: props.mode === "dark" ? "grey" : "white",
            color: props.mode === "dark" ? "white" : "black",
          }}
        />
      </div>
      <button
        className="btn btn-primary mx-2"
        onClick={handleConvertToUpperCase}
        disabled={text.length === 0}
      >
        Convert To Uppercase
      </button>
      <button
        className="btn btn-primary mx-2"
        onClick={handleConvertToLowerCase}
        disabled={text.length === 0}
      >
        Convert To Lowercase
      </button>
      <button
        className="btn btn-primary mx-2"
        onClick={clearText}
        disabled={text.length === 0}
      >
        Clear Text
      </button>
      <button
        className="btn btn-primary mx-2"
        onClick={handleCopy}
        disabled={text.length === 0}
      >
        Copy Text
      </button>
      <button
        className="btn btn-primary mx-2"
        onClick={handleExtraSpaces}
        disabled={text.length === 0}
      >
        Remove Extra Spaces
      </button>

      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h2>Your text summary</h2>
        <p>
          {wordCount} words and {characterCount} characters
        </p>
        <p>{estimatedReadingTime.toFixed(2)} minutes to read</p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview!!!"}</p>
      </div>
    </>
  );
}

export default TextForm;
