'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const [url, setUrl] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [trackName, setTrackName] = useState('');
  const [bitDepth, setBitDepth] = useState<'24' | '32'>('24');

  const handleConvert = async () => {
    setLoading(true);
    setDownloadUrl('');
    setError('');
    setTrackName('');

    try {
      const res = await fetch('https://makeitwav-backend.onrender.com/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, bitDepth }),
      });

      const data = await res.json();

      if (data.success) {
        setDownloadUrl(data.url);
        const parts = data.url.split('/');
        const fileName = decodeURIComponent(parts[parts.length - 1]);
        const title = fileName.replace('.wav', '').replace(/[_-]/g, ' ');
        setTrackName(title);
      } else {
        setError(data.error || 'Conversion failed');
      }
    } catch {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUrl('');
    setDownloadUrl('');
    setTrackName('');
    setError('');
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md bg-zinc-900 border border-zinc-700 shadow-2xl">
        <CardContent className="py-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">🎵 MakeItWav</h1>

          {!downloadUrl && (
            <>
              <div className="mb-4">
                <Label htmlFor="url" className="mb-1 block text-white">YouTube Link</Label>
                <Input
                  id="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-zinc-800 text-white border-zinc-600"
                />
              </div>

              <div className="mb-4 flex justify-center space-x-2">
                <Button
                  onClick={() => setBitDepth('24')}
                  className={`w-1/2 ${bitDepth === '24' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-zinc-200 hover:bg-zinc-300 text-black'}`}
                >
                  24-bit
                </Button>
                <Button
                  onClick={() => setBitDepth('32')}
                  className={`w-1/2 ${bitDepth === '32' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-zinc-200 hover:bg-zinc-300 text-black'}`}
                >
                  32-bit
                </Button>
              </div>

              <Button
                onClick={handleConvert}
                disabled={loading || !url}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                {loading ? 'Converting...' : `Convert to WAV (${bitDepth}-bit)`}
              </Button>
            </>
          )}

          {downloadUrl && (
            <div className="mt-6 text-center">
              <p className="text-sm text-zinc-400 mb-1">✔️ Converted track:</p>
              <p className="text-green-400 font-medium mb-3">{trackName}</p>

              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-3">
                <a
                  href={downloadUrl}
                  download
                  rel="noopener noreferrer"
                  className="mt-4 w-full block text-center text-white font-semibold py-2 px-4 rounded transition"
                >
                  ⬇️ Download WAV
                </a>
              </Button>

              <Button
                onClick={handleReset}
                variant="secondary"
                className="w-full bg-zinc-200 text-black hover:bg-zinc-300"
              >
                🔁 Convert Another
              </Button>
            </div>
          )}

          {error && (
            <p className="mt-4 text-red-500 text-center">{error}</p>
          )}
        </CardContent>
      </Card>

      <footer className="mt-8 text-sm text-zinc-500 text-center space-y-1">
        <p>Made with ❤️ by <span className="text-white font-semibold">KILIAM</span></p>
        <p>© 2025 KILIAM ·
          <a
            href="https://github.com/kiliamdev/makeitwav-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="underline ml-1"
          >
            GitHub Repo
          </a>
        </p>
      </footer>
    </main>
  );
}
