export const parseArtifacts = (text) => {
    const parts = [];
    let currentIndex = 0;
    const artifactRegex = /::artifact\s*({[^}]+})\s*::/g;
    let match;

    while ((match = artifactRegex.exec(text)) !== null) {
        if (match.index > currentIndex) {
            parts.push({
                type: 'text',
                content: text.slice(currentIndex, match.index)
            });
        }

        try {
            const artifactData = JSON.parse(match[1]);
            parts.push({
                type: 'artifact',
                data: artifactData
            });
        } catch (error) {
            console.error('Failed to parse artifact JSON:', error);
            parts.push({
                type: 'text',
                content: match[0]
            });
        }

        currentIndex = match.index + match[0].length;
    }

    if (currentIndex < text.length) {
        parts.push({
            type: 'text',
            content: text.slice(currentIndex)
        });
    }

    return parts;
}