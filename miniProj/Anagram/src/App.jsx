import { useState } from "react";
import './App.css'

const App = () => {
    const [first, setFirst] = useState("")
    const [second, setSecond] = useState("")
    const [result, setResult] = useState("")
    
    function checkAnagram() {
        const a = first.toLowerCase().trim()
        const b = second.toLowerCase().trim();

        if (!a || !b) {
            setResult("Please enter both words.");
            return ""
        }

        if (a.length !== b.length) {
            setResult("They are not an Anagram");
            return ""
        }
        const sortedA = first.split("").sort().join("")
        const sortedB = second.split("").sort().join("");

        if(sortedA == sortedB){
            setResult("They are Anagram")
        } else {
            setResult("They are not a Anagram")
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold mb-6">Anagram Checker</h1>
  
            <div className="w-full max-w-md bg-white p-5 rounded-md shadow">
                <label className="block mb-2 text-sm">First Word:</label>
                <input
                    value={first}
                    onChange={(e) => setFirst(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. listen"
                />
  
                <label className="block mb-2 text-sm">Second Word:</label>
                <input
                    value={second}
                    onChange={(e) => setSecond(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. silent"
                />
  
                <button
                    onClick={checkAnagram}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                    Check
                </button>
  
                {result && (
                    <p className="mt-4 p-3 text-center border rounded-md bg-gray-50 text-gray-700">
                        {result}
                    </p>
                )}
   
            </div>
        </div>
    )
}

export default App