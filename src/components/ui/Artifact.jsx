import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import ArtifactWindow from '../layout/ArtifactWindow';

const Artifact = ({ title, identifier, type, url }) => {
  const [artifactWindowOpen, setArtifactWindowOpen] = useState(false);

  const getWidth = () => {
    if (!title || title.length < 20) return 'w-80';
    if (title.length < 40) return 'w-96';
    return 'w-full max-w-2xl';
  };

  const handleClick = (e) => {
    e.preventDefault();
    setArtifactWindowOpen(!artifactWindowOpen);
  };

  return (
    <div className={`group ${getWidth()}`}>
      <div className="border border-neutral-600 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 my-4">
        <div className="p-2 px-4 border-b border-neutral-600 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neutral-600 dark:bg-neutral-400 rounded-full" />
            <span className="text-xs font-medium uppercase text-neutral-600 dark:text-neutral-400">
              {type}
            </span>
          </div>
          <code className="text-xs text-neutral-500 dark:text-neutral-500">
            {identifier}
          </code>
        </div>

        <a onClick={handleClick} href={url} className="block p-2 px-4 group-hover:bg-neutral-50 dark:group-hover:bg-neutral-800">
          <h3 className="font-medium text-neutral-900 dark:text-white mb-2">
            {title}
          </h3>
          
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-xs text-neutral-500 dark:text-neutral-400">Ready</span>
            </div>
            
            <div className="text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
              <ExternalLink className="h-4 w-4" />
              <span>View Artifact</span>
            </div>
          </div>
        </a>
      </div>
      {artifactWindowOpen && <ArtifactWindow 
        title={title} 
        identifier={identifier} 
        type={type} 
        url={"http://localhost:1515/" + url}
        setArtifactWindowOpen={setArtifactWindowOpen}
      />}
    </div>
  );
};

export default Artifact;