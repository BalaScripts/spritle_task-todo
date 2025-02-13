import React from 'react'
import "../../../assets/css/socialiconsstyle.css";

const SocialIcons = () => {
  return (
    <div>
      <ul className="social-media"> 
    <li><a className="fb-icon" href="#"><i class="fab fa-facebook"></i></a></li>
    <li><a className="ins-icon" target='_blank' href="https://www.instagram.com/indigobala/"><i class="fab fa-instagram"></i></a></li>
    <li><a className="you-icon" href="#"><i class="fab fa-youtube"></i></a></li>
    <li><a className="x-icon" href="#"><i class="fab fa-x-twitter"></i></a></li>
    
  </ul>
    </div>
  )
}

export default SocialIcons;
