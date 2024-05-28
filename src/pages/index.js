import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [music, setMusic] = useState("");
  const [video, setVideo] = useState("");
  const [musicPrompt, setMusicPrompt] = useState("");
  const [videoPrompt, setVideoPrompt] = useState("");
  const [musicHistory, setMusicHistory] = useState([]);
  const [videoHistory, setVideoHistory] = useState([]);
  const [isLoadingMusic, setIsLoadingMusic] = useState(false);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [errorMusic, setErrorMusic] = useState("");
  const [errorVideo, setErrorVideo] = useState("");
  const [activeSection, setActiveSection] = useState("music");

  const generateMusic = async () => {
    if (!musicPrompt) {
      setErrorMusic("Please enter a music prompt.");
      return;
    }

    setIsLoadingMusic(true);
    setErrorMusic("");

    try {
      const response = await fetch("/api/generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: musicPrompt }),
      });

      const { music } = await response.json();
      setMusic(music);
      setMusicHistory((prevHistory) => [...prevHistory, musicPrompt]);
    } catch (error) {
      console.error("Failed to generate music:", error);
      setErrorMusic("Failed to generate music. Please try again.");
    }

    setIsLoadingMusic(false);
  };

  const generateVideo = async () => {
    if (!videoPrompt) {
      setErrorVideo("Please enter a video prompt.");
      return;
    }

    setIsLoadingVideo(true);
    setErrorVideo("");

    try {
      const response = await fetch("/api/video-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: videoPrompt }),
      });

      const { video } = await response.json();
      setVideo(video);
      setVideoHistory((prevHistory) => [...prevHistory, videoPrompt]);
    } catch (error) {
      console.error("Failed to generate video:", error);
      setErrorVideo("Failed to generate video. Please try again.");
    }

    setIsLoadingVideo(false);
  };

  return (
    
    <div className="h-screen bg-cover bg-center text-light-red" style={{ backgroundImage: 'url(/background.jpg)' }}>
      {/* Navbar */}
      <nav className="bg-black bg-opacity-75 py-4 px-8 fixed top-0 left-0 right-0 flex justify-between items-center">
        <div className="text-2xl font-bold flex justify-between items-center py-4 px-8 text-red-500 animate-bounce">AI Studio   </div>
        <div>
          
  <Link  className="mx-2 px-4 py-2 rounded-lg bg-gray-700 text-light-red hover:bg-gray-600" href="/technical-info">
          
          Technical-info
            
          </Link>
          <button
            className={`mx-2 px-4 py-2 rounded-lg ${activeSection === 'music' ? 'bg-red-500 text-white' : 'bg-gray-700 text-light-red'}`}
            onClick={() => setActiveSection('music')}
          >
            Music Generator
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded-lg ${activeSection === 'video' ? 'bg-red-500 text-white' : 'bg-gray-700 text-light-red'}`}
            onClick={() => setActiveSection('video')}
          >
            Video Generator
          </button>
          <a
            href="https://github.com/Manishyad14"
            className="mx-2 px-4 py-2 rounded-lg bg-gray-700 text-light-red hover:bg-gray-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github-Link
          </a>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center h-full pt-16">
        {activeSection === "music" && (
          <div className="mb-8 p-6 bg-gray-800 bg-opacity-75 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-light-red">Music Generator</h2>
            <input
              type="text"
              value={musicPrompt}
              onChange={(e) => setMusicPrompt(e.target.value)}
              placeholder="Enter a music prompt"
              className="px-4 py-2 text-black border border-gray-300 rounded-lg mb-2 w-64"
            />
            {errorMusic && <p className="text-red-500 mb-2">{errorMusic}</p>}
            <button
              onClick={generateMusic}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              disabled={isLoadingMusic}
            >
              {isLoadingMusic ? "Generating..." : "Generate Music"}
            </button>
            {isLoadingMusic && (
              <div className="mt-2">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-500"></div>
              </div>
            )}
            {music && <audio className="mt-4" controls src={music} />}
            <h3 className="text-xl font-semibold mt-6 text-light-red">Music Prompt History</h3>
            <ul className="mt-2 text-light-red">
              {musicHistory.map((prompt, index) => (
                <li key={index} className="mb-1">
                  {prompt}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeSection === "video" && (
          <div className="p-6 bg-gray-800 bg-opacity-75 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-light-red">Video Generator</h2>
            <input
              type="text"
              value={videoPrompt}
              onChange={(e) => setVideoPrompt(e.target.value)}
              placeholder="Enter a video prompt"
              className="px-4 py-2 text-black border border-gray-300 rounded-lg mb-2 w-64"
            />
            {errorVideo && <p className="text-red-500 mb-2">{errorVideo}</p>}
            <button
              onClick={generateVideo}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              disabled={isLoadingVideo}
            >
              {isLoadingVideo ? "Generating..." : "Generate Video"}
            </button>
            {isLoadingVideo && (
              <div className="mt-2">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-500"></div>
              </div>
            )}
            {video && (
              <div className="mt-4">
                <video controls className="max-w-full">
                  <source src={video} type="video/mp4" />
                </video>
              </div>
            )}
            <h3 className="text-xl font-semibold mt-6 text-light-red">Video Prompt History</h3>
            <ul className="mt-2 text-light-red">
              {videoHistory.map((prompt, index) => (
                <li key={index} className="mb-1">
                  {prompt}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
