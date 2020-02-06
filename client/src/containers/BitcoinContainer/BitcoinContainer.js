import React from 'react';
import Bitcoin from '../../components/Bitcoin/Bitcoin';
import Currency from '../../components/Currency/Currency';
import Gas from '../../components/Gas/Gas';
import '../../App.css';

const BitcoinContainer = (props) => {

        return(
            <section className="box">
                <Bitcoin/>
                <Currency/>
                <Gas/>
            </section>
            );
}

export default BitcoinContainer;