import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import Studio with SSR disabled
const StudioComponent = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  {
    ssr: false, // Disable server-side rendering
    loading: () => (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading Studio...
      </div>
    ),
  }
);

export default function StudioPage() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    // Load config only on client-side
    import('../../../sanity.config.js').then((mod) => {
      setConfig(mod.default);
    });
  }, []);

  if (!config) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Initializing Studio...
      </div>
    );
  }

  return <StudioComponent config={config} />;
}
