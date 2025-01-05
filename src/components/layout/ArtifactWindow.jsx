import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { X } from 'lucide-react';

const ArtifactWindow = ({ title, identifier, type, url, setArtifactWindowOpen }) => {
    const [csvData, setCsvData] = useState(null);

    useEffect(() => {
        if (type.toLowerCase() === 'csv') {
            Papa.parse(url, {
                download: true,
                header: true,
                complete: (results) => {
                    setCsvData(results.data);
                },
                error: (error) => {
                    console.error('Error parsing CSV:', error);
                }
            });
        }
    }, [url, type]);

    return (
        <div className="fixed top-0 w-[50vw] right-0 h-screen dark:bg-neutral-900 text-white z-[100] border-l border-neutral-600 bg-neutral-100">
            <div className="w-full h-[64px] border-b border-neutral-600">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-neutral-600 dark:bg-neutral-400 rounded-full" />
                        <span className="text-xs font-medium uppercase text-neutral-600 dark:text-neutral-400">
                            {type}
                        </span>
                        <code className="text-xs text-neutral-500 dark:text-neutral-500">
                            {identifier}
                        </code>
                    </div>
                    <h3 className="font-medium text-neutral-900 dark:text-white">
                        {title}
                    </h3>
                    <button
                        onClick={() => setArtifactWindowOpen(false)}
                        className="text-neutral-500 dark:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700 p-1.5"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            <div className="p-4 overflow-auto h-[calc(100vh-64px)]">
                {type.toLowerCase() === 'csv' && csvData && (
                    <table className="w-full border-collapse table-auto">
                        <thead>
                            <tr className="bg-neutral-200 dark:bg-neutral-800">
                                {Object.keys(csvData[0]).map((header, index) => (
                                    <th key={index} className="border border-neutral-600 p-2 text-left text-xs font-medium uppercase text-neutral-600 dark:text-neutral-400">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {csvData.map((row, rowIndex) => (
                                <tr key={rowIndex} className="dark:even:bg-neutral-850">
                                    {Object.values(row).map((cell, cellIndex) => (
                                        <td key={cellIndex} className="border border-neutral-600 p-2 text-sm text-neutral-900 dark:text-white">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ArtifactWindow;