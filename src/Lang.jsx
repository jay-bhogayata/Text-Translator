import { useState, useEffect } from "react";
import axios from "axios";
const Lang = () => {
  const [lang, setLang] = useState([]);
  const [srcLang, setSrcLang] = useState("en");
  const [targetLang, setTargetLang] = useState("gu");
  const [srcText, setSrcText] = useState("Hello");
  const [targeText, setTargetText] = useState("નમસ્તે");

  const apiKey = import.meta.env.VITE_RapidAPI_Key;
  const host = import.meta.env.VITE_RapidAPI_Host;
  const postUrl = import.meta.env.VITE_POST_URL;

  const translate = async () => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", srcLang);
    encodedParams.append("target_language", targetLang);
    encodedParams.append("text", srcText);

    const options = {
      method: "POST",
      url: postUrl,
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": host,
      },
      data: encodedParams,
    };
    const { data } = await axios.request(options);

    const target = data.data.translatedText;
    setTargetText(target);
  };

  const fetchUrl = import.meta.env.VITE_API_URL;

  const fetchLangList = async () => {
    const options = {
      method: "GET",
      url: fetchUrl,
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": host,
      },
    };

    const { data } = await axios.request(options);
    setLang(data.data.languages);
  };

  useEffect(() => {
    fetchLangList();
  }, []);

  const handleClick = () => {
    translate();
  };

  return (
    <div className="space-y-3 flex flex-col items-center">
      <div className=" flex flex-col space-y-4 w-3/4 md:w-2/5 p-5 border-2 border-purple-300 rounded-lg">
        <label htmlFor="source language" className="text-xl font-semibold">
          Choose your source language:
        </label>

        <select
          id="src"
          className="p-3"
          value={srcLang}
          onChange={(e) => setSrcLang(e.target.value)}
        >
          <option>english (en)</option>
          {lang.map((l) => (
            <option value={l.code} key={l.code}>
              {l.name}({l.code})
            </option>
          ))}
        </select>
        <textarea
          name="srcText"
          id="srcText"
          className="border-2 border-black p-5"
          value={srcText}
          onChange={(e) => setSrcText(e.target.value)}
        ></textarea>
      </div>
      <div className="flex flex-col space-y-4 w-3/4 md:w-2/5 p-5 border-2 border-purple-300 rounded-lg ">
        <label htmlFor="target language" className="text-xl font-semibold">
          Choose your target language:
        </label>
        <select
          id="target"
          className="p-3"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          <option>Gujarati (gu)</option>
          {lang.map((l) => (
            <option value={l.code} key={l.code}>
              {l.name}({l.code})
            </option>
          ))}
        </select>
        <textarea
          name="targetText"
          id="targetText"
          className="border-2 border-black p-5"
          onChange={(e) => setTargetText(e.target.value)}
          value={targeText}
        ></textarea>
      </div>

      <br />
      <button
        onClick={handleClick}
        className="bg-purple-700 hover:bg-purple-800 text-white px-6 rounded-lg text-xl py-3 hover:border-2 border-black"
      >
        translate
      </button>
    </div>
  );
};

export default Lang;
