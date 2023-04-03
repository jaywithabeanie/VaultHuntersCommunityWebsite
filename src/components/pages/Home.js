import React from 'react';
import '../../css/components/pages/Home.scss';

// Images
import vault_rock from '../../images/assets/the_vault/item/vault_rock.png';


function Home () {
  return (
    <div className="container">
        <div className="box-texture"></div>
        <div className="scroll-header">
          <div className='icon'>
            <img src={vault_rock} className="vault-rock" />
          </div>
          <div className='label'>
            <p>Community Website</p>
          </div>
        </div>
        <p>
            Welcome to the unofficial website of the Vault Hunters Minecraft modpack!<br />
            Here, you can find information about the game, that is constantly being kept up-to-date.<br />
            For any questions or issues, please contact jayy#6889.
        </p>
        <ul>
          <li>
            <a href='https://discord.gg/dr9z3tKjBT' target='_blank' rel='noreferrer' className='icon-small'>
              <i className="fa-brands fa-discord"></i>
            </a>
          </li>
          <li>
            <a href='https://www.reddit.com/r/VaultHuntersMinecraft/' target='_blank' rel='noreferrer' className='icon-small'>
              <i className="fa-brands fa-reddit-alien"></i>
            </a>
          </li>
          <li>
            <a href='https://vaulthunters.gg' target='_blank' rel='noreferrer' className='icon-small'>
              <i className="fa-solid fa-globe"></i>
            </a>
          </li>
        </ul>
    </div>
  );
}

export default Home;
