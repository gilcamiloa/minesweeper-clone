import './footer.scss'
import React from 'react';

export default function Footer() {

  return (
    <div className="footer">
      <div className="footer-website">
        <a  href='https://www.camilo-gil.com'
            rel="noreferrer noopener"
            target="_blank" className='icon'>
          <i className="ion-ios-browsers-outline" />
        </a>
      </div>
      <div className="footer-github">
        <a  href='https://github.com/gilcamiloa'
            rel="noreferrer noopener"
            target="_blank" className='icon'>
          <i className="ion-social-github" />
        </a>
      </div>
    </div>
  )
}
