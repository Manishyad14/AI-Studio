export default function TechnicalInfo() {
    return (
      <div className="min-h-screen bg-cover bg-center text-light-red" style={{ backgroundImage: 'url(/background.jpg)' }}>
        <div className="bg-black bg-opacity-75 py-4 px-8">
          <h1 className="text-3xl font-bold text-red-500 mb-4 ">AI Studio</h1>
          <div className="text-light-red">
            <h2 className="text-2xl font-semibold mb-2">About the Project</h2>
            <p className="mb-4">
              This project demonstrates the use of AI to generate music and videos based on user prompts. It utilizes the Replicate API for AI model inference.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
            <ul className="list-disc list-inside mb-4">
              <li>Next.js for the frontend and backend</li>
              <li>Tailwind CSS for styling</li>
              <li>Replicate API for AI model interaction</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
            <p className="mb-4">
              Users input prompts which are sent to the backend API endpoints. The endpoints interact with the Replicate API to generate music or videos based on the prompts. The generated content is then displayed to the user.
            </p>
            <h2 className="text-2xl font-semibold mb-2">About the Developer</h2>
            <p className="mb-4">
              This project is made by Manish Yadav, a B.Tech Computer Science student.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Disclaimer</h2>
            <p>
              Please note that the Replicate API is a paid service. Due to payment requirements, it may not be possible to generate prompts without an active subscription or sufficient credits.
            </p>
          </div>
        </div>
      </div>
    );
  }
  