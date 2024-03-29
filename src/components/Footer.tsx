import React from 'react';
import { socials } from '../data/socials';

const Footer: React.FC = () => {
  return (
    <footer className="w-full relative top-[70px]">
      <div className="w-full bg-[#212121] h-[20px]"></div>
      <div className="flex flex-wrap justify-center w-full bg-gradient-to-r from-[#ff5152] via-red-950 via-black to-black min-h-[100px] bg-stone-950 text-[12px] text-left px-5 pb-4">
        <section className='w-full md:w-1/2 xl:w-[35%] px-2'>
          <p className='pt-4 pb-1'>
            This website uses{' '}
            <a
              target="_blank"
              href="https://valorant-api.com/"
              className="font-bold"
              rel="noreferrer"
            >
              Valorant-API
            </a>
            , an unofficial API, which is not endorsed by Riot Games in any way.
          </p>
          <p className='pb-1'>
            ValoChecker isn't endorsed by Riot Games and doesn't reflect the
            views or opinions of Riot Games or anyone officially involved in
            Riot Games properties.
          </p>
          <p className='pb-1'>
            Riot Games, and all associated properties are trademarks or
            registered trademarks of Riot Games, Inc.
          </p>
          <p>ValoChecker created by <a href="https://www.linkedin.com/in/joseph-w-valdez/" className='font-bold'>Joseph Valdez</a>.</p>
        </section>
        <section className="flex flex-wrap items-center justify-center w-full md:w-1/3 mt-3 px-2">
          <div className="flex flex-wrap justify-center items-center h-[80px]">
            {socials.map((social: { link: string; imageSource: string; name: string; }, index: number) => (
              <div key={index} className="w-1/2 flex items-center pr-2">
                <div className="w-[24px] mr-2 mb-1">
                  <a target="_blank" href={social.link} rel="noreferrer">
                    <img
                      src={social.imageSource}
                      alt={social.name}
                      className="object-cover w-full"
                    />
                  </a>
                </div>
                <a
                  target="_blank"
                  href={social.link}
                  className="font-bold text-white"
                  rel="noreferrer"
                >
                  {social.name}
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
