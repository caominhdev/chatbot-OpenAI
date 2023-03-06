/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import { useState } from "react";
import "./App.css";

const API_KEY = "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";

function App() {
  const [input, setInput] = useState("");
  const [completedSentence, setCompletedSentence] = useState("");

  const fetchData = async (input: string) => {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        prompt: `Complete this sentence: "${input}"`,
        model: "text-davinci-002",
        max_tokens: 50,
        n: 1,
        stop: ".",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices[0].text;
  };

  async function handleClick() {
    try {
      const completedSentence = await fetchData(input);
      setCompletedSentence(completedSentence);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="container  mx-auto">
      <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Tell me{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          something
        </span>
        , and I'll tell you more
      </h2>
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            value={input}
            id="comment"
            rows={5}
            className="w-full px-0 text-2xl text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Type in some words and I'll finish the rest..."
            required
            onChange={(event) => setInput(event.target.value)}
          ></textarea>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <button
            type="submit"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            onClick={handleClick}
          >
            Submit
          </button>
        </div>
      </div>
      <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">
        {completedSentence && (
          <p>
            Completed sentence:{" "}
            <span className="bg-yellow-100 text-yellow-800 text-1xl font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">
              {completedSentence}
            </span>
          </p>
        )}
      </p>
    </div>
  );
}

export default App;
