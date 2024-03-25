import React from 'react';

const About = () => {
  return (
    <div className="about-container flex flex-col m-8">
      <div className="about-mission mb-8">
        <h1 className="text-5xl font-bold text-center mb-6">About Cyber Coders</h1>
        <p className="text-md">
        Our goal is to create a web-based application that can detect lies using EEG signals. 
        We plan on using machine learning algorithms to analyze and train the data, 
        which will allow us to provide users with the most accurate percentage of truthfulness possible.
        </p>
      </div>

      <div className="about-objectives mb-8">
        <h2 className="text-3xl font-semibold mb-4">Project Objectives</h2>
        <p className="text-md">
        Our main objective is to create a user-friendly platform for lie detection that is as accurate as possible. 
        To achieve this, we plan to equip the platform with an informative "About" page that explains our methods (Still to be updated), 
        a "Results" page that clearly displays analysis outcomes, 
        and a "History" page that allows users to track their past uploads.
        </p>
      </div>

      <section className="about-team mb-8">
        <h2 className="text-3xl font-semibold mb-4">Meet the Team</h2>
        <table className="min-w-full table-fixed">
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-semibold">Mahesh Swaminathan</td>
              <td className="border px-4 py-2">Scrum Master, Infrastructure / Deployment</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Yash Gandhi</td>
              <td className="border px-4 py-2">Frontend - UX/UI</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Arpit Shah </td>
              <td className="border px-4 py-2">Frontend - Components</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Prajith Reddy Mule </td>
              <td className="border px-4 py-2">Quality Assurance</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Siddharth Kaza </td>
              <td className="border px-4 py-2">Backend - Data Processing and ML</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Tushar Batla </td>
              <td className="border px-4 py-2">Backend - Servers / API Development</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="about-technology mb-8">
        <h2 className="text-3xl font-semibold mb-4">Our Technology Stack</h2>
        <table className="min-w-full table-fixed">
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-semibold">Database</td>
              <td className="border px-4 py-2">MongoDB</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Backend Framework</td>
              <td className="border px-4 py-2">Node.JS, Express.js, Mongoose</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Machine Learning Library</td>
              <td className="border px-4 py-2">EEG Deep Learning Library</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Data Processing</td>
              <td className="border px-4 py-2">Numpy, Scipy, Pandas</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Infrastructure and Deployment</td>
              <td className="border px-4 py-2">Github actions, Heroku</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Development tools</td>
              <td className="border px-4 py-2">Git, VSCode, Jira</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Frontend Framework</td>
              <td className="border px-4 py-2">React.js, HTML/CSS, Bootstrap, JavaScript/TypeScript</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default About;