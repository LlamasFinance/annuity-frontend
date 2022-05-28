import React, { useState } from "react";
import { SiEthereum } from "react-icons/si";
import { USDC_ADDRESS, USDC_DECIMALS } from '../../constants/contracts';
import style from '../../styles/components/addToken.module.scss';


const AddUsdcToken = () => {

  const tokenSymbol = 'USDC' 
  
  async function addToken() {
    try {
        // const wasAdded = await ethereum.request({
        //     method:'wallet_watchAsset',
        //     params: {
        //         type: 'ERC20',
        //         options: {
        //             address: USDC_ADDRESS,
        //             symbol: tokenSymbol,
        //             decimals: USDC_DECIMALS
        //         }
        //     }
        // })

        // if(wasAdded) {
        //     console.log('token added')
        // }
    } catch(error) {
        console.log(error)
    }
  }

  return (
      <button
        className={style.addToken}
        onClick={() => addToken()}
      >
       Add <p>USDC</p> to Metamask {USDC_ADDRESS}   
       <img src="https://s2.qwant.com/thumbr/0x380/6/d/826967c6fd6d50aec3f605e2c5b6005659010dca1b94d996a44e9037baee25/metamask-2728406-2261817.png?u=https%3A%2F%2Fcdn.iconscout.com%2Ficon%2Ffree%2Fpng-512%2Fmetamask-2728406-2261817.png&q=0&b=1&p=0&a=0" alt="" /> 
      </button>
  );
};

export default AddUsdcToken;