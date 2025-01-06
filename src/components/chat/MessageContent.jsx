import React from "react";
import { parseArtifacts } from "../../utils/parseArtifacts";
import Artifact from "../ui/Artifact";

export const MessageContent = ({ content }) => {
    const parts = parseArtifacts(content);

    return (
        <div className="flex flex-col">
            {parts.map((part, index) => (
                part.type === 'artifact' ? (
                    <Artifact key={index} {...part.data} />
                ) : (
                    <span key={index} className="whitespace-pre-wrap">
                        {part.content.trim()}
                    </span>
                )
            ))}
        </div>
    );
};