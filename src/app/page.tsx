"use client";

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<any>(null);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );
    const result = await response.blob();
    // const result = await response.json();
    console.log(result);
    setOutput(result);

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }
    setLoading(false);
  };
  return (
    <div className="container mx-auto text-center mt-8">
      <h1 className="text-4xl font-bold mb-4">
        Stable <span className="text-blue-500">Diffusion</span>
      </h1>
      <p className="text-gray-600">
        Pellentesque vulputate dignissim enim, et sollicitudin massa
        pellentesque ut. Proin luctus dui ut sem varius eleifend.
      </p>
      <form className="mt-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="input"
          placeholder="Type your prompt here..."
          className="border border-gray-300 p-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
        >
          Generate
        </button>
      </form>
      <hr className="my-3" />
      {/* <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="input"
          onChange={(e: any) => {
            const file = e.target.files[0];
            setOutput(file);
          }}
          className="border border-gray-300 p-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
        >
          Generate
        </button>
      </form> */}
      <div className="mt-6">
        {loading && <div className="text-gray-700">Loading...</div>}
        {output && <img src={URL.createObjectURL(output)} alt="ss" />}
        {/* {JSON.stringify(output)} */}
      </div>
    </div>
  );
}
