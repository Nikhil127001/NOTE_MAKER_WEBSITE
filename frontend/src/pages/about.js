
import React from "react";
const About = () => {
    return (
        <>
        <div style={{fontSize:"30px", padding: "30px"}}>
           <p>Welcome to our Note Maker website! Our platform is designed to help you stay organized, be more productive, and capture your ideas, thoughts, and to-dos all in one place.</p>
           <p>Whether you're a student, a professional, or just someone who likes to stay on top of things, our note-taking tool is here to help. With features like unlimited notes, you can capture and access your notes from anywhere, on any device.</p>
           <p>At our core, we believe that note-taking is a crucial skill that can help you succeed in your personal and professional life. By capturing your ideas and thoughts, you can clarify your thinking, improve your memory, and stay on top of your priorities.</p>
           <p>We're constantly working to improve our platform, and we're always open to feedback from our users. So if you have any suggestions, comments, or questions, please don't hesitate to reach out to us.</p>
           <p>Thanks for choosing our Note-Maker website, and happy note-Making!</p>
        </div>
         <div style={{display: 'flex', flexDirection: 'column',borderTop: "1px solid salmon"
          }}>
         <div style={{width: "100%", alignItems: 'center'}}><h3>Find us on </h3></div>
        <div style={{fontSize: "50px",width: "350px",margin: "auto",}}>
            <i className="navItems2 bi bi-instagram"/>
            <i className="navItems2 bi bi-facebook"/>
            <i className="navItems2 bi bi-twitter"/>
            <i className="navItems2 bi bi-youtube"/>
</div>
         </div>
        </>
    )
}

export default About;